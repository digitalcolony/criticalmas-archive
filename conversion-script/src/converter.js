import TurndownService from "turndown";

/**
 * Convert WordPress HTML to Markdown
 */
export class ContentConverter {
	constructor(config, logger) {
		this.config = config;
		this.logger = logger;
		this.domain = config.processing.linkConversion.domain;

		// Initialize Turndown
		this.turndown = new TurndownService({
			headingStyle: "atx",
			hr: "---",
			bulletListMarker: "-",
			codeBlockStyle: "fenced",
			emDelimiter: "_",
		});

		// Custom rules for WordPress content
		this.setupCustomRules();
	}

	/**
	 * Setup custom Turndown rules
	 */
	setupCustomRules() {
		// Handle WordPress captions
		this.turndown.addRule("wordpressCaption", {
			filter: (node) => {
				return (
					node.nodeName === "DIV" &&
					(node.className.includes("wp-caption") || node.className.includes("caption"))
				);
			},
			replacement: (content) => content,
		});

		// Handle WordPress galleries
		this.turndown.addRule("wordpressGallery", {
			filter: (node) => {
				return node.nodeName === "DIV" && node.className.includes("gallery");
			},
			replacement: (content) => "\n" + content + "\n",
		});
	}

	/**
	 * Convert HTML content to Markdown
	 */
	convert(html) {
		if (!html) return "";

		try {
			// Pre-process HTML
			let processed = this.preProcess(html);

			// Convert to markdown
			let markdown = this.turndown.turndown(processed);

			// Post-process markdown
			markdown = this.postProcess(markdown);

			return markdown;
		} catch (error) {
			this.logger.error("Error converting HTML to Markdown", error);
			return html; // Return original if conversion fails
		}
	}

	/**
	 * Pre-process HTML before conversion
	 */
	preProcess(html) {
		let processed = html;

		// Remove WordPress shortcodes that can't be converted
		processed = processed.replace(/\[caption[^\]]*\](.*?)\[\/caption\]/gs, "$1");
		processed = processed.replace(/\[gallery[^\]]*\]/g, "");

		// Clean up WordPress image classes
		processed = processed.replace(/class="[^"]*alignnone[^"]*"/g, "");
		processed = processed.replace(/class="[^"]*wp-image-[^"]*"/g, "");

		// Fix WordPress image URLs (convert to relative if internal)
		if (this.config.processing.linkConversion.convertInternal) {
			processed = this.convertImageUrls(processed);
		}

		// WordPress stores content without <p> tags and uses wpautop() to add them at render time
		// We need to add them before conversion to get proper paragraph spacing in markdown
		processed = this.addParagraphTags(processed);

		return processed;
	}

	/**
	 * Add paragraph tags to HTML content (mimics WordPress wpautop function)
	 */
	addParagraphTags(html) {
		// Split by double newlines to find paragraph breaks
		const blocks = html.split(/\n\s*\n/);

		const processed = blocks.map((block) => {
			block = block.trim();
			if (!block) return "";

			// Don't wrap if already a block element
			if (block.match(/^<(h[1-6]|blockquote|ul|ol|li|div|pre|table|p)/i)) {
				return block;
			}

			// Wrap in paragraph tags
			return `<p>${block}</p>`;
		});

		return processed.join("\n\n");
	}

	/**
	 * Post-process Markdown after conversion
	 */
	postProcess(markdown) {
		let processed = markdown;

		// Clean up excessive newlines (but preserve paragraph breaks - 2 newlines minimum)
		processed = processed.replace(/\n{4,}/g, "\n\n");

		// Fix list formatting
		processed = processed.replace(/\n-\s+\n/g, "\n- ");

		// Ensure proper spacing around headers
		processed = processed.replace(/\n(#{1,6}\s)/g, "\n\n$1");
		processed = processed.replace(/(#{1,6}\s[^\n]+)\n/g, "$1\n\n");

		return processed.trim();
	}

	/**
	 * Convert WordPress image URLs to relative paths
	 */
	convertImageUrls(html) {
		// Pattern: https://criticalmas.org/wp-content/uploads/YYYY/MM/image.jpg
		const pattern = new RegExp(
			`https?://${this.domain}/wp-content/uploads/(\\d{4})/(\\d{2})/([^"')\\s]+)`,
			"gi"
		);

		return html.replace(pattern, (match, year, month, filename) => {
			// Will be replaced with relative path in post processing
			return `__WP_IMAGE__/${year}/${month}/${filename}`;
		});
	}

	/**
	 * Extract image references from content
	 */
	extractImageReferences(html) {
		const images = [];
		const pattern = new RegExp(
			`https?://${this.domain}/wp-content/uploads/(\\d{4})/(\\d{2})/([^"')\\s]+)`,
			"gi"
		);

		let match;
		while ((match = pattern.exec(html)) !== null) {
			images.push({
				year: match[1],
				month: match[2],
				filename: match[3],
				fullPath: `${match[1]}/${match[2]}/${match[3]}`,
			});
		}

		return images;
	}

	/**
	 * Convert internal WordPress links to relative paths
	 */
	convertInternalLinks(content) {
		if (!this.config.processing.linkConversion.convertInternal) {
			return content;
		}

		// Pattern: https://criticalmas.org/YYYY/MM/post-slug/
		const pattern = new RegExp(`https?://${this.domain}/(\\d{4})/(\\d{2})/([^/)\\s]+)/?`, "gi");

		return content.replace(pattern, "/$1/$2/$3/");
	}

	/**
	 * Update image paths in markdown for a specific post
	 */
	updateImagePaths(markdown, postSlug) {
		// Replace __WP_IMAGE__ placeholders with relative paths
		return markdown.replace(/__WP_IMAGE__\/\d{4}\/\d{2}\/([^)\s]+)/g, "./img/$1");
	}
}
