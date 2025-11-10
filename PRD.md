# Product Requirements Document (PRD)

## WordPress to Astro Static Site Conversion - Critical MAS Blog

**Project Name:** Critical MAS Blog Archive  
**Version:** 1.0  
**Date:** November 10, 2025  
**Status:** Planning Phase

---

## 1. Executive Summary

### 1.1 Project Overview

Convert the Critical MAS WordPress blog into a static website using Astro. This is an archived blog (2005-2025) that requires no future content management system. The conversion will preserve all posts, sanitized comments, images, categories, tags, and internal linking structure.

### 1.2 Goals

- Create a fast, maintainable static archive of 20 years of blog content
- Preserve all post content, metadata, and sanitized comments
- Maintain SEO-friendly URL structure
- Provide intuitive navigation through chronological and topical organization
- Implement a clean, minimal design aesthetic

### 1.3 Non-Goals

- Content management system or admin interface
- Dynamic commenting system
- Search functionality
- Post editing capabilities after initial conversion
- Social media integration
- Analytics (can be added later if desired)

---

## 2. Source Data

### 2.1 Input Files

- **WordPress Export:** `criticalmas.WordPress.2025-11-10.xml` (544,710 lines)
- **Media Library:** `uploads/` folder with images organized by year/month (2005-2025)

### 2.2 Blog Metadata

- **Title:** Critical MAS
- **Tagline:** An archived blog _(changed from "Better Living, Risk Adjusted")_
- **URL:** https://criticalmas.org
- **Author:** MAS (Michael Allen Smith)
- **Author Display Name:** MAS
- **Content Span:** January 2006 - November 2025
- **Post Type:** Single author blog

### 2.3 Content Structure

- **Posts:** Published blog posts with categories and tags
- **Comments:** Reader comments with author name, date, content
- **Categories:** Topics like Economics, Coffee, etc.
- **Tags:** Post-level keywords
- **Images:** Referenced images from uploads folder

---

## 3. Technical Architecture

### 3.1 Technology Stack

#### Frontend Framework

- **Astro 4.x** - Static site generator
  - Rationale: Optimal performance, minimal JavaScript, excellent content-focused sites
  - Features: Content collections, component islands, built-in optimizations

#### Styling

- **CSS/Tailwind CSS** - Utility-first CSS framework
  - Minimal, clean design
  - Color palette: Any colors EXCEPT blue
  - Responsive design for mobile/tablet/desktop

#### Content Processing

- **Node.js Script** - Custom XML parser and converter
  - Parse WordPress XML export
  - Convert HTML to Markdown
  - Extract and sanitize comments
  - Process image references and copy files
  - Generate frontmatter for Astro

#### Libraries (Proposed)

- **xml2js** or **fast-xml-parser** - Parse WordPress XML
- **turndown** - Convert HTML to Markdown
- **gray-matter** - Handle Markdown frontmatter
- **fs-extra** - File operations
- **sharp** - Image optimization (optional)

### 3.2 Project Structure

```
export-cm-wordpress/
├── PRD.md                          # This document
├── conversion-script/
│   ├── package.json
│   ├── src/
│   │   ├── parser.js              # Parse WordPress XML
│   │   ├── converter.js           # HTML to Markdown conversion
│   │   ├── image-processor.js     # Copy and organize images
│   │   ├── comment-sanitizer.js   # Remove PII from comments
│   │   └── index.js               # Main conversion orchestrator
│   └── output/                     # Temporary output during conversion
│
├── astro-site/                     # Generated Astro project
│   ├── src/
│   │   ├── content/
│   │   │   └── posts/             # Markdown posts
│   │   │       ├── 2006/
│   │   │       │   └── 01/
│   │   │       │       └── the-savings-rate-is-nonsense/
│   │   │       │           ├── index.md
│   │   │       │           └── img/
│   │   │       │               └── [post-images.jpg]
│   │   │       └── [YYYY]/[MM]/[post-slug]/
│   │   ├── pages/
│   │   │   ├── index.astro        # Home page
│   │   │   ├── about.astro        # About page
│   │   │   ├── archive.astro      # Archive page
│   │   │   ├── [year]/
│   │   │   │   └── [month]/
│   │   │   │       └── [slug]/
│   │   │   │           └── index.astro  # Post template
│   │   │   ├── category/
│   │   │   │   └── [category].astro     # Category pages
│   │   │   └── tag/
│   │   │       └── [tag].astro          # Tag pages
│   │   ├── components/
│   │   │   ├── Header.astro
│   │   │   ├── Footer.astro
│   │   │   ├── PostCard.astro
│   │   │   ├── CommentList.astro
│   │   │   ├── CategoryBadge.astro
│   │   │   └── ArchiveList.astro
│   │   ├── layouts/
│   │   │   └── BaseLayout.astro
│   │   └── styles/
│   │       └── global.css
│   ├── public/
│   │   └── favicon.ico
│   ├── astro.config.mjs
│   ├── package.json
│   └── tsconfig.json
│
├── criticalmas.WordPress.2025-11-10.xml  # Source XML
└── uploads/                               # Source images
```

