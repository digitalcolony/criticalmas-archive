---
title: "What Google Should Have Done With Blogger FTP Accounts"
pubDate: 2010-02-05T23:45:34.000Z
modifiedDate: 2015-01-07T00:05:04.000Z
author: "MAS"
categories: ["Web"]
tags: ["blogger", "blogging", "ftp", "google"]
description: "Not that Google cares about what I think or even bugs I've found using their products, but I thought of a simple solution to their Blogger FTP problem. Google states they are abandoning support for..."
commentCount: 4
---

Not that Google cares about [what I think](/2008/02/death-to-blogger/) or even [bugs I've found](/2008/12/google-thinks-queen-anne-is-in-las-vegas/) using their products, but I thought of a simple solution to their Blogger FTP problem. Google states they are abandoning support for FTP based Blogger accounts, because few people use them. The reality is their software architecture was flawed. Without getting technical, I am going explain how the Blogger FTP accounts worked and how they should have proceeded. When a blogger using the FTP account option published a new blog, Google would build the files on their server and then open an FTP connection and transfer static files to that blogger's web host. The problem was that Google didn't just send the file that was created or updated, they sent EVERY FILE. They had no way to know if your changes impacted other files, so they sent them all. If you have 30 posts, this isn't a big deal. If you have 300, every update becomes a nightmare. Transfering MBs of files every time you add a comma is a painful experience to the blogger. I can only imagine what was happening at Google. God knows how many hundreds of thousands of bloggers were transferring **hundreds of terabytes** daily on their dime. Everyone loves free software until someone has to pay the bill. **What Google should have down is create a desktop application version of Blogger.** They already create one for _Picasa_ and _Google Earth_. That would have offloaded the FTP activity to the user and off of Google's servers. Then create a settings page that would allow the user to configure what gets published. And then publish those changes in the background. Desktop applications have an advantage over web applications when it comes to background processing. I don't how many hours I wasted staring at the Blogger FTP status screen while I was ready to write a new paragraph. If you need inspiration, look at _Microsoft's Live Writer_. There you go Google. Feel free to cut me a check for this face saving move. You lost a lot of goodwill this week with your announcement.

---

## Comments

### erik
*March 8 at 2010 at 6:18 PM*

I made a script so you can keep running it via FTP.   http://tinyurl.com/yj26okr

You can sync it in your own cron job, or you can ask me to do it.

---

### MAS
*March 8 at 2010 at 6:28 PM*

Cool solution, however I can not endorse BlogSpot.  Read --> <a href="https://criticalmas.org/2008/03/i-hate-blogspot-too/" rel="nofollow">I Hate Blogspot Too</a>.

---

### erik
*March 8 at 2010 at 7:08 PM*

Google shut down their discussion form.  There were too many people with good solutions that allow them to keep ownership of their content.   I'm trying to stop that ... but I'm only getting a handful of people using it.   One guy posted a patch.  I'm hoping it stops some people from giving in to the gestapo.

---

### MAS
*March 8 at 2010 at 7:17 PM*

@erik - I did not know that.  

Google doesn't like when you <a href="https://criticalmas.org/2009/04/leaving-las-vegas-google-returns-queen-anne-to-seattle/" rel="nofollow">report bugs</a>.  Neither does Amazon.

---

