# Pagefind Search Implementation

This document describes the Pagefind search feature used on the EcofriendlyCoffee archive site and explains how it is built so it can be reused on other Astro websites as a requirement and implementation reference.

## Purpose

The site includes a full-text article search that lets visitors find archived posts quickly without requiring a server-side search backend.

The implementation uses Pagefind, a static-site search engine designed for SSGs such as Astro. It indexes the generated HTML and provides a fast client-side search experience with minimal runtime overhead.

## Goals

- Provide article search across the static archive
- Keep search lightweight and static-site friendly
- Match the Pagefind recommended modal/search overlay interaction pattern
- Avoid layout shift and preserve the page structure
- Work across desktop and mobile layouts
- Support both light and dark themes
- Integrate cleanly into the existing Astro header navigation

## Requirements

### Functional requirements

- Search should work on all published pages in the generated site
- Search should find article content, titles, and section text
- Results should open as a focused modal overlay, not as an inline dropdown that pushes the layout
- Search should be keyboard accessible via Ctrl/Cmd + K
- Search should be theme-aware and readable in both light and dark mode
- Search should behave well on narrow viewport/mobile screens

### Non-functional requirements

- Search index should be generated during the production build
- Indexing should not require a backend service
- The feature should be static and deployable to a CDN or static host
- Search should remain performant even with a large archive
- Search UI should be easy to copy to similar Astro sites

## Architecture

The implementation is built with these parts:

1. Pagefind dependency
2. Astro build pipeline
3. Global head asset loading
4. Header-mounted trigger and modal
5. Theme-aware styling overrides
6. Postbuild indexing step

## Package setup

Pagefind is installed as a dev dependency in the project.

```json
{
	"scripts": {
		"build": "npm run copy-images && astro build && npx pagefind --site dist"
	},
	"devDependencies": {
		"pagefind": "^1.4.0"
	}
}
```

This is the key integration point: the production build is followed immediately by `npx pagefind --site dist`, so the generated static HTML is indexed before deployment.

## Important migration note

This project was migrated from the legacy Pagefind Default UI to the Component UI recommended in Pagefind 1.5+.

The warning that appears when using the old path is:

> Default UI detected (pagefind-ui.js). Supported, but new projects should use Component UI.

The reason is simple: `pagefind-ui.js` is the older interface, while `pagefind-component-ui.js` is the newer modal-first API with better accessibility and a cleaner integration pattern.

For new integrations, always prefer the Component UI.

## Build integration

The project expects a static build step followed by Pagefind indexing. The actual workflow used here is:

```bash
npm run build
```

The build script runs Astro first and then invokes Pagefind over the generated static output:

```json
"build": "npm run copy-images && astro build && npx pagefind --site dist"
```

This produces the generated search index under `dist/pagefind`.

The important thing is that the search engine runs against the built HTML, not against the source Markdown files.

## Astro integration

The site loads Pagefind’s Component UI assets globally in the document head.

This is the exact pattern used here:

```astro
<link rel="stylesheet" href="/pagefind/pagefind-component-ui.css" />
<script src="/pagefind/pagefind-component-ui.js" type="module"></script>
```

This makes the Pagefind web components available throughout the site and is the correct migration away from the older Default UI path.

## UI pattern

The preferred interaction pattern is the Pagefind Component UI modal, using:

```astro
<div class="search-widget" aria-label="Article search">
  <pagefind-modal-trigger
    class="search-trigger"
    placeholder="Search archive"
    hide-shortcut="false"
    shortcut="mod+k"
  >
    Search
  </pagefind-modal-trigger>
  <pagefind-modal class="search-modal"></pagefind-modal>
</div>
```

This is the actual pattern used in the project and is the recommended approach for new Pagefind integrations.

The modal opens above the page content, centered on the viewport, and does not participate in the document flow. This prevents layout shift and keeps the header/navigation stable.

## Header implementation

The header is the place where the search trigger is mounted. In this implementation, the search control sits in the site navigation and the actual search interaction happens inside the modal overlay.

This is the live structure used here:

```astro
<div class="search-widget" aria-label="Article search">
  <pagefind-modal-trigger
    class="search-trigger"
    placeholder="Search archive"
    hide-shortcut="false"
    shortcut="mod+k"
  >
    Search
  </pagefind-modal-trigger>
  <pagefind-modal class="search-modal"></pagefind-modal>
</div>
```

This keeps the search control visible in the main site navigation without pushing the layout or forcing an inline dropdown.

## Styling approach

The modal is styled with CSS custom properties to match the site theme.

Important Pagefind variables used in this project include:

- `--pf-background`
- `--pf-text`
- `--pf-border`
- `--pf-primary`
- `--pf-hover`
- `--pf-modal-backdrop`
- `--pf-modal-max-width`
- `--pf-modal-max-height`
- `--pf-modal-top`
- `--pf-input-height`
- `--pf-font`

