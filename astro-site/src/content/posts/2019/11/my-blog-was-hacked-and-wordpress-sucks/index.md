---
title: "My Blog Was Hacked and WordPress Sucks"
pubDate: 2019-11-15T01:31:07.000Z
author: "MAS"
categories: ["Web"]
tags: ["blogging", "wordpress"]
description: "This morning my blog was down. Some hackers uploaded scripts to mine crypto, which broke my WordPress install. With the help of SiteGround support, I was able to get the site up and running and free..."
commentCount: 5
---

This morning my blog was down. Some hackers uploaded scripts to mine crypto, which broke my WordPress install. With the help of SiteGround support, I was able to get the site up and running and free of malicious code.

Although my host got the site running, it was my responsibility to scrub the site. In order to do this, I examined the source of the script files, which were written in PHP. From there, I was able to search technical forums to discover the mining hack, which had infected Drupal a year earlier.

In the title, I blamed WordPress and not myself. Why? Because WordPress is a fragile ecosystem of plugins, themes, and security patches. It is too easy for hackers to slip malicious code into your blog install.

Now, I am not a WordPress newbie. I've had at least one WordPress site since 2007. I have more than a thousand hours of experience with the software. I've attended many WordPress Meetups in the Seattle area where I've been able to help others with their installs. On several occasions, I've had to dig into PHP source code just to get something fixed on the site. How can the average blogger with no coding knowledge not be a ball of stress every time they make a change to their site?

And unlike most WordPress users, I update my plugins and have backups performed every few days. I run security plugins as well. All that didn't help me today.

I would consider my WordPress knowledge to be in the top 1% of all users and I'm still vulnerable. I'm vulnerable to an ecosystem that makes it easy for compromised code to get onto a blog.

I posted [The Problem With WordPress and How I Would Solve It](/2010/10/problem-wordpress-solve/) back in 2010 and last year I called WordPress "[a bloated mess](/2018/06/the-state-of-blogging-in-2018/)". That post details the numerous steps one needs to do to get things working properly. And today was a demonstration that even that isn't enough.

Most of the things blogs NEED TO HAVE should be part of the core software and not be trusted to 3rd party plugin developers.

The reason I am still using WordPress is that it is still the best choice for me. And Google has totally dropped the ball on blogging. See [How Google Helped Kill the Indie Web and How It Can Bring It Back](/2019/06/how-google-helped-kill-the-indie-web-and-how-it-can-bring-it-back/) for my proposed solutions.

At some point next year, I hope to move this site to a static front end and only use WordPress on the backend. And then the blog and Wordpress will be on two different servers and free from all these headaches. That technology is called Gatsby and is evolving quickly. I'm waiting for more progress to be made before I switch over. It would probably mean ditching WordPress comments and using Disqus, which I do not want to do, but it might be the lesser of two evils at this point.

![blog sign](./img/5053496835_1146cea386_z.jpg)

---

## Comments

### Dog1
*November 16 at 2019 at 2:51 PM*

Gatsby has been around a while now, what features are you waiting for?

---

### MAS
*November 16 at 2019 at 2:59 PM*

@Dog1 - Ideally, I'd like to use WordPress comments and not Disqus. When I last looked at the project a few months ago, I didn't see a clean (easy) way to do that.

Then I listened to an interview with the Gatsby leader on Syntax about how they have a lot more plans to integrate with WordPress better. So my thinking is that every month I can hold off, the solution in terms of features and stability and ease will get better.

https://syntax.fm/show/150/gatsby-themes

I have some other development projects I need to do first. Before I convert this site, I'll tackle one of my other sites that doesn't have comments. If I break something, I prefer it wasn't here or INeedCoffee.

---

### garymar
*November 19 at 2019 at 1:59 AM*

currently when I call up criticalmas.org, I always get the "broke my scale" posting and nothing later. Same problem as I had a while back.

---

### garymar
*November 19 at 2019 at 2:00 AM*

I can get to these newer postings my going thru your twitter feed.

---

### MAS
*November 19 at 2019 at 3:10 AM*

@garymar - Sorry about that. I *think* I have it fixed now. I have caching turned on at the host level and the CDN level. Now the most the home page should be cached is 4 hours.

You can always hit Control-R (Windows) to force a refresh. Another trick you can use on any site to force a refresh is to add a question mark to the url if there is no querystring.

EX: somesite.com/?

---

