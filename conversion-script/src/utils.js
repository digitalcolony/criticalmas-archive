import fs from "fs-extra";
import path from "path";
import chalk from "chalk";

/**
 * Logger utility with colored output
 */
export class Logger {
	constructor(logFilePath) {
		this.logFilePath = logFilePath;
		this.startTime = Date.now();
	}

	info(message) {
		console.log(chalk.blue("ℹ"), message);
		this.writeToFile(`[INFO] ${message}`);
	}

	success(message) {
		console.log(chalk.green("✓"), message);
		this.writeToFile(`[SUCCESS] ${message}`);
	}

	warn(message) {
		console.log(chalk.yellow("⚠"), message);
		this.writeToFile(`[WARN] ${message}`);
	}

	error(message, error = null) {
		console.log(chalk.red("✗"), message);
		this.writeToFile(`[ERROR] ${message}`);
		if (error) {
			console.error(error);
			this.writeToFile(error.stack || error.toString());
		}
	}

	writeToFile(message) {
		if (this.logFilePath) {
			const timestamp = new Date().toISOString();
			fs.appendFileSync(this.logFilePath, `[${timestamp}] ${message}\n`);
		}
	}

	summary(stats) {
		const duration = ((Date.now() - this.startTime) / 1000).toFixed(2);
		console.log("\n" + chalk.bold.cyan("=== Conversion Summary ==="));
		Object.entries(stats).forEach(([key, value]) => {
			console.log(chalk.cyan(`${key}:`), value);
		});
		console.log(chalk.cyan("Duration:"), `${duration}s\n`);

		this.writeToFile("\n=== Conversion Summary ===");
		Object.entries(stats).forEach(([key, value]) => {
			this.writeToFile(`${key}: ${value}`);
		});
		this.writeToFile(`Duration: ${duration}s\n`);
	}
}

/**
 * Slugify utility with consistent formatting
 */
export function slugify(text) {
	return text
		.toString()
		.toLowerCase()
		.trim()
		.replace(/\s+/g, "-")
		.replace(/[^\w\-]+/g, "")
		.replace(/\-\-+/g, "-")
		.replace(/^-+/, "")
		.replace(/-+$/, "");
}

/**
 * Extract year and month from date
 */
export function getDateParts(date) {
	const d = new Date(date);
	return {
		year: d.getFullYear().toString(),
		month: (d.getMonth() + 1).toString().padStart(2, "0"),
	};
}

/**
 * Ensure directory exists
 */
export async function ensureDir(dirPath) {
	await fs.ensureDir(dirPath);
}

/**
 * Safe file write
 */
export async function writeFile(filePath, content) {
	await fs.ensureDir(path.dirname(filePath));
	await fs.writeFile(filePath, content, "utf-8");
}

/**
 * Format date to ISO string
 */
export function formatDate(dateString) {
	return new Date(dateString).toISOString();
}

/**
 * Generate excerpt from content
 */
export function generateExcerpt(content, maxLength = 200) {
	// Remove markdown formatting and get plain text
	const plainText = content
		.replace(/#{1,6}\s/g, "") // Remove headers
		.replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1") // Remove links, keep text
		.replace(/[*_~`]/g, "") // Remove formatting
		.replace(/\n+/g, " ") // Replace newlines with spaces
		.trim();

	if (plainText.length <= maxLength) {
		return plainText;
	}

	// Find the last space before maxLength
	const truncated = plainText.substring(0, maxLength);
	const lastSpace = truncated.lastIndexOf(" ");

	return truncated.substring(0, lastSpace) + "...";
}

/**
 * Statistics tracker
 */
export class StatsTracker {
	constructor() {
		this.stats = {
			postsTotal: 0,
			postsProcessed: 0,
			postsFailed: 0,
			commentsProcessed: 0,
			categoriesFound: new Set(),
			tagsFound: new Set(),
			imagesFound: 0,
			imagesCopied: 0,
			imagesMissing: 0,
		};
	}

	increment(key, value = 1) {
		if (typeof this.stats[key] === "number") {
			this.stats[key] += value;
		}
	}

	add(key, value) {
		if (this.stats[key] instanceof Set) {
			this.stats[key].add(value);
		}
	}

	get() {
		return {
			...this.stats,
			categoriesFound: this.stats.categoriesFound.size,
			tagsFound: this.stats.tagsFound.size,
		};
	}
}
