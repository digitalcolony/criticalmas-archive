import { XMLParser } from "fast-xml-parser";
import fs from "fs-extra";
import { Logger } from "./utils.js";

/**
 * Parse WordPress XML export file
 */
export class WordPressParser {
	constructor(xmlPath, logger) {
		this.xmlPath = xmlPath;
		this.logger = logger;
		this.parser = new XMLParser({
			ignoreAttributes: false,
			attributeNamePrefix: "@_",
			textNodeName: "#text",
			cdataPropName: "__cdata",
			parseTagValue: false,
			trimValues: true,
		});
	}

	/**
	 * Main parse method
	 */
	async parse() {
		this.logger.info(`Reading WordPress XML from ${this.xmlPath}...`);

		const xmlContent = await fs.readFile(this.xmlPath, "utf-8");

		this.logger.info("Parsing XML...");
		const parsed = this.parser.parse(xmlContent);

		const channel = parsed.rss.channel;
		const items = Array.isArray(channel.item) ? channel.item : [channel.item];

		this.logger.info(`Found ${items.length} items in XML`);

		// Extract site metadata
		const siteInfo = {
			title: this.extractText(channel.title),
			link: this.extractText(channel.link),
			description: this.extractText(channel.description),
			author: this.extractAuthor(channel["wp:author"]),
		};

		// Process items
		const posts = [];
		const pages = [];

		for (const item of items) {
			const postType = this.extractText(item["wp:post_type"]);
			const postStatus = this.extractText(item["wp:status"]);

			if (postType === "post" && postStatus === "publish") {
				posts.push(this.parsePost(item));
			} else if (postType === "page" && postStatus === "publish") {
				pages.push(this.parsePost(item));
			}
		}

		this.logger.success(`Parsed ${posts.length} published posts`);

		return {
			siteInfo,
			posts,
			pages,
		};
	}

	/**
	 * Parse individual post
	 */
	parsePost(item) {
		const post = {
			id: this.extractText(item["wp:post_id"]),
			title: this.extractText(item.title),
			slug: this.extractText(item["wp:post_name"]),
			link: this.extractText(item.link),
			pubDate: this.extractText(item["wp:post_date_gmt"]) || this.extractText(item.pubDate),
			modifiedDate: this.extractText(item["wp:post_modified_gmt"]),
			author: this.extractText(item["dc:creator"]),
			content: this.extractText(item["content:encoded"]),
			excerpt: this.extractText(item["excerpt:encoded"]),
			categories: this.extractCategories(item.category),
			tags: this.extractTags(item.category),
			comments: this.extractComments(item["wp:comment"]),
			postType: this.extractText(item["wp:post_type"]),
			status: this.extractText(item["wp:status"]),
		};

		return post;
	}

	/**
	 * Extract author information
	 */
	extractAuthor(authorData) {
		if (!authorData) return null;

		return {
			id: this.extractText(authorData["wp:author_id"]),
			login: this.extractText(authorData["wp:author_login"]),
			email: this.extractText(authorData["wp:author_email"]),
			displayName: this.extractText(authorData["wp:author_display_name"]),
			firstName: this.extractText(authorData["wp:author_first_name"]),
			lastName: this.extractText(authorData["wp:author_last_name"]),
		};
	}

	/**
	 * Extract categories from category array
	 */
	extractCategories(categories) {
		if (!categories) return [];

		const cats = Array.isArray(categories) ? categories : [categories];
		return cats
			.filter((cat) => cat["@_domain"] === "category")
			.map((cat) => this.extractText(cat))
			.filter(Boolean);
	}

	/**
	 * Extract tags from category array
	 */
	extractTags(categories) {
		if (!categories) return [];

		const cats = Array.isArray(categories) ? categories : [categories];
		return cats
			.filter((cat) => cat["@_domain"] === "post_tag")
			.map((cat) => this.extractText(cat))
			.filter(Boolean);
	}

	/**
	 * Extract comments
	 */
	extractComments(comments) {
		if (!comments) return [];

		const commentArray = Array.isArray(comments) ? comments : [comments];

		return commentArray
			.filter((comment) => this.extractText(comment["wp:comment_approved"]) === "1")
			.filter(
				(comment) =>
					this.extractText(comment["wp:comment_type"]) === "comment" || !comment["wp:comment_type"]
			)
			.map((comment) => ({
				id: this.extractText(comment["wp:comment_id"]),
				author: this.extractText(comment["wp:comment_author"]),
				email: this.extractText(comment["wp:comment_author_email"]),
				url: this.extractText(comment["wp:comment_author_url"]),
				ip: this.extractText(comment["wp:comment_author_IP"]),
				date:
					this.extractText(comment["wp:comment_date_gmt"]) ||
					this.extractText(comment["wp:comment_date"]),
				content: this.extractText(comment["wp:comment_content"]),
				approved: this.extractText(comment["wp:comment_approved"]),
				parent: this.extractText(comment["wp:comment_parent"]),
				userId: this.extractText(comment["wp:comment_user_id"]),
			}));
	}

	/**
	 * Extract text from CDATA or regular text node
	 */
	extractText(node) {
		if (!node) return "";
		if (typeof node === "string") return node;
		if (node.__cdata) return node.__cdata;
		if (node["#text"]) return node["#text"];
		return "";
	}
}
