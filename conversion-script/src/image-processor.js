import fs from "fs-extra";
import path from "path";

/**
 * Process and copy images referenced in posts
 */
export class ImageProcessor {
	constructor(config, logger) {
		this.config = config;
		this.logger = logger;
		this.uploadsPath = path.resolve(config.input.uploadsPath);
		this.imageMap = new Map(); // Track all image references
	}

	/**
	 * Extract image references from HTML content
	 */
	extractReferences(html, domain) {
		const images = [];

		// Pattern: https://criticalmas.org/wp-content/uploads/YYYY/MM/image.jpg
		const pattern = new RegExp(
			`https?://${domain}/wp-content/uploads/(\\d{4})/(\\d{2})/([^"')\\s<>]+)`,
			"gi"
		);

		let match;
		while ((match = pattern.exec(html)) !== null) {
			const imageRef = {
				year: match[1],
				month: match[2],
				filename: decodeURIComponent(match[3]), // Decode URL-encoded filenames
				sourcePath: `${match[1]}/${match[2]}/${decodeURIComponent(match[3])}`,
				url: match[0],
			};

			images.push(imageRef);

			// Track in global map
			const key = imageRef.sourcePath;
			if (!this.imageMap.has(key)) {
				this.imageMap.set(key, {
					...imageRef,
					usedInPosts: [],
				});
			}
		}

		return images;
	}

	/**
	 * Track which posts use which images
	 */
	trackImageUsage(postId, images) {
		for (const image of images) {
			const key = image.sourcePath;
			if (this.imageMap.has(key)) {
				const tracked = this.imageMap.get(key);
				if (!tracked.usedInPosts.includes(postId)) {
					tracked.usedInPosts.push(postId);
				}
			}
		}
	}

	/**
	 * Copy image to post directory
	 */
	async copyImageToPost(imageRef, postPath, dryRun = false) {
		const sourceFile = path.join(this.uploadsPath, imageRef.sourcePath);
		const destDir = path.join(postPath, this.config.output.imagesPath);
		const destFile = path.join(destDir, imageRef.filename);

		// Check if source exists
		const exists = await fs.pathExists(sourceFile);

		if (!exists) {
			this.logger.warn(`Image not found: ${sourceFile}`);
			return { success: false, reason: "not_found" };
		}

		if (dryRun) {
			this.logger.info(`[DRY RUN] Would copy: ${imageRef.sourcePath} -> ${destFile}`);
			return { success: true, dryRun: true };
		}

		try {
			await fs.ensureDir(destDir);
			await fs.copy(sourceFile, destFile);
			return { success: true };
		} catch (error) {
			this.logger.error(`Failed to copy image: ${sourceFile}`, error);
			return { success: false, reason: "copy_failed", error };
		}
	}

	/**
	 * Copy all images for a post
	 */
	async copyImagesForPost(post, postPath, dryRun = false) {
		const images = this.extractReferences(
			post.content,
			this.config.processing.linkConversion.domain
		);

		if (images.length === 0) {
			return { total: 0, copied: 0, failed: 0 };
		}

		this.trackImageUsage(post.id, images);

		let copied = 0;
		let failed = 0;

		for (const image of images) {
			const result = await this.copyImageToPost(image, postPath, dryRun);
			if (result.success) {
				copied++;
			} else {
				failed++;
			}
		}

		return { total: images.length, copied, failed };
	}

	/**
	 * Get summary of all images
	 */
	getImageSummary() {
		const summary = {
			totalUniqueImages: this.imageMap.size,
			imagesByUsage: {
				single: 0,
				multiple: 0,
			},
			mostUsedImages: [],
		};

		const usageCounts = [];

		for (const [path, imageData] of this.imageMap.entries()) {
			const usageCount = imageData.usedInPosts.length;

			if (usageCount === 1) {
				summary.imagesByUsage.single++;
			} else {
				summary.imagesByUsage.multiple++;
			}

			usageCounts.push({
				path,
				usageCount,
				posts: imageData.usedInPosts,
			});
		}

		// Sort by usage and get top 10
		usageCounts.sort((a, b) => b.usageCount - a.usageCount);
		summary.mostUsedImages = usageCounts.slice(0, 10);

		return summary;
	}

	/**
	 * Check for missing images in uploads directory
	 */
	async validateImages() {
		const missing = [];

		for (const [imagePath, imageData] of this.imageMap.entries()) {
			const sourceFile = path.join(this.uploadsPath, imagePath);
			const exists = await fs.pathExists(sourceFile);

			if (!exists) {
				missing.push({
					path: imagePath,
					usedIn: imageData.usedInPosts,
				});
			}
		}

		return missing;
	}
}
