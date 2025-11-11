// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import { remarkRelativeImages } from "./src/remark-relative-images.mjs";
import rehypeRaw from "rehype-raw";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
	site: "https://criticalmas.org",
	integrations: [sitemap()],
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
