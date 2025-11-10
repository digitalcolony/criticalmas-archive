/**
 * Fix internal WordPress links to use relative paths
 */
export class LinkFixer {
	constructor(config, logger) {
		this.config = config;
		this.logger = logger;
		this.domain = config.processing.linkConversion.domain;
	}

	/**
	 * Convert internal WordPress links to relative paths
	 */
	fixLinks(content) {
		if (!this.config.processing.linkConversion.convertInternal) {
			return content;
		}

		let fixed = content;

		// Fix post links: https://criticalmas.org/YYYY/MM/post-slug/
		const postPattern = new RegExp(
			`https?://${this.escapeRegex(this.domain)}/(\\d{4})/(\\d{2})/([^/)\\s"'<>]+)/?`,
			"gi"
		);

		fixed = fixed.replace(postPattern, "/$1/$2/$3/");

		// Fix home page links
		const homePattern = new RegExp(
			`https?://${this.escapeRegex(this.domain)}/?(?=\\s|"|'|<|$)`,
			"gi"
		);

		fixed = fixed.replace(homePattern, "/");

		return fixed;
	}

	/**
	 * Extract all internal links from content
	 */
	extractInternalLinks(content) {
		const links = [];
		const pattern = new RegExp(`https?://${this.escapeRegex(this.domain)}/([^\\s"'<>)]+)`, "gi");

		let match;
		while ((match = pattern.exec(content)) !== null) {
			links.push({
				full: match[0],
				path: match[1],
			});
		}

		return links;
	}

	/**
	 * Validate that a link path exists in the posts collection
	 */
	validateLink(linkPath, postsMap) {
		// Check if it's a post link (YYYY/MM/slug)
		const postMatch = linkPath.match(/^(\d{4})\/(\d{2})\/([^/]+)\/?$/);

		if (postMatch) {
			const [, year, month, slug] = postMatch;
			const postKey = `${year}/${month}/${slug}`;
			return postsMap.has(postKey);
		}

		// Check for other valid paths (about, archive, etc.)
		const validPaths = ["about", "archive", "category", "tag"];
		return validPaths.some((path) => linkPath.startsWith(path));
	}

	/**
	 * Escape special regex characters
	 */
	escapeRegex(string) {
		return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	}

	/**
	 * Generate a map of all post slugs for validation
	 */
	buildPostsMap(posts) {
		const map = new Map();

		for (const post of posts) {
			const date = new Date(post.pubDate);
			const year = date.getFullYear();
			const month = (date.getMonth() + 1).toString().padStart(2, "0");
			const key = `${year}/${month}/${post.slug}`;
			map.set(key, post);
		}

		return map;
	}

	/**
	 * Check all posts for broken internal links
	 */
	async validateAllLinks(posts) {
		const postsMap = this.buildPostsMap(posts);
		const brokenLinks = [];

		for (const post of posts) {
			const links = this.extractInternalLinks(post.content);

			for (const link of links) {
				if (!this.validateLink(link.path, postsMap)) {
					brokenLinks.push({
						postId: post.id,
						postTitle: post.title,
						brokenLink: link.full,
						linkPath: link.path,
					});
				}
			}
		}

		if (brokenLinks.length > 0) {
			this.logger.warn(`Found ${brokenLinks.length} potentially broken internal links`);
		}

		return brokenLinks;
	}
}
