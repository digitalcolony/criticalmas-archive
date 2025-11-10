---
title: "Ray Peat Died. Now What?"
pubDate: 2022-12-17T06:34:29.000Z
modifiedDate: 2023-08-16T22:49:07.000Z
author: "MAS"
categories: ["Web"]
tags: ["history", "ray peat"]
description: "Recently, nutritional pioneer Ray Peat died at the age of 86. I have several posts on this blog that reference his work. I'm not a strict follower, but I have borrowed some of his ideas. This post..."
commentCount: 9
---

Recently, nutritional pioneer Ray Peat died at the age of 86. I have several posts on this blog that reference his work. I'm not a strict follower, but I have borrowed some of his ideas. This post will not be about Ray's contribution to our understanding of nutrition. It will be about preserving the digital legacy of someone that has passed away.


### Dead Men Can't Pay For Web Hosting


When I heard that Ray had passed away, my first thought was what was to become of his website. Ray did a great job with his site. He published his articles and he left them alone. Unlike so many in the nutritional space, he kept his site going, and he didn't move links. I run a broken link checker on this site and I've never once had to fix a broken link to RayPeat.com. I hope Ray has an assigned backup for his domain registration and if so, I hope they maintain his website. But I am doubtful. Many of his most popular followers have demonstrated the inability to keep their own websites up and running. See my 2017 post titled [The Digital Graveyard of My Health and Fitness Mentors](/2017/03/digital-graveyard-health-fitness-mentors/) for examples. Whois hides the registrar information for RayPeat.com, but it does say the domain is expiring on March 1, 2023. If it is not renewed, bots are far more likely to capture the domain faster than a fan the second it becomes available. If that happens, all of Ray's writing will be taken down and replaced with spammy affiliate links. There are thousands of inbound links to RayPeat.com. That makes it worth the effort to capture the domain. ![raypeat.com](./img/raypeat-dom.jpg) _Screenshot of RayPeat.com_


### My Story


In 2010, a popular Miami-based radio personality died. Then a few months later, the man running his website died. From the post [My Tribute to Radio’s Neil Rogers](/2014/01/tribute-radios-neil-rogers/):

> Just when I was about to reach out to Eric, I discovered he had recently died. Young man too. I believe he was in his 40s. Eric was a one-man operation. At this point, I realized it was just a matter of time before the _NeilRogers.com_ site went dark. Servers need human intervention and they also need someone to pay the electric bill. Using a download program I was able to grab all the audio from the site, which were the bits he played. A few months later the site went dark. There was no backup name on the domain registration. No one knew anyone associated with Eric. To this day the data on that server or any backups remain lost.

The rest of the post describes the other steps I took to successfully preserve that digital legacy.


### My Advice


I hope I'm wrong and someone out there continues to renew the registrar and hosting. But if not, here is what I would do.

1.  Copy every article off of RayPeat.com
2.  Create a bare-bones HTML mobile-friendly (responsive website). No server code (WordPress, Drupal, etc). Static HTML and CSS only.
3.  Go to GitHub.com and create a repo for the site. Make the repo public. This allows anyone the ability to download or copy (fork) Ray's work.
4.  Once the repo is set up, use the GitPages feature in the repo to create a free website.
5.  If RayPeat.com is lost, buy a new domain. I bought NeilRogers.org when NeilRogers.com was lost. Map the domain to the GitPages and then set the payment to the registrar to auto-renew annually.

