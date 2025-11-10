---
title: "How Web Hosting Tech Support Works"
pubDate: 2012-05-04T00:32:48.000Z
modifiedDate: 2012-05-04T00:34:51.000Z
author: "MAS"
categories: ["Web"]
tags: ["criticalmas", "rant"]
description: "Last night this site was offline sporadically for an hour. I submitted a Support Ticket to my web host and waited. I don't know why I even bother with the tickets, because I know how it is going to..."
commentCount: 6
---

Last night this site was offline sporadically for an hour. I submitted a Support Ticket to my web host and waited. I don't know why I even bother with the tickets, because I know how it is going to end before I even start typing. My ticket goes into a queue. By the time support gets around to my request, every thing is running fine. A number of things could have caused the problem, but they can never replicate the problem, because it is gone by the time they go to investigate.

![](http://farm3.staticflickr.com/2431/3598754751_5c343eeff2.jpg)

_[Photo](http://www.flickr.com/photos/tyle_r/3598754751/in/photostream/) by tyle\_r_

Then I'll get the email saying how there is no problem. A few days or weeks will go by and the same problem will play out all over again. Never once does any tech support member run some analysis on what was happening on their server during the period I reported the problem. **Maybe we can learn something to prevent the next problem?** That is a radical idea. It is 2012, they should have much better monitoring and forensics by now. But they don't, so the customers keep sending in ghost stories of phantom problems that only they can see.

My other web host goes a step further. They tell me to go parsing through log files to determine how _I screwed things up_. Never mind the fact that my site ran perfectly fine on other hosts. It must be my problem. Always omitted from the discussion is the fact I'm paying for shared hosting, which means my site is just one of many on that server. Looking at just my log files, assuming I could even understand them, only provides a partial view of that server.

Airplanes have "black box" recorders that they use to figure out what caused a crash and **how to prevent the next one**. Web hosts need something similar. Maybe it already exists. If it does, the support representatives I get aren't using them.

---

## Comments

### chuck
*May 3 at 2012 at 6:08 PM*

first they have to give a shit, then they will figure out how to prevent it.  i sell IT support and preventative services.  most of our competition doesn't give a shit.  they invest the least amount of time possible.

---

### MAS
*May 3 at 2012 at 6:39 PM*

@Chuck - Good to know that preventative services exist. Maybe there is hope that one day I can host a site that stays up and has fast page draws without going into the poor house to make it happen.

This past weekend I saw a cop movie that reminded me of my interactions with tech support.
http://www.imdb.com/title/tt0861739/quotes?item=qt0276136

---

### chuck
*May 3 at 2012 at 6:47 PM*

good service don't come cheap.

---

### Txomin
*May 7 at 2012 at 7:43 AM*

Try FutureQuest. Their service is the best in the industry.

---

### Sean
*May 7 at 2012 at 11:47 AM*

Some providers do exactly what you want, but they often charge more for that level of service. I, and my team, at a well known host did it for years. If I did not determine the root cause, I can guarantee that appropriate logging was always put in place to help with the investigation the 2nd time around. And for most of our customers we put that logging in place from the start.

Another part is correlating ongoing issues/incidents to recurring problems. Very few hosts do this since they only look at the single incident. You get what you pay for in the hosting world.

I'm not sure the level of service your host provides. But next time you raise a ticket for an issue which has occurred before, do not let them close it until they have put measures in place to help in detecting it the next time around. Sometimes that is simple as a script dumping basic information to a log file every minute. No cost to that.

---

### MAS
*May 7 at 2012 at 2:02 PM*

@Txomin - Thanks for the tip. Come Feb 2013, I will be seeking out a new host for this site unless things get a lot better.

@Sean - One of my hosts denies the problem even happened. The other one tells me to review all my log files myself and to replicate the problem offline on my gear. Since the issues happen less than 2% of the time, I'm chasing ghosts. My web skills are broad, but don't extend into web server troubleshooting. I'll take your advice though. It can't hurt to push back and demand better service.

---

