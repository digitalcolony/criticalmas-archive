/**
 * Sanitize comments by removing PII (Personally Identifiable Information)
 */
export class CommentSanitizer {
	constructor(logger) {
		this.logger = logger;
	}

	/**
	 * Sanitize all comments for a post
	 */
	sanitize(comments) {
		if (!comments || comments.length === 0) {
			return [];
		}

		return comments
			.filter((comment) => comment.content && comment.content.trim())
			.map((comment) => this.sanitizeComment(comment))
			.sort((a, b) => new Date(a.date) - new Date(b.date));
	}

	/**
	 * Sanitize individual comment
	 */
	sanitizeComment(comment) {
		return {
			author: this.sanitizeAuthorName(comment.author),
			date: comment.date,
			content: this.sanitizeContent(comment.content),
		};
	}

	/**
	 * Sanitize author name (use first name only if full name detected)
	 */
	sanitizeAuthorName(name) {
		if (!name) return "Anonymous";

		// If name contains space, use first part only
		const parts = name.trim().split(/\s+/);
		return parts[0];
	}

	/**
	 * Sanitize comment content
	 */
	sanitizeContent(content) {
		if (!content) return "";

		let sanitized = content;

		// Remove email addresses
		sanitized = sanitized.replace(
			/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi,
			"[email removed]"
		);

		// Remove URLs that might contain personal info
		// Keep the link but note it was removed
		sanitized = sanitized.replace(/https?:\/\/[^\s<]+/gi, (match) => {
			// Keep major domains, remove personal sites
			if (
				match.includes("facebook.com") ||
				match.includes("twitter.com") ||
				match.includes("instagram.com")
			) {
				return "[link removed]";
			}
			return match; // Keep other URLs
		});

		// Remove phone numbers (various formats)
		sanitized = sanitized.replace(
			/(\+\d{1,3}[-.]?)?\(?\d{3}\)?[-.]?\d{3}[-.]?\d{4}/g,
			"[phone removed]"
		);

		return sanitized.trim();
	}

	/**
	 * Format comments as Markdown
	 */
	formatAsMarkdown(comments) {
		if (!comments || comments.length === 0) {
			return "";
		}

		const sanitized = this.sanitize(comments);

		if (sanitized.length === 0) {
			return "";
		}

		let markdown = "\n\n---\n\n## Comments\n\n";

		for (const comment of sanitized) {
			const date = this.formatDate(comment.date);
			markdown += `### ${comment.author}\n`;
			markdown += `*${date}*\n\n`;
			markdown += `${comment.content}\n\n`;
			markdown += `---\n\n`;
		}

		return markdown;
	}

	/**
	 * Format date for display
	 */
	formatDate(dateString) {
		const date = new Date(dateString);
		const options = {
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "numeric",
			minute: "2-digit",
			hour12: true,
		};

		return date.toLocaleString("en-US", options).replace(",", " at");
	}
}
