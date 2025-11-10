---
title: "Archiving INeedCoffee"
pubDate: 2025-05-25T05:37:34.000Z
author: "MAS"
categories: ["Web"]
tags: ["ineedcoffee", "links"]
description: "After 26 years, I decided to archive my main coffee site, INeedCoffee.com. I started it in April 1999 and actively posted new content until a few years ago. Each year, I would get my hosting bill..."
commentCount: 0
---

After 26 years, I decided to archive my main coffee site, [INeedCoffee.com](https://ineedcoffee.com). I started it in April 1999 and actively posted new content until a few years ago.

Each year, I would get my hosting bill from SiteGround to keep the site online, and I'd pull out my credit card and pay for the top plan because the site still gets 50,000 unique monthly visitors. However, since the site was not being updated, I converted everything to a static website.

Static sites are wonderful. No databases, no plugins, no themes, and no security concerns. Just raw HTML and CSS.

I found a script on GitHub to convert all my posts, categories, and authors to Markdown files. Thankfully, INeedCoffee did not have comments, which would have made the move more difficult. I had GitHub CoPilot modify the script to add front matter to the pages. From there, I built a static Astro site and deployed it to Netlify, where I can host it for free, even at my traffic levels.

I maintained the same link structure, so all inbound links to the site will resolve correctly.

If you have a WordPress site you aren't maintaining but wish to preserve for free, look into building a static site. AI tools can guide you.

This will be my last WordPress site. I love the idea of moving this blog to SubStack, but it can't handle importing comments. I consider the 12,306 comments on this blog as valuable as the 1,705 posts. I'll at least be able to move to a cheaper hosting plan.