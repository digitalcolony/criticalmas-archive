// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
	site: "https://criticalmas.org",
	integrations: [sitemap()],
	vite: {
		plugins: [tailwindcss()],
	},
	image: {
		service: { entrypoint: "astro/assets/services/noop" },
	},
});
