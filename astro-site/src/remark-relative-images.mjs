import { visit } from "unist-util-visit";

/**
 * Remark plugin to convert relative image paths to absolute public paths
 * Transforms: ./img/photo.jpg -> /YYYY/MM/post-slug/img/photo.jpg
 */
export function remarkRelativeImages() {
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
