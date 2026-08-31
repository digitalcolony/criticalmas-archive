#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Convert all relative image paths to absolute paths in markdown files
const postsDir = path.join(__dirname, "./src/content/posts");
let convertedCount = 0;

function processDir(dir) {
	const files = fs.readdirSync(dir);

	for (const file of files) {
		const filePath = path.join(dir, file);
		const stat = fs.statSync(filePath);

		if (stat.isDirectory()) {
			processDir(filePath);
		} else if (file === "index.md") {
			// Extract year/month/slug from the file path
			const pathParts = filePath.split(path.sep);
			const postsIndex = pathParts.findIndex((part) => part === "posts");

			if (postsIndex !== -1) {
				const year = pathParts[postsIndex + 1];
				const month = pathParts[postsIndex + 2];
				const slug = pathParts[postsIndex + 3];

				if (year && month && slug) {
					let content = fs.readFileSync(filePath, "utf-8");
					const originalContent = content;

					// Replace ./img/ paths with absolute paths
					content = content.replace(
						/!\[([^\]]*)\]\(\.\/img\/([^)]+)\)/g,
						(match, alt, filename) => {
							return `![${alt}](/${year}/${month}/${slug}/img/${filename})`;
						},
					);

					if (content !== originalContent) {
						fs.writeFileSync(filePath, content, "utf-8");
						convertedCount++;
						console.log(`Updated: ${year}/${month}/${slug}`);
					}
				}
			}
		}
	}
}

processDir(postsDir);
console.log(`\nTotal files updated: ${convertedCount}`);
