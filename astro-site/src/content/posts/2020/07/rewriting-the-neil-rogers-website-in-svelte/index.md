---
title: "Rewriting the Neil Rogers Website in Svelte"
pubDate: 2020-07-21T05:48:44.000Z
modifiedDate: 2021-07-15T02:36:08.000Z
author: "MAS"
categories: ["Web"]
tags: ["history", "radio", "svelte", "wordpress"]
description: "One of the other websites that I maintain is neilrogers.org, which I discussed a little bit in the 2014 post My Tribute to Radio's Neil Rogers. You don't need to read that post. The short version is..."
commentCount: 1
---

One of the other websites that I maintain is [neilrogers.org](https://neilrogers.org/), which I discussed a little bit in the 2014 post [My Tribute to Radio's Neil Rogers](/2014/01/tribute-radios-neil-rogers/). You don't need to read that post. The short version is that after a popular radio personality died and then his web guy died, I knew that his fans were at risk of losing history. So I stepped forward to build up a website and audio archive to preserve that history. I worked with an older man named John in Florida. He was great with audio restorations. Along the way, I taught him enough WordPress that we were able to build out a 3,000-page website. Then in 2017, [John died](https://medium.com/@CriticalMAS/tribute-to-john-baker-neil-rogers-2c9127024b51). Since then I've been managing this website alone. Unlike this blog or [INeedCoffee](https://ineedcoffee.com), neilrogers.org doesn't really publish new content. It serves as a historical archive. But WordPress always demands attention, even if you don't post anything new. You constantly have to update the CMS, themes, plugins, and widgets. If you don't, you risk getting hacked. Even if you do stay on top of all the updates, bots are hammering WordPress sites like crazy. I've had to go to great lengths to [defend my sites](/2020/02/reducing-wordpress-executions-battling-the-bots/) against bots. And I know in another year, I'll be patching up the next threat. I wanted the site to be more maintainable and secure, so I decided to condense the entire site down to just 5 static HTML pages. The audio lives on YouTube, Archive, and OneDrive. We have a show spreadsheet on Google Docs and images are on a dedicated Flickr account. Prior to the rewrite, we had a page for every show, which turned out to be unmaintainable after John passed. The few true blogs the site hosted were migrated to Medium. ![neil rogers download](./img/nr-download.jpg) _The audio page_ Initially, I rewrote the site in Gatsby/React. It took about a month to learn enough to code the site. But it had one big problem, the soundboard page, which was originally coded in jQuery was crashing mobile devices. Seems React likes to create a huge DOM which worked fine on browsers, but not on mobile. After spending another week trying to get the soundboard working on mobile, I restarted the entire project with the Svelte/Sapper framework. What took me weeks to learn in Gatsby took hours in Svelte. And the [soundboard](https://neilrogers.org/soundboard/) ran perfectly on mobile. I'm not saying Svelte is better than React, but it is easier to learn and was the better option for my needs. The new site is super fast and uses lazy loading on the images (they load only when they come into view). I use [MVP.css](https://andybrewer.github.io/mvp/) as the minimalist CSS framework. And because the pages are generated static HTML, there is nothing for bots to hit. Now I have one fewer WordPress site and it feels great. The site is [backed up on GitHub](https://github.com/digitalcolony/neil-rogers-svelte). If you want to learn a tech skill during the lockdown, check out Svelte. There are videos on YouTube and Udemy. If you have a GitHub account, I'd appreciate it if you could give the [Simple Soundboard Svelte repo](https://github.com/digitalcolony/simple-soundboard-svelte) a star. ⭐😎

---

## Comments

### Elizabeth
*July 23 at 2020 at 11:26 AM*

Done and will do!  Thanks!

---

