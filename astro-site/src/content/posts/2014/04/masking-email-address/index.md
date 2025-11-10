---
title: "Masking Your Email Address"
pubDate: 2014-04-12T01:11:15.000Z
modifiedDate: 2021-07-11T00:39:21.000Z
author: "MAS"
categories: ["Web"]
tags: ["coding", "email"]
description: "This was originally written in May 2002. It was updated in February 2007, April 2014 and January 2017. Some of you are probably aware of spiders. They are these little programs that surf the internet..."
commentCount: 2
---

_This was originally written in May 2002. It was updated in February 2007, April 2014 and January 2017._ Some of you are probably aware of spiders. They are these little programs that surf the internet looking for data. Some spiders assist search engines in helping you find the web page you are looking for. Those are the good spiders. There also exists evil spiders. They jump from web page to web page looking for email addresses. Once they find one, they send it to a database so someone can send you junk email. Not cool.


### Hiding In Plain Sight


What we need is a way to display an email address so the reader of a web page can communicate with the web site, yet we also need to hide the address from the spider. The reader and the spider are looking at the same web page but at differently levels. The reader is looking at the browser’s rendering of HTML. The spider is looking at raw HTML. Three ideas come to mind: ASCII codes, server-side mail forms and images. ASCII codes and images will look like email addresses on the screen, but nothing like an email address in the source code of the HTML document. ![Aquarius Spam Tin Lunch Box](https://images-na.ssl-images-amazon.com/images/I/61enjl%2BSmwL.jpg) _Aquarius Spam Tin Lunch Box_


### Method 1: ASCII


In HTML when you place “&#” in front of the [ASCII code](http://asciiset.com/) of a character the browser will write the character not the ASCII code to the screen. The reader will see the real character and the spider will see the ASCII codes. The ASCII codes won't look like an email address, so the spiders won't notice. Examples:

-   &#65;  will render as an uppercase A.
-   &#98;  will render as a lowercase b

The function below accepts an email address as a parameter and returns a masked email address that is made up of ASCII codes. When the browser writes the codes to the screen it will get converted back to text. Although it’s possible for a spider to read and convert ASCII codes inside the HTML source, it’s probably not that prevalent. The function goes character by character converting the email address. The last step is to merge the masked email address with the HTML mailto: tag. In order to minimize the chances a clever spider might look for the mailto:, this example masks that word as well. ![maskEmail](./img/maskEmail.png) Then you can call that VBScript function from inside an ASP page. For more information email me at <%= maskEmail("someEmail@someDomain.net") %>. The above function should be easy enough to convert into your language of choice.


### Method 2: Server-side Mail Forms


These are the contact forms you see everywhere these days. The user fills out a form, clicks submit, and hopes it gets to somebody. This is great for the recipient, because their email address never appears on the site. However, some users don’t trust filling out a form and will withhold feedback.


### Method 3: Images


Another option is to create an image of our email address.


### Method 4: Chopped Javascript


Now that you have an email image or icon, you may want to assist the users so they click on an email address image it behaves as if it were a hypertext link. This means having their email client launched with the TO line filled out for them. In order for this to happen with the email image, we need to hack out a chopped Javascript function. There are many possible ways to write it. Write a function that accepts an email address into 3 parts  Where the splits happen is not important. Then add code that reassembles the email and launches the email client. How you chop up the email address is up to you. You can also change the sequence of the parameters.


### 2014 Update


I believe using the above tools over the past 12 years has greatly reduced the amount of SPAM I received. However, these days SPAM filters are much better, so the need for the above code may be fading. Your call.


### ASP.NET Control


I created an ASP.NET control version as well, which is available on [GitHub](https://github.com/digitalcolony/asp-net-mask-email-ascii).


### 2017 Update


I am no longer maintaining online tools to generate either an ASCII or Image based version of an email address. There are numerous online, so you will have no problem finding a replacement. [Search ASCII Image Mask](https://www.google.com/search?q=Masking+Email+Addresses+in+PHP&rlz=1C1CHBF_enUS714US715&oq=Masking+Email+Addresses+in+PHP&aqs=chrome..69i57&sourceid=chrome&ie=UTF-8#q=Masking+Email+Addresses+ASCII+online+form+munger) (Google Search) [Text to Image Online Generator](https://www.google.com/search?q=text+to+image+generator+online&rlz=1C1CHBF_enUS714US715&oq=text+to+image+generator+online&aqs=chrome..69i57.766j0j9&sourceid=chrome&ie=UTF-8) (Google Search)

---

## Comments

### Johan
*April 28 at 2014 at 9:30 PM*

If you don't need a static email address I would recommend MaskMe from the Abine. A very credible company and service. And the price is ZERO.

I'm not affiliated.

---

### MAS
*April 29 at 2014 at 12:49 AM*

@Johan - Interesting. Thanks for sharing.

---

