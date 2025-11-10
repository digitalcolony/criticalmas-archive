# Critical MAS - WordPress to Astro Conversion

This project converts the Critical MAS WordPress blog into a static Astro website.

## Project Structure

```
export-cm-wordpress/
├── PRD.md                          # Product Requirements Document
├── conversion-script/              # Node.js conversion tool
│   ├── src/
│   │   ├── index.js               # Main orchestrator
│   │   ├── parser.js              # WordPress XML parser
│   │   ├── converter.js           # HTML to Markdown
│   │   ├── comment-sanitizer.js   # Remove PII from comments
│   │   ├── image-processor.js     # Copy and organize images
│   │   ├── link-fixer.js          # Fix internal links
│   │   └── utils.js               # Helper functions
│   ├── config.js                  # Configuration
│   └── package.json
├── astro-site/                     # Astro static site
│   ├── src/
│   │   ├── content/
│   │   │   ├── config.ts          # Content collections schema
│   │   │   └── posts/             # Generated markdown posts
│   │   ├── layouts/
│   │   │   └── BaseLayout.astro   # Base page layout
│   │   ├── components/            # Reusable components
│   │   ├── pages/                 # Site pages
│   │   └── styles/
│   │       └── global.css         # Global styles
│   └── package.json
├── criticalmas.WordPress.2025-11-10.xml  # WordPress export
└── uploads/                        # WordPress media files
```

## Getting Started

### Step 1: Run the Conversion Script

Convert WordPress XML to Markdown posts:

\`\`\`bash
cd conversion-script
npm install
npm run convert
\`\`\`

For a dry run (preview only, no files written):

\`\`\`bash
npm run convert:dry-run
\`\`\`

This will:

- Parse the WordPress XML export
- Convert HTML content to Markdown
- Sanitize comments (remove email, IP addresses)
- Copy referenced images to post folders
- Generate posts in `astro-site/src/content/posts/`
- Create metadata files in `astro-site/src/data/`

### Step 2: Build & Run the Astro Site

\`\`\`bash
cd ../astro-site
npm install
npm run dev
\`\`\`

Visit http://localhost:4321 to preview the site.

### Step 3: Build for Production

\`\`\`bash
npm run build
npm run preview
\`\`\`

The built site will be in the `dist/` folder.

## Key Features

- ✅ Preserved post URLs: `/YYYY/MM/post-slug/`
- ✅ Sanitized comments appended to posts
- ✅ Images copied to post folders
- ✅ Internal links converted to relative paths
- ✅ Categories and tags preserved
- ✅ Clean, minimal design (no blue colors!)
- ✅ Responsive layout
- ✅ Archive by year, category, and tag

## Configuration

Edit `conversion-script/config.js` to customize:

- Input/output paths
- Processing options
- Link conversion rules
- Logging verbosity

## Deployment

The site can be deployed to any static hosting provider:

- **Netlify**: Drag and drop the `dist/` folder
- **Vercel**: Connect your repo and deploy
- **GitHub Pages**: Push `dist/` to gh-pages branch
- **Traditional hosting**: Upload `dist/` contents via FTP

## Notes

- This is an **archived blog** - no CMS or editing capability
- Comments are historical only (closed for new comments)
- All PII removed from comments (email, IP, URLs)
- Images only copied if referenced in posts
- Conversion log saved to `conversion-script/conversion-log.txt`

## Troubleshooting

**Missing images**: Check `conversion-log.txt` for details on which images couldn't be found.

**Broken links**: The conversion validates internal links. Check the log for any issues.

**Build errors**: Run `npm run build` in astro-site to see detailed error messages.

## Support

Refer to the [PRD.md](./PRD.md) for complete project documentation.
