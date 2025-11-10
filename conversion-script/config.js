export default {
	input: {
		xmlPath: "../criticalmas.WordPress.2025-11-10.xml",
		uploadsPath: "../uploads/",
	},
	output: {
		postsPath: "../astro-site/src/content/posts/",
		imagesPath: "img/", // relative to each post folder
		metadataPath: "../astro-site/src/data/",
	},
	processing: {
		convertHtmlToMarkdown: true,
		sanitizeComments: true,
		copyImages: true,
		optimizeImages: false, // optional for future
		linkConversion: {
			domain: "criticalmas.org",
			convertInternal: true,
		},
	},
	filters: {
		postStatus: ["publish"], // only published posts
		postType: ["post"], // exclude pages
		excludeCategories: [], // if any categories to skip
	},
	logging: {
		verbose: true,
		logFile: "./conversion-log.txt",
	},
};
