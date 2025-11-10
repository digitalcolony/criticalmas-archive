// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import { remarkRelativeImages } from "./src/remark-relative-images.mjs";
import rehypeRaw from "rehype-raw";

// https://astro.build/config
export default defineConfig({
	vite: {
		plugins: [tailwindcss()],
	},
	markdown: {
		remarkPlugins: [remarkRelativeImages],
		rehypePlugins: [rehypeRaw],
		gfm: true,
		smartypants: true,
	},
});
