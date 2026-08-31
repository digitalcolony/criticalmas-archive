import { visit } from "unist-util-visit";

/**
 * Remark plugin to convert relative image paths to absolute public paths
 * Transforms: ./img/photo.jpg -> /YYYY/MM/post-slug/img/photo.jpg
 *
 * This plugin can be used in the content config to handle image paths
 * before Astro processes them.
 */
export function remarkRelativeImages(postId) {
	return function (tree, file) {
		// Extract year, month, slug from post ID (format: YYYY/MM/post-slug)
		const [year, month, slug] = postId.split("/");

		if (!year || !month || !slug) return;

		visit(tree, "image", (node) => {
			// Only process relative image paths starting with ./img/
			if (node.url && node.url.startsWith("./img/")) {
				const filename = node.url.replace("./img/", "");
				node.url = `/${year}/${month}/${slug}/img/${filename}`;
			}
		});
	};
}

/**
 * Old version that extracts path from file.history
 * Kept for backward compatibility
 */
export function remarkRelativeImagesFromFile() {
	return function (tree, file) {
		// Extract year, month, slug from the file path
		// Path format: src/content/posts/YYYY/MM/post-slug/index.md
		const pathParts = file.history[0].split(/[/\\]/);
		const postsIndex = pathParts.findIndex((part) => part === "posts");

		if (postsIndex === -1) return;

		const year = pathParts[postsIndex + 1];
		const month = pathParts[postsIndex + 2];
		const slug = pathParts[postsIndex + 3];

		if (!year || !month || !slug) return;

		visit(tree, "image", (node) => {
			// Only process relative image paths starting with ./img/
			if (node.url && node.url.startsWith("./img/")) {
				const filename = node.url.replace("./img/", "");
				node.url = `/${year}/${month}/${slug}/img/${filename}`;
			}
		});
	};
}
