import { readdir, copyFile, mkdir } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function copyImages() {
	const postsDir = join(__dirname, "src/content/posts");
	const publicDir = join(__dirname, "public");

	let copiedCount = 0;
	let errorCount = 0;

	async function processYear(yearPath, year) {
		const months = await readdir(yearPath, { withFileTypes: true });

		for (const month of months) {
			if (!month.isDirectory()) continue;

			const monthPath = join(yearPath, month.name);
			const posts = await readdir(monthPath, { withFileTypes: true });

			for (const post of posts) {
				if (!post.isDirectory()) continue;

				const postPath = join(monthPath, post.name);
				const imgDir = join(postPath, "img");

				try {
					const images = await readdir(imgDir);

					// Create public/YYYY/MM/post-slug/img/
					const publicImgDir = join(publicDir, year, month.name, post.name, "img");
					await mkdir(publicImgDir, { recursive: true });

					// Copy each image
					for (const image of images) {
						const srcPath = join(imgDir, image);
						const destPath = join(publicImgDir, image);
						await copyFile(srcPath, destPath);
						copiedCount++;
					}
				} catch (err) {
					// No img directory for this post, skip
					if (err.code !== "ENOENT") {
						console.error(`Error processing ${postPath}:`, err.message);
						errorCount++;
					}
				}
			}
		}
	}

	const years = await readdir(postsDir, { withFileTypes: true });

	for (const year of years) {
		if (!year.isDirectory()) continue;
		console.log(`Processing ${year.name}...`);
		await processYear(join(postsDir, year.name), year.name);
	}

	console.log(`\nDone! Copied ${copiedCount} images to public directory.`);
	if (errorCount > 0) {
		console.log(`Errors: ${errorCount}`);
	}
}

copyImages().catch(console.error);
