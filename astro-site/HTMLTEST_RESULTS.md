# HTMLTest Results - November 11, 2025

## Test Summary

- **Command Run**: `./bin/htmltest.exe`
- **Result**: 4,035 errors in 2,137 documents
- **Time**: 13.92 seconds

## Key Findings

### ✅ Fixed Issues

All previously identified broken links have been successfully removed:

- ✅ Sitemap files now exist with correct domain (criticalmas.org)
- ✅ Best-of collection links replaced (182 links)
- ✅ Missing images removed (3 images)
- ✅ Malformed blockquote cite attributes removed (4 links)
- ✅ Wrong-date URL links removed (25+ links)

### ⚠️ New Issue Discovered: Missing 2005-2008 Posts

**Problem**: Tag pages reference 4,035 posts from 2005-2008, but these posts don't exist in the `dist` folder.

**Evidence**:

- Source content exists: `/src/content/posts/2005-2008/` folders present
- Build output missing: `/dist/` only contains 2009-2025
- Errors: All broken links point to `/2005/`, `/2006/`, `/2007/`, `/2008/` URLs

**Example Errors**:

```
target does not exist --- tag/novelty/index.html --> /2009/01/iconoclast-a-neuroscientist-reveals-how-to-think-differently/
target does not exist --- tag/oil/index.html --> /2008/12/anatomy-of-a-bad-trade/
target does not exist --- tag/pets/index.html --> /2006/02/kato-1999-2006/
```

**Affected Areas**:

- Tag pages (all tags that reference pre-2009 posts)
- Category pages (potentially)
- Archive pages (potentially)

**Root Cause**:
The Astro build process is not generating pages for 2005-2008 content, even though the markdown files exist in the source. This could be due to:

1. Build configuration limiting years
2. Content collection schema issues
3. Frontmatter validation failures
4. Memory/performance limits during build

## Recommended Next Steps

1. **Investigate why 2005-2008 posts aren't building**:

   - Check Astro config for date filters
   - Look for errors in build output (full output, not just summary)
   - Validate frontmatter in 2005-2008 posts
   - Check for schema validation issues

2. **Options to resolve**:

   - **Option A**: Fix the build issue and include all years (recommended if content is wanted)
   - **Option B**: Remove 2005-2008 from source if not needed (archive decision)
   - **Option C**: Update tag/category pages to only show available posts

3. **Verify after fix**:
   - Rebuild site with all years
   - Run htmltest again
   - Confirm error count drops significantly

## Status

The link cleanup work is complete. The remaining errors are a separate build/content issue unrelated to the original broken link fixes.
