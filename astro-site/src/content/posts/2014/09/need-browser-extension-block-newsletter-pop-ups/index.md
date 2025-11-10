---
title: "We Need a Browser Extension to Block Those Newsletter Pop-ups!"
pubDate: 2014-09-22T23:05:26.000Z
modifiedDate: 2015-10-27T05:11:33.000Z
author: "MAS"
categories: ["Web"]
tags: ["rant"]
description: "I am so sick of the trend that every site have a newsletter and that they launch a pop-up window in your face 2 seconds after you visit their page. The pitch is that if you like what you see, you..."
commentCount: 15
---

I am so sick of the trend that every site have a newsletter and that they launch a pop-up window in your face 2 seconds after you visit their page. The pitch is that if you like what you see, you should sign up for the newsletter so you don't miss anything. Well, I can't see the page, because this annoying pop-up screen is blocking me from the reason I came to the site in the first place. Giving over your name and email is a sign of trust. I don't trust someone who bombards me the second I arrive. Therefore I'll never sign up for those emails. Most of the time, I'll just hit back on the browser and get the same information from another, less needy site. Doing this increases their bounce rate and could lower their search engine rankings. The social media pimps tell us that blasting your readers with these pop-ups gets more conversions. That might be true, but I am wondering about the quality of those subscribers that freely give their email to sites after a 2 second introduction. Are they even going to read the newsletter? How many newsletters do they get each week? I have a newsletter for this site and for [INeedCoffee](https://ineedcoffee.com). I still need to send the first issue for both. :) You'll note that my form is off to the side. It is there if you want it. I do not want to hit people over the head, because I don't want to be hit over the head. I will always prefer RSS anyway. I think newsletters are a fad and as more and more sites drown their visitors with more and more newsletters, this method will get played out and sites will move onto something else. Investing so much time and effort into how the message is delivered instead of the message itself isn't that interesting to me. ![Stop it!](./img/133203964_ba9f86e180_z.jpg) _[Photo](https://flic.kr/p/cLGU5) by somewheregladlybeyond_ 


### Extension Developer We Need Your Help!


I'm not a developer for browser extensions, but here is how I imagine it would be coded. Most of the sites that bombard us with their newsletter pop-ups are running WordPress. Most of those sites use a handful of plugins to assault us with their newsletter offers. The code generated runs on the client. The extension would detect the function calls of the most commonly used plugins and rewrite the code to perform no task. So when the page loads, the pop-up code fires, but does nothing. Can this be done? I think so. We already have [ad blockers](https://adblockplus.org/) that detect and block the most common ad networks. If this already exists, please tell me where to download. If you code it, I will promote it.

---

## Comments

### DL
*September 22 at 2014 at 4:15 PM*

Within Adblock Plus, you can block custom elements, such as those newsletter pop-ups. It does require an initial setup on each site, but effective for frequently-visited sites.

---

### MAS
*September 22 at 2014 at 4:28 PM*

@DL - I run Adblock Plus so this is great news. I see the option to report an ad, but I've never used it. Will give this a test. Thanks!!!

---

### Brian
*September 23 at 2014 at 2:20 PM*

Please post any major findings. I'm with you on this.

---

### MAS
*September 23 at 2014 at 2:29 PM*

So far I am not having good results with AdBlock Plus when it comes to newsletter pop-ups. I'm getting mixed results. The last one I did killed the text of the newsletter pitch, but I still had to close the empty window.

---

### Brian
*September 23 at 2014 at 4:36 PM*

Can you give a couple website examples so I'm sure we're talking about the same thing?

---

### MAS
*September 23 at 2014 at 4:50 PM*

@Brian - Here is a page with a petition pop-up. Not a newsletter, but one that behaves the same. AdBlock Plus doesn't kill it.

http://twitchy.com/2014/09/23/jim-gaffigan-cant-bear-his-familys-criminal-behavior-pic/

---

### DL
*September 23 at 2014 at 5:35 PM*

The trick is to add all the elements that make up the pop-up to ABP. Unfortunately, some of these pop-ups have multiple elements, including the black mask area. So when you go through the process of selecting elements to block, you'd have to add all the elements to ensure that the pop-up is truly killed.

---

### Brian
*September 23 at 2014 at 5:41 PM*

I see exactly what you're talking about. My bank does the same thing with product offers every time I sign on.

Btw, did you know there's a hidden option in ABP that by default allows certain ads through? Check out the options and you'll see what I mean.

---

### MAS
*September 23 at 2014 at 6:33 PM*

@Brian - I must have unchecked it already. I did see options in Advanced that I was unaware of before that block Malware and Easy Privacy. I tried the Fanboy list, but that was too much.

---

### Dan
*September 28 at 2014 at 5:04 PM*

It's entirely likely that you already knew this, but just a brief aside since you posted about your online password strategy recently: whenever you install a browser extension/add-on/etc. that needs to be able to modify all pages' content, you're effectively giving the extension's author access to every password that you type in your browser. Maybe they're trustworthy (although what if their computer gets hacked by someone who isn't?), and I'm hopeful that malicious extensions get dropped from browser vendors' app stores quickly, but the tradeoff is such that I steer clear of most extensions of this type unless I've written them myself.

---

### MAS
*September 29 at 2014 at 3:13 PM*

@Dan - Your comment gave me concern, so I did some research.

It is a concern.
http://www.pcworld.com/article/2049540/malicious-browser-extensions-pose-a-serious-threat-and-defenses-are-lacking.html

I need to go deeper into this to see how the different password managers are responding.

---

### Dan
*September 29 at 2014 at 7:48 PM*

@MAS: I don't think that this is really a solvable problem: extensions need to be able to view and modify the pages that you visit in order to e.g. strip out unwanted content from them, and once they can do that, there will always be a way for them to modify them to e.g. report passwords or authentication cookies to an external site.

The options as I see them are:

a) Install third-party extensions that rewrite content and hope that if any of them are (or become) malicious, browser or antivirus vendors will notice and blacklist them before any of your information is stolen.

b) Don't install third-party extensions that rewrite content.

I go with b), but I'm paranoid. I haven't heard of widespread theft of data by malicious extensions, for what it's worth -- I think that most/all browser vendors require developers to submit credit cards before publishing extensions, which may help matters.

http://crbug.com/124304 is relevant for Chrome, although it hasn't gone anywhere.

---

### MAS
*September 30 at 2014 at 3:45 PM*

@Dan - good info. I put in a support question to the provider I use, but I suspect you are correct. 

The extensions I use that rewrite screen content are AdBlockerPlus, Stylish and FB Purity. With Stylish, I think they are just applying CSS overrides. The other two are more complex.

---

### Justin
*October 26 at 2015 at 9:55 PM*

I was literally considering writing my own plugin to block email newsletters because it bugs me so much!
At the very least, I was going to write an article about it and vent, which is what led me to here. Haha.

---

### MAS
*October 26 at 2015 at 10:12 PM*

@Justin - You would be an Internet GOD if you could write the newsletter blocker.

---

