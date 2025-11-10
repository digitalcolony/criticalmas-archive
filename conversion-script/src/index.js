import path from "path";
import fs from "fs-extra";
import config from "../config.js";
import {
	Logger,
	StatsTracker,
	getDateParts,
	writeFile,
	generateExcerpt,
	formatDate,
	slugify,
} from "./utils.js";
import { WordPressParser } from "./parser.js";
import { ContentConverter } from "./converter.js";
import { CommentSanitizer } from "./comment-sanitizer.js";
import { ImageProcessor } from "./image-processor.js";
import { LinkFixer } from "./link-fixer.js";

/**
 * Main conversion orchestrator
 */
class Converter {
	constructor(dryRun = false) {
		this.dryRun = dryRun;
		this.config = config;
		this.logger = new Logger(dryRun ? null : config.logging.logFile);
		this.stats = new StatsTracker();

		// Initialize processors
		this.parser = new WordPressParser(path.resolve(config.input.xmlPath), this.logger);
		this.converter = new ContentConverter(config, this.logger);
		this.commentSanitizer = new CommentSanitizer(this.logger);
		this.imageProcessor = new ImageProcessor(config, this.logger);
		this.linkFixer = new LinkFixer(config, this.logger);
	}

	/**
	 * Main conversion method
	 */
	async convert() {
		try {
			this.logger.info("Starting WordPress to Astro conversion...");
			if (this.dryRun) {
				this.logger.info("DRY RUN MODE - No files will be written");
			}

			// Step 1: Parse WordPress XML
			const { siteInfo, posts } = await this.parser.parse();
			this.stats.increment("postsTotal", posts.length);

			// Step 2: Validate internal links
			this.logger.info("Validating internal links...");
			const brokenLinks = await this.linkFixer.validateAllLinks(posts);
			if (brokenLinks.length > 0 && config.logging.verbose) {
				this.logger.warn(`Found ${brokenLinks.length} broken links (check log for details)`);
			}

			// Step 3: Process each post
			this.logger.info(`Processing ${posts.length} posts...`);
			for (const post of posts) {
				await this.processPost(post);
			}

			// Step 4: Generate metadata files
			if (!this.dryRun) {
				await this.generateMetadata(posts);
			}

			// Step 5: Generate summary
			const finalStats = this.stats.get();
			this.logger.summary(finalStats);

			// Step 6: Image summary
			const imageSummary = this.imageProcessor.getImageSummary();
			this.logger.info(`Total unique images: ${imageSummary.totalUniqueImages}`);
			this.logger.info(`Images used in single post: ${imageSummary.imagesByUsage.single}`);
			this.logger.info(`Images used in multiple posts: ${imageSummary.imagesByUsage.multiple}`);

			// Check for missing images
			const missingImages = await this.imageProcessor.validateImages();
			if (missingImages.length > 0) {
				this.logger.warn(
					`${missingImages.length} referenced images not found in uploads directory`
				);
			}

			this.logger.success("Conversion completed!");
		} catch (error) {
			this.logger.error("Conversion failed", error);
			throw error;
		}
	}

	/**
	 * Process individual post
	 */
	async processPost(post) {
		try {
			this.logger.info(`Processing: ${post.title}`);

			// Extract date parts for directory structure
			const { year, month } = getDateParts(post.pubDate);

			// Build post directory path
			const postDir = path.join(path.resolve(this.config.output.postsPath), year, month, post.slug);

			// Convert HTML to Markdown
			let markdown = this.converter.convert(post.content);

			// Fix internal links
			markdown = this.linkFixer.fixLinks(markdown);

			// Update image paths to relative
			markdown = this.converter.updateImagePaths(markdown, post.slug); // Process comments
			const commentsMarkdown = this.commentSanitizer.formatAsMarkdown(post.comments);
			this.stats.increment("commentsProcessed", post.comments.length);

			// Append comments to content
			if (commentsMarkdown) {
				markdown += commentsMarkdown;
			}

			// Generate frontmatter
			const frontmatter = this.generateFrontmatter(post, markdown);

			// Combine frontmatter and content
			const fullContent = `---\n${frontmatter}\n---\n\n${markdown}`;

			// Write post file
			if (!this.dryRun) {
				const postFile = path.join(postDir, "index.md");
				await writeFile(postFile, fullContent);
			} else {
				this.logger.info(`[DRY RUN] Would write: ${postDir}/index.md`);
			}

			// Copy images
			if (this.config.processing.copyImages) {
				const imageResult = await this.imageProcessor.copyImagesForPost(post, postDir, this.dryRun);
				this.stats.increment("imagesFound", imageResult.total);
				this.stats.increment("imagesCopied", imageResult.copied);
				this.stats.increment("imagesMissing", imageResult.failed);
			}

			// Track categories and tags
			post.categories.forEach((cat) => this.stats.add("categoriesFound", cat));
			post.tags.forEach((tag) => this.stats.add("tagsFound", tag));

			this.stats.increment("postsProcessed");
		} catch (error) {
			this.logger.error(`Failed to process post: ${post.title}`, error);
			this.stats.increment("postsFailed");
		}
	}