---

## 4. Content Conversion Requirements

### 4.1 Post Processing

#### 4.1.1 Post Frontmatter

Each post markdown file must include:

```yaml
---
title: "Post Title"
pubDate: 2006-01-31T05:50:32Z
modifiedDate: 2014-10-27T20:56:00Z # If different from pubDate
author: "MAS"
slug: "post-slug"
categories: ["Economics", "Coffee"]
tags: ["savings", "brewing"]
description: "First 150-200 characters of content"
commentCount: 5
---
```

#### 4.1.2 Content Conversion Rules

1. Convert WordPress HTML content to clean Markdown
2. Preserve:
   - Paragraphs and line breaks
   - Bold, italic, links
   - Blockquotes
   - Ordered and unordered lists
   - Images with alt text
   - Code blocks (if any)
3. Update image URLs:
   - FROM: `https://criticalmas.org/wp-content/uploads/2006/02/image.jpg`
   - TO: `./img/image.jpg` (relative to post folder)
4. Preserve internal post links:
   - FROM: `https://criticalmas.org/2006/08/post-slug/`
   - TO: `/2006/08/post-slug/`
5. Keep external links as absolute URLs

#### 4.1.3 URL Structure Preservation

- **Current WordPress URL:** `/YYYY/MM/post-slug/`
- **New Astro URL:** `/YYYY/MM/post-slug/`
- **File Location:** `src/content/posts/YYYY/MM/post-slug/index.md`

### 4.2 Comment Processing

#### 4.2.1 Comment Sanitization

Extract and append comments to the end of each post with:

**INCLUDE:**

- Comment author name (first name only if full name provided)
- Comment date and time
- Comment content

**EXCLUDE (PII - Personally Identifiable Information):**

- Email addresses
- IP addresses
- Author URLs
- WordPress user IDs

#### 4.2.2 Comment Format

Comments should be appended as a section at the end of the Markdown:

```markdown
## Comments

### Rob

_May 28, 2008 at 1:21 PM_

Hey there! I'm taking this trip next month with my girlfriend. Just wondering how the transfers, bus rides where? Where they dangerous, comfortable? Any recommendations? Backpack vs. luggage with wheels?

---

### MAS

_May 28, 2008 at 1:54 PM_

Backpack for sure.

Our group leader took care of all the bus tickets. The roads in South America are very bumpy. I was able to read on those hours spent on the road, but many were not able to.

---
```

#### 4.2.3 Comment Metadata

- Store comment count in frontmatter: `commentCount: 5`
- Display comment count on post listings
- No comment threading (flatten all replies)
- Sort comments chronologically

### 4.3 Image Processing

#### 4.3.1 Image Reference Detection

1. Parse post content for image references
2. Extract image URLs from `<img>` tags or markdown
3. Identify source path in `uploads/` folder
4. Track which images are referenced across all posts

#### 4.3.2 Image Copy Rules

- **Only copy images that are referenced in posts**
- **Source:** `uploads/YYYY/MM/image.jpg`
- **Destination:** `src/content/posts/YYYY/MM/post-slug/img/image.jpg`
- Handle duplicate images (same image used in multiple posts)
  - Copy to each post's img folder OR
  - Use a shared public assets folder and update references

#### 4.3.3 Image Optimization (Optional)

- Compress images if over certain size threshold
- Generate responsive image sizes
- Convert to modern formats (WebP) with fallbacks
- Add lazy loading attributes

---

## 5. Site Features & Pages

### 5.1 Home Page (`/`)

#### Layout

- Site header with navigation
- Brief introduction/tagline
- Recent posts list (10-20 most recent)
- Sidebar or footer with:
  - Categories list
  - Popular tags cloud
  - Link to archive