The good news is the effort to save Ray's content is far less than the work I had to do to save thousands of hours of audio. All of RayPeat.com could be saved in a weekend, but the clock is ticking. Some might argue that the Wayback Machine on Archive has snapshot copies of RayPeat.com, so all my outlined steps are unnecessary. That is true today, but not necessarily true in the future. I love the Wayback Machine and have even donated money to them, but whoever owns a domain can request that their domain be removed from their search results. This means if someone that doesn't care about Ray's work acquires the domain, they can have the domain scrubbed from the Wayback Machine. I briefly poked around the Ray Peat Forums and Reddit page. I didn't see anyone mention preserving his website. I hope I missed the post and someone has already taken a leadership role. Please leave a comment if you are that person or if you need my assistance. I expect I will have to update some broken links to Ray's site next year. **UPDATE August 2023:** Stef B alerted me that there is now a [mirror for all Ray Peat's articles](https://expulsia.com/health/peat-index).

---

## Comments

### Christian
*December 17 at 2022 at 11:34 AM*

RayPeat.com doesn't have a ton of content, so archiving was really fast, actually.

If anyone else wants to crawl and download the page, this command in a shell will do:

<code>$ wget \
         --recursive \
         --no-clobber \
         --page-requisites \
         --html-extension \
         --convert-links \
         --restrict-file-names=windows \
         --domains raypeat.com \
         --no-parent \
             http://raypeat.com
</code>


One could drop the <code>--html-extension</code> flag; then the articles will download as .shtml instead of .shtml.html. 

This could be desirable to keep existing links  working. I left this in for reference because in other archival processes, I was happy to have the .html extension to make it possible to inspect files in a local browser quickly.

The header image in rotation will be stored as 'rotate.php' even though it's an image.

Now someone figure out how to get the domain for posterity :)

---

### MAS
*December 17 at 2022 at 2:56 PM*

@Christian - Nice. I haven't touched Wget in years.

---

### russ
*December 24 at 2022 at 2:23 PM*

please contact danny roddy ,i feel sure he would like to help

---

### CB
*December 26 at 2022 at 4:59 AM*

the other person who might help is Georgi D. @haidut 
http://haidut.me

and it's Danny Roddy @dannyroddy

I'm hoping his estate will be willing to publish more (maybe all?) of his work. I will help with preserving his site and the domain. contact me, please. I've been a Peat student since '99!

---

### Andrew
*December 30 at 2022 at 4:46 AM*

As an aspiring author and small content creator myself (nutritional-humility.me) [currently under rebranding], I too am saddenned by this news. 

Another way people can still read and/or access his materials, particularly, his newsletters is visiting the Archive.org. The link (hopefully if I'm allowed to post URLs in comments) is here https://archive.org/details/mega-master-ray-newsletter

^ Warning: massive PDF. 320 Megabytes. This PDF is curation of every release.

Whilst my dietary / sustenance philosophy is in many ways stark opposite to Ray's (Cyclical Keto + IF) ~ he nonetheless implore self-experimentation, and never be afraid to challenge authoritarianism. The latter, is pretty much what everyone should ably relate.  

Live-it-forward,
AW. nutritional-humility.me

---

### MAS
*December 30 at 2022 at 3:33 PM*

@Andrew - best of luck on your site and rebranding. I love Archive - however - it is not ideal for those of that have deep links to specific articles. Archive is great if you already know about Ray and know what to look for. 

@All - I'm not going to take a leadership role on preserving Ray's articles. I have too many projects more important to me. This means I'm not reaching out to anyone at this time. 

If by March, the Peat community (of which I am not a member), hasn't set up a proper backup, I *may* step in at that time. I think that the fans of Ray have a DUTY to set up the article backup themselves, not an outsider like myself. I am happy to assist, but I'm not stepping forward to lead.

My motivation is to not have links break on this blog.

---

### MAS
*January 12 at 2023 at 5:36 PM*

@All - I found a Ray archive, which includes articles from his site. 

https://wiki.chadnet.org/ray-peat

If and when Ray's site goes dark, I will update my links to this resource.

---

### Stef
*August 15 at 2023 at 9:02 AM*

Another mirror is up here:

https://expulsia.com/health/peat-index

There is also some other content on the site that you may or may not agree with. However, the Ray Peat mirror is excellent in my opinion. I much prefer the formatting to Ray Peats original site. Also, I think I heard Georgi and Danny say that Ray's family will continue the website

---

### MAS
*August 16 at 2023 at 3:49 PM*

@Stef B - This is great news. I added a link to the mirror at the end of the post. Thank you for sharing!

---

