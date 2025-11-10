---
title: "Removing the Email Masking and Amazon Link Building Tools"
pubDate: 2017-01-03T11:46:09.000Z
modifiedDate: 2017-04-03T23:41:32.000Z
author: "MAS"
categories: ["Web"]
tags: []
description: "Way back in 2002 I created a tool to mask your email address from bots that scan webpages and sell them to SPAMMERS. Then in 2009, I was unhappy with the Amazon Affiliate tools provided by Amazon, so..."
commentCount: 0
---

Way back in 2002 I created a tool to [mask your email address](/2014/04/masking-email-address/) from bots that scan webpages and sell them to SPAMMERS. Then in 2009, I was unhappy with the Amazon Affiliate tools provided by Amazon, so I built my own replacement that helped me access larger images of products.

Since then I have maintained these two tools across a few web hosts. Today I'm pulling the plug on both.

Last year I had to juggle some websites around. I moved this blog away from Siteground and over to WinHost and I moved a site I was hosting on WinHost over to Siteground. I did it to save a few bucks and to have a home for the legacy code that ran those two tools. Both tools run on ASP.NET which requires a Microsoft server. So the upside was I could maintain my legacy tools, the downside is WinHost runs WordPress slower than Siteground. During my hiatus that didn't bother me. Now it does.

My choices were to redevelop one or both of the tools into PHP or shut them down. I decided to shut them down, because after a little bit of research, I determined neither tool was needed anymore.

There are other sites now that offer online tools to mask your email address. Both in ASCII code or as an Image.

[Search ASCII Image Mask](https://www.google.com/search?q=Masking+Email+Addresses+in+PHP&rlz=1C1CHBF_enUS714US715&oq=Masking+Email+Addresses+in+PHP&aqs=chrome..69i57&sourceid=chrome&ie=UTF-8#q=Masking+Email+Addresses+ASCII+online+form+munger) (Google Search)

[Text to Image Online Generator](https://www.google.com/search?q=text+to+image+generator+online&rlz=1C1CHBF_enUS714US715&oq=text+to+image+generator+online&aqs=chrome..69i57.766j0j9&sourceid=chrome&ie=UTF-8) (Google Search)

As for an API that finds the large product images on Amazon, I discovered a hack today that anyone can do. By changing a letter inside the long image url, you can access different sizes of the images. Here is a tutorial titled [Abusing Amazon images](http://aaugh.com/imageabuse.html/) that explains all.

So this post will serve as a message on the Internet for those that may have bookmarked those tools only to find them gone. Sorry it had to be done.