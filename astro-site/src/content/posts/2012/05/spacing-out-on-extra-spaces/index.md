---
title: "Spacing Out on Extra Spaces"
pubDate: 2012-05-03T00:05:11.000Z
modifiedDate: 2020-12-19T02:50:40.000Z
author: "MAS"
categories: ["Web"]
tags: ["typography"]
description: "One year ago an article I read convinced me that one of my deepest beliefs was wrong. The article was Space Invaders: Why you should never, ever use two spaces after a period by Farhad Manjoo. > Can..."
commentCount: 11
---

One year ago an article I read convinced me that one of my deepest beliefs was wrong. The article was [Space Invaders: Why you should never, ever use two spaces after a period](http://www.slate.com/articles/technology/technology/2011/01/space_invaders.html) by Farhad Manjoo.

> Can I let you in on a secret? Typing two spaces after a period is totally, completely, utterly, and inarguably _wrong_.

When I was in school, I had been taught to drop 2 spaces after every period, question mark, and exclamation mark. In a world of monospace fonts, that _might_ make readability better, but not for the vast majority of fonts, which aren't monospaced. The Slate article really impacted me. I was convinced, so around June of last year, I broke a lifetime habit of double-tapping the space bar. ![spacebar](./img/3429413001_3a8e7c1eeb_z.jpg) _[Photo](https://flic.kr/p/6e3D1n) by Jake Bouma_ Within a week of doing the single space, I could see how much nicer the fonts were lining up. Whenever I went back into the blog archives to collect a link, I'd cringe a little seeing all those extra spaces. Every now and then I'd hand edit the post and remove those extra spaces. The problem is this site has over 1700 posts. That could take forever. A few weeks ago I was doing some housekeeping on this site and decided to do something programmatically about it. I wrote some queries to remove extra spaces out, but they didn't work. After a lot of work, I determined that the ASCII codes for the first and second space after a sentence were different. Then I modified a stored procedure to clean the posts of these evil hidden spaces. Before running the query, I did several tests and it appeared to be solid code. So I ran it and it appeared to work. All those extra spaces from December 2005 to June 2011 were gone. All was not well though. I started seeing cases where words that should have been separated by spaces were now collapsed. And there was no rhyme or reason on where it happened. Last night I wrote I stored procedure to locate long words, with the thought that some of these long words were really pairs of words packed together. I found a bunch and I'm still finding more. I went from having yucky typography to having a number of spelling errors. I do have a backup, but I'm hesitant to roll back because far more posts were positively impacted than negatively. This might take a while. **UPDATE:** Eventually all the extra spaces were removed. There may be a few stray ones left, but the bulk is gone.

---

## Comments

### Joe
*May 2 at 2012 at 5:38 PM*

You might be able to do something with <code><a href="http://dev.mysql.com/doc/refman/5.1/en/regexp.html" rel="nofollow">RLIKE</a></code> for this to track down the miscreants. Something like:

<code>SELECT post_content,*
FROM wp_posts
WHERE post_content RLIKE '.[^ ]';</code>

or

<code>SELECT post_content,*
FROM wp_posts
WHERE post_content RLIKE '.[:alnum:]';</code>

Frustrating.

---

### John
*May 2 at 2012 at 5:54 PM*

I work at a company in which the developers are notorious for double spaces and even double periods (what do those even mean?). I work in QA, and Dev hates me because I file bugs whenever I see things like that. Oddly enough, the TechPubs people are never mad when I find those issues in their docs.

---

### dhammy
*May 2 at 2012 at 6:31 PM*

We were always taught in school to use two spaces after every end-of-sentence punctuation.  So it is and so I still do.  But, ultimately, who the hell cares?  It really just does not matter in the least and I will barely notice if someone uses one or two.  It changes readability not one iota.

It's seems wasteful (and a bit borderline OCD) in my mind if you spend more than 60 seconds of your life even thinking about this :p

---

### MAS
*May 2 at 2012 at 6:36 PM*

@Joe - Both those queries return close to 100% of the posts. I believe this has to do with the fact that we don't see carriage returns in the LONGTEXT field. Thanks anyway.

@John - On my tech site DigitalColony.com I even markup the code for better legibility. the MySQL site has atrocious typography. 

@Dhammy - More than 60 seconds? Yeah, I'm up to a few hours now. :) The thing is I notice and it bothers me. Now I am noticing it on other sites. OCD maybe. At least I have the readability plugin to make my eyes happy.

---

### Matt
*May 2 at 2012 at 7:08 PM*

You know, this makes sense however I've been typing with two spaces after a period for way too long to ever be able to make the change! Though for you, just this time since I'm thinking about it, I'm going to work against every fiber of my person to only space once after each sentence. Learned to type in 7th grade circa 1987, and never heard this until seasoned journalist Gene Weingarten mentioned it in a Washington Post chat.

---

### MAS
*May 2 at 2012 at 7:17 PM*

@Matt - I thought this habit would be too ingrained to fix, but it only took a few days to break it. Once I did, my posts looked better so it had an immediate positive feedback loop.

---

### Joe
*May 2 at 2012 at 7:57 PM*

Ah! Of course, most posts will have periods with newlines right after. So perhaps more like:

<code>SELECT post_content,*
FROM wp_posts
WHERE post_content RLIKE '.[^:space:]';</code>

I'd have to play with it more. But I think you can narrow a bit with the right regex.

---

### MAS
*May 3 at 2012 at 12:52 AM*

@Joe - It didn't work. This is the same problem I had when I tried to remove the "evil space". SQL doesn't see it. Also, the bizarre thing I am seeing is that the majority of collapsed words are not in front of a period. Just random words.

---

### Joe
*May 3 at 2012 at 1:33 AM*

Frustrating. My instinct remains that some query could help you identify these - but either my assumptions about those characters or my MySQL syntax are wrong. Or both. :-)

---

### MAS
*May 3 at 2012 at 2:41 AM*

@All - I found a FireFox plugin that alerts me to spelling errors. Not only am I finding the space issues quickly, but it is catching other spelling errors. 

https://addons.mozilla.org/en-US/firefox/addon/spell-checker/

---

### Nick
*May 4 at 2012 at 9:36 PM*

Yikes!  I always add two spaces.  Like in this comment.  This is going to be a hard one to break.

---