	/**
	 * Generate YAML frontmatter for post
	 */
	generateFrontmatter(post, markdown) {
		const lines = [];

		lines.push(`title: "${post.title.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`);
		lines.push(`pubDate: ${formatDate(post.pubDate)}`);

		if (post.modifiedDate && post.modifiedDate !== post.pubDate) {
			lines.push(`modifiedDate: ${formatDate(post.modifiedDate)}`);
		}

		lines.push(`author: "MAS"`);

		// Categories
		if (post.categories.length > 0) {
			const cats = post.categories.map((c) => `"${c}"`).join(", ");
			lines.push(`categories: [${cats}]`);
		} else {
			lines.push(`categories: []`);
		}

		// Tags
		if (post.tags.length > 0) {
			const tags = post.tags.map((t) => `"${t}"`).join(", ");
			lines.push(`tags: [${tags}]`);
		} else {
			lines.push(`tags: []`);
		}

		// Description (excerpt or generated)
		const description = post.excerpt || generateExcerpt(markdown, 200);
		lines.push(
			`description: "${description
				.replace(/\\/g, "\\\\")
				.replace(/"/g, '\\"')
				.replace(/\n/g, " ")}"`
		);

		// Comment count
		lines.push(`commentCount: ${post.comments.length}`);
		return lines.join("\n");
	}

	/**
	 * Generate metadata files for Astro site
	 */
	async generateMetadata(posts) {
		this.logger.info("Generating metadata files...");

		const metadataPath = path.resolve(this.config.output.metadataPath);
		await fs.ensureDir(metadataPath);

		// Generate categories.json
		const categories = {};
		posts.forEach((post) => {
			post.categories.forEach((cat) => {
				if (!categories[cat]) {
					categories[cat] = {
						name: cat,
						slug: slugify(cat),
						count: 0,
					};
				}
				categories[cat].count++;
			});
		});

		await writeFile(
			path.join(metadataPath, "categories.json"),
			JSON.stringify(Object.values(categories), null, 2)
		);

		// Generate tags.json
		const tags = {};
		posts.forEach((post) => {
			post.tags.forEach((tag) => {
				if (!tags[tag]) {
					tags[tag] = {
						name: tag,
						slug: slugify(tag),
						count: 0,
					};
				}
				tags[tag].count++;
			});
		});

		await writeFile(
			path.join(metadataPath, "tags.json"),
			JSON.stringify(Object.values(tags), null, 2)
		);

		// Generate posts-index.json (for archives)
		const postsIndex = posts
			.map((post) => {
				const { year, month } = getDateParts(post.pubDate);
				return {
					title: post.title,
					slug: post.slug,
					url: `/${year}/${month}/${post.slug}/`,
					pubDate: post.pubDate,
					categories: post.categories,
					tags: post.tags,
					commentCount: post.comments.length,
					excerpt: post.excerpt || "",
				};
			})
			.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

		await writeFile(
			path.join(metadataPath, "posts-index.json"),
			JSON.stringify(postsIndex, null, 2)
		);

		this.logger.success("Metadata files generated");
	}
}

/**
 * CLI entry point
 */
async function main() {
	const args = process.argv.slice(2);
	const dryRun = args.includes("--dry-run");

	const converter = new Converter(dryRun);
	await converter.convert();
}

// Run if called directly (works on both Unix and Windows)
const isMainModule =
	process.argv[1] && import.meta.url.endsWith(process.argv[1].replace(/\\/g, "/"));
if (isMainModule || import.meta.url === `file://${process.argv[1]}`) {
	main().catch((error) => {
		console.error("Fatal error:", error);
		process.exit(1);
	});
}

export { Converter };
