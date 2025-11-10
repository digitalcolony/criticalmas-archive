import { defineCollection, z } from "astro:content";

const postsCollection = defineCollection({
	type: "content",
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