#### Post Card Display

Each post card shows:

- Post title (linked)
- Publication date
- Categories (linked)
- Excerpt (first 200 characters)
- Comment count
- "Read more" link

### 5.2 About Page (`/about/`)

Content to include:

- Information about MAS
- Blog history (2005-2025)
- Purpose of the archive
- Contact information (if desired)
- Attribution/credits

_Note: Author to provide about page content_

### 5.3 Archive Page (`/archive/`)

#### View Options (Tabs or Sections)

**By Year:**

```
2025 (15 posts)
2024 (42 posts)
2023 (38 posts)
...
2006 (12 posts)
```

- Clicking year expands to show all posts from that year
- Posts grouped by month within year

**By Category:**

```
Coffee (125 posts)
Economics (87 posts)
Travel (56 posts)
...
```

- Clicking category goes to `/category/coffee/`
- Shows all posts in that category

**By Tag:**

- Tag cloud visualization
- Font size reflects post count
- Clicking tag goes to `/tag/savings/`

### 5.4 Individual Post Page (`/YYYY/MM/slug/`)

#### Layout Structure

1. **Header**
   - Site navigation
2. **Post Header**

   - Title
   - Publication date
   - Last modified date (if applicable)
   - Categories (linked)
   - Tags (linked)
   - Reading time estimate (optional)

3. **Post Content**

   - Markdown-rendered content
   - Embedded images
   - Proper typography

4. **Post Footer**

   - Share links (optional)
   - Related posts (3-5 based on categories/tags)

5. **Comments Section**

   - "Comments (X)" heading
   - List of historical comments
   - Note: "This is an archived blog. Comments are closed."

6. **Post Navigation**
   - Previous post link
   - Next post link (chronologically)

### 5.5 Category Pages (`/category/[category]/`)

- List all posts in category
- Show category name and post count
- Same post card format as home page
- Pagination if needed (25-50 posts per page)

### 5.6 Tag Pages (`/tag/[tag]/`)

- List all posts with tag
- Show tag name and post count
- Same post card format as home page
- Pagination if needed

### 5.7 404 Page

- "Page not found" message
- Link to home page
- Link to archive
- Search suggestions (without actual search)

---

## 6. Design Requirements

### 6.1 Design Principles

- **Minimal:** Clean, uncluttered layouts with ample whitespace
- **Friendly:** Approachable typography and comfortable reading experience
- **Readable:** High contrast, appropriate font sizes
- **Fast:** Optimized assets, minimal JavaScript
- **Responsive:** Mobile-first design

### 6.2 Color Palette