Example:

```css
.search-modal {
	--pf-background: var(--card-bg);
	--pf-text: var(--text-color);
	--pf-border: var(--border-color);
	--pf-primary: var(--accent);
	--pf-hover: rgba(var(--accent), 0.08);
	--pf-modal-backdrop: rgba(15, 23, 42, 0.45);
	--pf-modal-max-width: min(760px, calc(100vw - 2rem));
	--pf-modal-max-height: min(78vh, 620px);
	--pf-modal-top: 8vh;
	--pf-input-height: 52px;
	--pf-font: "Atkinson", sans-serif;
}
```

This allows the modal to match the visual language of the site while preserving the Pagefind component’s internal behavior and accessibility structure.

## Light and dark mode handling

The design uses theme-specific overrides so the modal stays legible in both modes.

- Light mode: white or soft neutral panel, dark text, blue focus border
- Dark mode: darker panel, bright text, subtle border and hover states

This is done through CSS selectors tied to the site’s theme classes, such as `.light-mode` and `.dark-mode`.

## Mobile behavior

The mobile implementation adds responsive rules so the search remains usable on narrow screens:

- the site title stays on the left, while the menu/theme controls remain to the right
- the search control drops to a full-width row below the title/actions on smaller screens
- the modal remains centered and readable
- the navigation menu can maintain a solid background when expanded
- the search control does not crowd the header controls

The actual fix used in this project was to reorder the nav items with explicit `order` values and to widen the search trigger to `width: 100%` on mobile while keeping the title and controls compact. The adjustment is intentionally small and keeps the header visually aligned with the reference layout.

Example mobile layout CSS used here:

```css
@media (max-width: 720px) {
  nav {
    flex-wrap: wrap;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }

  h2 {
    order: 1;
    flex: 1;
  }

  .theme-toggle {
    order: 2;
    margin-left: auto;
  }

  .menu-toggle {
    order: 3;
    display: block;
  }

  .search-widget {
    order: 4;
    width: 100%;
    margin: 0.7rem 0 0;
  }

  .search-trigger {
    width: 100%;
    min-height: 44px;
    padding: 0.75rem 1rem;
  }
}
```

This is controlled with media queries and mobile-specific styles, rather than changing the component logic itself.

## Accessibility

The Pagefind UI already provides keyboard support and interaction semantics, but the site integration adds the expected structure around it:

- search trigger within the navigation
- label/aria context on the widget
- keyboard shortcut support via `shortcut="mod+k"`
- modal behavior that is easier to focus and navigate than inline search results

## Operational notes

### Build flow

A typical requirement flow for another Astro site is:

1. install `pagefind`
2. add the Pagefind CSS/JS includes to the global site head
3. add Pagefind modal trigger + modal markup in the navigation/header
4. style the modal using CSS variables to match the site theme
5. run the production build
6. run Pagefind against the static output
7. verify the search trigger works on desktop and mobile

### Production checklist

- `pagefind` present in package dependencies
- build script completes without errors
- static output includes `/pagefind` generated assets
- search trigger visible in layout
- modal opens and closes correctly
- modal styles work in light/dark mode
- keyboard shortcut works
- mobile viewport remains usable

## Recommended reuse pattern for other Astro sites

For future Astro projects, this is the recommended baseline for Pagefind 1.5+:

```astro
<link rel="stylesheet" href="/pagefind/pagefind-component-ui.css" />
<script src="/pagefind/pagefind-component-ui.js" type="module"></script>
```

```astro
<div class="site-search" aria-label="Search archive">
  <pagefind-modal-trigger
    class="search-trigger"
    placeholder="Search archive"
    hide-shortcut="false"
    shortcut="mod+k"
  >
    Search
  </pagefind-modal-trigger>
  <pagefind-modal class="search-modal"></pagefind-modal>
</div>
```

```css
.search-modal {
	--pf-background: #fff;
	--pf-text: #111827;
	--pf-border: rgba(59, 130, 246, 0.7);
	--pf-primary: #2337ff;
	--pf-hover: rgba(35, 55, 255, 0.08);
	--pf-modal-backdrop: rgba(0, 0, 0, 0.35);
	--pf-modal-max-width: min(760px, calc(100vw - 2rem));
	--pf-modal-top: 8vh;
}
```

```json
{
	"scripts": {
		"build": "astro build && npx pagefind --site dist"
	},
	"devDependencies": {
		"pagefind": "^1.4.0"
	}
}
```

Then run the normal production build and let Pagefind index the generated static site.

## Summary

This site uses a static-site-friendly search architecture based on Pagefind’s Component UI. It is designed to feel like a modern modal search experience while staying lightweight, accessible, and easy to port to other Astro websites.

The core idea is simple: build the site, index the generated HTML, and surface the result via a lightweight site header trigger that opens a centered modal overlay.
