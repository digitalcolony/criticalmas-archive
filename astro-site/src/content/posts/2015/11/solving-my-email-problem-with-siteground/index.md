---
title: "Solving My Email Problem with Siteground"
pubDate: 2015-11-24T01:05:56.000Z
modifiedDate: 2021-03-14T08:40:48.000Z
author: "MAS"
categories: ["Web"]
tags: ["email"]
description: "If you sent me an email in the last year and it bounced with a message saying that it was rejected for having a high probability of SPAM, I apologize. It is hard to chase down a problem when I don't..."
commentCount: 0
---

If you sent me an email in the last year and it bounced with a message saying that it was rejected for having a high probability of SPAM, I apologize. It is hard to chase down a problem when I don't know it is happening. The good news is the problem is now finally solved.

As much as I love and recommend my web host _Siteground_, they do something very stupid by default on their accounts. They enable a service called _SpamExperts_ at the domain level. _SpamExperts_ isn't just rejecting email from sketchy accounts, but also from people I correspond with on a regular basis if it reads a link in the email it doesn't like. One friend sent me an email with a link to a well-respected language learning site that was rejected. Another friend sent me a link to a health article about some recent research that was also rejected.

![SPAM](./img/5448944597_3fe8324b75_z.jpg)

_[Photo](https://flic.kr/p/9ivgoD) by Sean MacEntee_ 

All the email that is sent to me from this domain and the other domains I have is forwarded to GMail. GMail does an admirable job of SPAM filtering. And if they get something wrong, I can always go into the SPAM folder and recover the message. I can also teach GMail what isn't a SPAM message and create custom filter rules. I can't do that with _SpamExperts_, because the message is bounced.

I have referred several readers to _Siteground_. I stand by that recommendation, but you will need to take the following steps to shut off _SpamExperts_.

> Disable the filtering by going to cPanel - MX Entry - select your domain from the dropdown at the top of the page - Disable SpamExperts.

Just be sure to disable _SpamExperts_, because they are far from experts when it comes to detecting SPAM.

**2016 UPDATE:** Siteground no longer lets you disable Spam Experts from the cPanel. You now need to open a support ticket to have it disabled. Trust me you want it disabled. SpamExperts is terrible.