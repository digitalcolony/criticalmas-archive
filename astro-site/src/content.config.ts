import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const postsCollection = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
	schema: z.object({
		title: z.string(),
		pubDate: z.coerce.date(),
		modifiedDate: z.coerce.date().optional(),
		author: z.string(),
		categories: z.array(z.string()),
		tags: z.array(z.string()),
		description: z.string(),
		commentCount: z.number().default(0),
	}),
});

export const collections = {
	posts: postsCollection,
};