- **Exclude:** Blue colors (per requirement)
- **Suggested Palette:**
  - Primary: Warm gray or charcoal (#2D2D2D)
  - Accent: Orange/coral (#E67E22) or green (#27AE60) or purple (#8E44AD)
  - Background: Off-white (#FAFAFA)
  - Text: Dark gray (#333333)
  - Secondary text: Medium gray (#777777)
  - Links: Accent color with underline
  - Code blocks: Light gray background (#F5F5F5)

### 6.3 Typography

- **Headings:** Modern sans-serif (Inter, Nunito, or system font stack)
- **Body:** Readable serif (Georgia, Lora, Merriweather) or sans-serif
- **Code:** Monospace (Fira Code, JetBrains Mono, or Courier)

**Size Scale:**

- H1: 2.5rem (40px)
- H2: 2rem (32px)
- H3: 1.5rem (24px)
- Body: 1.125rem (18px)
- Small: 0.875rem (14px)

**Line Height:**

- Headings: 1.2
- Body: 1.7
- Code: 1.4

### 6.4 Layout Specifications

#### Max Widths

- **Reading content:** 65-75 characters (approx 700px)
- **Site container:** 1200px
- **Wide content (images):** 900px

#### Spacing

- **Section padding:** 4rem (64px) vertical
- **Component spacing:** 2rem (32px)
- **Element spacing:** 1rem (16px)

#### Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

---

## 7. Technical Requirements

### 7.1 Performance Targets

- **Lighthouse Score:** 95+ across all metrics
- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 2.5s
- **Total Bundle Size:** < 100KB (initial load)
- **Image Optimization:** All images < 500KB

### 7.2 SEO Requirements

- Semantic HTML5 elements
- Proper heading hierarchy
- Meta descriptions for all pages
- Open Graph tags for social sharing
- Structured data (JSON-LD) for blog posts
- XML sitemap generation
- robots.txt file
- Canonical URLs

### 7.3 Accessibility (WCAG 2.1 Level AA)

- Color contrast ratio 4.5:1 minimum
- Keyboard navigation support
- Screen reader friendly
- Alt text for all images
- Proper ARIA labels where needed
- Focus indicators on interactive elements

### 7.4 Browser Support

- Modern browsers (last 2 versions)
- Chrome, Firefox, Safari, Edge
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android)

---

## 8. Conversion Script Specifications

### 8.1 Script Architecture

```
conversion-script/
├── src/
│   ├── index.js              # Main orchestrator
│   ├── parser.js             # XML parsing
│   ├── converter.js          # HTML to Markdown
│   ├── image-processor.js    # Image handling
│   ├── comment-sanitizer.js  # PII removal
│   ├── link-fixer.js         # Internal link updates
│   └── utils.js              # Helper functions
├── config.js                 # Configuration
└── package.json
```

### 8.2 Processing Pipeline

#### Step 1: Parse WordPress XML

```javascript
Input: criticalmas.WordPress.2025-11-10.xml
Process:
  - Parse XML to JavaScript objects
  - Extract posts (wp:post_type === 'post' && wp:status === 'publish')
  - Extract comments for each post
  - Build post-comment relationships
  - Extract categories and tags
Output:
  - Array of post objects
  - Map of comments by post ID
  - List of all categories
  - List of all tags
```

#### Step 2: Convert Content to Markdown

```javascript
Input: Post HTML content
Process:
  - Parse HTML
  - Convert to Markdown (using turndown)
  - Extract image URLs
  - Convert internal WordPress URLs to relative paths
  - Clean up shortcodes
  - Format code blocks
Output: Clean Markdown content + image reference list
```

#### Step 3: Process Comments

```javascript
Input: Comments array for post
Process:
  - Sort by date (ascending)
  - Remove: email, IP, URL, user_id
  - Keep: author name, date, content
  - Convert to Markdown format
  - Append to post content
Output: Markdown comment section
```

#### Step 4: Generate Frontmatter

```javascript
Input: Post object
Process:
  - Extract metadata
  - Format dates (ISO 8601)
  - Normalize categories (lowercase, slug format)
  - Normalize tags
  - Generate description (first 200 chars)
  - Count comments
Output: YAML frontmatter
```

#### Step 5: Copy Referenced Images

```javascript
Input: List of image references from all posts
Process:
  - For each unique image:
    - Find source in uploads/
    - Determine destination post folder(s)
    - Copy file
    - Optionally compress/optimize
  - Log missing images
Output:
  - Images copied to post folders
  - Report of processed/missing images
```

#### Step 6: Create Post Files

```javascript
Input: Processed post data
Process:
  - Create directory structure: /YYYY/MM/post-slug/
  - Write index.md with frontmatter + content + comments
  - Create img/ subdirectory if images exist
  - Update image paths in content
Output: Complete post folder structure
```

#### Step 7: Generate Metadata Files

```javascript
Output:
  - categories.json (all categories with post counts)
  - tags.json (all tags with post counts)
  - posts-index.json (post metadata for archives)
  - conversion-log.txt (processing report)
```

### 8.3 Configuration Options

```javascript
// config.js
module.exports = {
	input: {
		xmlPath: "./criticalmas.WordPress.2025-11-10.xml",
		uploadsPath: "./uploads/",
	},
	output: {
		postsPath: "./astro-site/src/content/posts/",
		imagesPath: "img/", // relative to each post folder
	},
	processing: {
		convertHtmlToMarkdown: true,
		sanitizeComments: true,
		copyImages: true,
		optimizeImages: false, // optional
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
};
```

### 8.4 Error Handling

- Log all errors to conversion-log.txt
- Continue processing on non-critical errors
- Report summary at end:
  - Posts processed
  - Posts failed
  - Images found/missing
  - Comments processed

### 8.5 Dry Run Mode

- Preview mode that doesn't write files
- Shows what would be created
- Validates data integrity
- Checks for conflicts

---

## 9. Astro Implementation Details

### 9.1 Content Collections

```typescript
// src/content/config.ts
import { defineCollection, z } from "astro:content";

const postsCollection = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		pubDate: z.date(),
		modifiedDate: z.date().optional(),
		author: z.string(),
		slug: z.string(),
		categories: z.array(z.string()),
		tags: z.array(z.string()),
		description: z.string(),
		commentCount: z.number().default(0),
	}),
});

export const collections = {
	posts: postsCollection,
};
```

### 9.2 Dynamic Routes

```typescript
// src/pages/[year]/[month]/[slug]/index.astro
export async function getStaticPaths() {
	const posts = await getCollection("posts");

	return posts.map((post) => {
		const [year, month] = post.slug.split("/");
		return {
			params: { year, month, slug: post.data.slug },
			props: { post },
		};
	});
}
```

### 9.3 Category & Tag Pages

```typescript
// src/pages/category/[category].astro
export async function getStaticPaths() {
	const posts = await getCollection("posts");
	const categories = [...new Set(posts.flatMap((p) => p.data.categories))];

	return categories.map((category) => ({
		params: { category: slugify(category) },
		props: {
			category,
			posts: posts.filter((p) => p.data.categories.includes(category)),
		},
	}));
}
```

---

## 10. Deployment

### 10.1 Build Output

```bash
npm run build
# Generates: dist/ folder with static HTML, CSS, JS, images
```

### 10.2 Hosting Options

1. **Netlify** - Recommended for simplicity
2. **Vercel** - Alternative option
3. **GitHub Pages** - Free option
4. **Cloudflare Pages** - Good performance
5. **Traditional web host** - Upload dist/ folder

### 10.3 Domain Configuration

- Point criticalmas.org to hosting provider
- Set up SSL/TLS certificate
- Configure redirects if needed

### 10.4 Post-Launch Checks

- Verify all pages load correctly
- Test internal links
- Check image loading
- Validate XML sitemap
- Test on mobile devices
- Run Lighthouse audit

---

## 11. Testing & Validation

### 11.1 Content Validation

- [ ] All published posts converted
- [ ] Comments properly sanitized and appended
- [ ] Images display correctly
- [ ] Categories and tags accurate
- [ ] Internal links work
- [ ] External links preserved
- [ ] Code blocks render properly
- [ ] Special characters handled

### 11.2 Navigation Testing

- [ ] Home page loads
- [ ] Archive page functions
- [ ] Category pages work
- [ ] Tag pages work
- [ ] Post navigation (prev/next)
- [ ] 404 page displays
- [ ] Mobile menu works

### 11.3 Visual Testing

- [ ] Responsive design on all breakpoints
- [ ] Typography renders correctly
- [ ] Color scheme consistent
- [ ] Images sized appropriately
- [ ] Comments section formatted well
- [ ] Code blocks styled properly

### 11.4 Performance Testing

- [ ] Lighthouse score 95+
- [ ] Page load under 2s
- [ ] Images optimized
- [ ] No console errors
- [ ] Proper caching headers

---

## 12. Timeline & Milestones

### Phase 1: Setup (Week 1)

- [ ] Initialize Astro project
- [ ] Set up project structure
- [ ] Configure Tailwind CSS
- [ ] Create base layouts and components

### Phase 2: Conversion Script (Week 2)

- [ ] Build XML parser
- [ ] Implement HTML to Markdown converter
- [ ] Create comment sanitizer
- [ ] Develop image processor
- [ ] Test conversion on sample posts

### Phase 3: Content Migration (Week 3)

- [ ] Run full conversion
- [ ] Validate output
- [ ] Fix any issues
- [ ] Manual review of sample posts

### Phase 4: Astro Implementation (Week 4)

- [ ] Build all page templates
- [ ] Implement navigation
- [ ] Style components
- [ ] Create archive functionality

### Phase 5: Testing & Polish (Week 5)

- [ ] Comprehensive testing
- [ ] Fix bugs
- [ ] Performance optimization
- [ ] Accessibility audit

### Phase 6: Deployment (Week 6)

- [ ] Build production site
- [ ] Deploy to hosting
- [ ] Configure domain
- [ ] Final testing
- [ ] Go live

---

## 13. Success Metrics

### Conversion Success

- **100%** of published posts converted
- **95%+** of images successfully copied
- **100%** of comments sanitized properly
- **0** broken internal links

### Performance

- **95+** Lighthouse performance score
- **< 2s** average page load time
- **< 100KB** initial bundle size

### Quality

- **WCAG 2.1 AA** accessibility compliance
- **Mobile-friendly** design
- **Zero** console errors
- **Clean** code structure

---

## 14. Risks & Mitigation

### Risk 1: Incomplete XML Data

**Mitigation:** Validate XML structure early, handle missing fields gracefully

### Risk 2: Image References Broken

**Mitigation:** Build comprehensive image mapper, log missing images, provide fallback

### Risk 3: Content Conversion Issues

**Mitigation:** Test HTML to Markdown on diverse post samples, manual review

### Risk 4: Performance Issues

**Mitigation:** Implement lazy loading, optimize images, paginate large lists

### Risk 5: Link Structure Changes

**Mitigation:** Maintain exact WordPress URL structure, test thoroughly

---

## 15. Future Enhancements (Out of Scope)

- Full-text search functionality
- RSS feed
- Dark mode toggle
- Print-friendly styles
- Social sharing analytics
- Image galleries/lightbox
- Related posts algorithm improvements
- Reading progress indicator
- Bookmark/save functionality

---

## 16. Appendices

### 16.1 WordPress XML Structure Reference

```xml
<item>
  <title>Post Title</title>
  <link>URL</link>
  <pubDate>Date</pubDate>
  <dc:creator>Author</dc:creator>
  <content:encoded>HTML Content</content:encoded>
  <wp:post_id>ID</wp:post_id>
  <wp:post_date>Date</wp:post_date>
  <wp:post_name>slug</wp:post_name>
  <category domain="category">Category Name</category>
  <category domain="post_tag">Tag Name</category>
  <wp:comment>
    <wp:comment_author>Name</wp:comment_author>
    <wp:comment_date>Date</wp:comment_date>
    <wp:comment_content>Content</wp:comment_content>
  </wp:comment>
</item>
```

### 16.2 Sample Post Output

**File:** `src/content/posts/2006/01/the-savings-rate-is-nonsense/index.md`

```markdown
---
title: "The Savings Rate is Nonsense"
pubDate: 2006-01-31T05:50:32Z
modifiedDate: 2014-10-27T20:56:00Z
author: "MAS"
slug: "the-savings-rate-is-nonsense"
categories: ["Economics"]
tags: ["savings"]
description: "Today the AP is bemoaning that the savings rate in the USA hasn't been this low since 1933. Another jab at Americans for being irresponsible. Yet the truth is Americans..."
commentCount: 0
---

Today the AP is bemoaning that the savings rate in the USA hasn't been this low since 1933. Another jab at Americans for being irresponsible. Yet the truth is Americans put more money in their retirement funds than EVERY OTHER country on the planet...

[content continues]
```

### 16.3 Useful Commands

```bash
# Conversion script
cd conversion-script
npm install
npm run convert          # Full conversion
npm run convert:dry-run  # Preview only
npm run validate         # Check data integrity

# Astro development
cd astro-site
npm install
npm run dev              # Development server
npm run build            # Production build
npm run preview          # Preview production build
```

### 16.4 Dependencies

**Conversion Script:**

```json
{
	"dependencies": {
		"fast-xml-parser": "^4.3.2",
		"turndown": "^7.1.2",
		"gray-matter": "^4.0.3",
		"fs-extra": "^11.2.0",
		"slugify": "^1.6.6",
		"chalk": "^5.3.0"
	}
}
```

**Astro Site:**

```json
{
	"dependencies": {
		"astro": "^4.0.0",
		"tailwindcss": "^3.4.0",
		"@astrojs/tailwind": "^5.0.0"
	}
}
```

---

## 17. Glossary

- **Astro:** Modern static site generator focused on performance
- **Frontmatter:** Metadata at the top of markdown files (YAML format)
- **PII:** Personally Identifiable Information (email, IP, etc.)
- **Slug:** URL-friendly version of post title
- **Static Site:** Pre-rendered HTML pages (no server processing)
- **WordPress XML:** Export format containing all WordPress content
- **Content Collections:** Astro's type-safe content management
- **Turndown:** JavaScript library for HTML to Markdown conversion

---

## Document Control

**Author:** GitHub Copilot  
**Reviewed By:** [To be assigned]  
**Approved By:** [To be assigned]  
**Next Review Date:** Upon project completion

**Revision History:**

- v1.0 (2025-11-10): Initial PRD creation

---

**END OF DOCUMENT**
