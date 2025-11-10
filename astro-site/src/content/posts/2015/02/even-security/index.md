---
title: "Even More Security"
pubDate: 2015-02-17T08:18:59.000Z
modifiedDate: 2024-07-13T20:39:42.000Z
author: "MAS"
categories: ["Web"]
tags: ["risk", "security"]
description: "A few weeks ago I was getting ready to walk into a coffee shop, so I reached down to pull out my wallet. It wasn't there. In my rush to leave the house, I grabbed my old cell phone instead of my..."
commentCount: 9
---

A few weeks ago I was getting ready to walk into a coffee shop, so I reached down to pull out my wallet. It wasn't there. In my rush to leave the house, I grabbed my old cell phone instead of my wallet. Fortunately, I knew my wallet was back home safe. But it got me thinking about how I would have responded had it been stolen or lost.

I suppose I could sit down and try to recall all my accounts and then look up the numbers. Call those companies. Confirm my identity. Freeze those accounts. However, last year I went 100% paperless, which I describe in detail in the post [Scan, Encrypt, Store, Delete, Shred: Going Paperless!](/2014/09/scan-encrypt-store-delete-shred-paperless/) In order to get to those documents, I would need to connect to a cloud server, download, and decode using a program that I only have installed on my PC. The coffee shop I was at was 30 minutes from my house. What if I had been out of the country? Time is ticking.

My inner [Stoic](/2010/11/a-guide-to-the-good-life/) imagined the worst and then came up with a plan so I know how to respond to that scenario should it ever happen.

Today using _My LastPass Vault_ I created emergency recovery documents so in minutes I could be contacting and shutting down access to my financial accounts. I can get to it from my phone or any internet connection. I also added frequent customer cards numbers. I paid for the LastPass Mobile version which is just $1 a month. The desktop version is free.

![safe-vault](./img/safe-vault.jpg)

_[Photo](https://flic.kr/p/ruAw2) by Rob Pongsajapan_


### I Agree With Richard on Carbs, But Not Security


A few weeks ago Richard Nikoley posted Internet Security: A Lesson in Diminishing Returns (MAY 2021: link behind paywall). It had some good information about how the weakest link in security is almost always the user freely giving their sensitive data over to someone who will use that information maliciously. However, I found he was too dismissive of online password risk.

> Guess what else. I use the same password everywhere. It's 8 characters.

He then links to a site that was supposed to support his argument, but the first article [Why you don't need long, complex passwords](https://web.archive.org/web/20170223182232/http://www.infoworld.com/article/2608956/security/why-you-don-t-need-long--complex-passwords.html) says this:

> ...don't reuse your passwords across different security domains or websites. We all belong to dozens of different websites and networks. The more you belong to, the higher the risk of malicious compromise -- which will happen eventually. If you don't reuse your logon credentials all over the place, you make it harder for the bad guys to hurt you more than once.

I have accounts on 209 sites. Not a single one uses a duplicate password.

The second article Richard linked to [Do we really need strong passwords?](https://nakedsecurity.sophos.com/2014/10/24/do-we-really-need-strong-passwords/) started off making his case, but then concluded with this recommendation:

> Fortunately, you can bypass the authors' notion of a 'fixed time-effort' budget by using a password manager.
> 
> That way, you no longer need to differentiate your lower consequence accounts: you can simply treat all your accounts as important.
> 
> With a password manager, the effort involved in generating and storing an extremely strong password is exactly the same as the effort needed to create a weak password.

That same article links deeper into their site on [how to pick a proper password](https://nakedsecurity.sophos.com/2014/10/01/how-to-pick-a-proper-password/), which advises to "go as long and complex as you can". They state it would take less than 2 seconds to crack Richard's 8 character password. Once they hack one site with Richard's password, they can try it on hundreds of sites to see which ones work and since he uses the same password, he is now compromised in multiple spots.

My average password is 14 characters (and growing), with my master password being more than double that. Even if one account is hacked, the damage is contained. I cover all this in my post [My Online Password Strategy (2014)](/2014/09/online-password-strategy-2014/).

With password managers, there is no reason not to lock down your security. I use LastPass, but I've also read good things about KeePass and 1Password.

---

## Comments

### Jeff
*February 17 at 2015 at 1:44 AM*

Re: Password managers.  It seemed to me all of the 'tech' guys I read loved 1password, so even tho I liked Lastpass I bought it.  Don't bother.  I actually like last pass better.
I use mostly ios, but also some mac and pc and last pass (to me at least) is better

---

### Zen
*February 17 at 2015 at 2:05 AM*

password managers have always scared me because they basically would contain the passwords to everything if they get hacked. is this a concern?

---

### MAS
*February 17 at 2015 at 2:17 AM*

@Zen - I don't believe so. Many of the security sites recommend using them. Right now they are the best solution. That could change as new security risks are uncovered.

My concerns with using a Password Manager are:

1- Making sure when I step away from the computer (if in public) or shutdown for the evening to disconnect. Having an exposed computer with a Password Manager connected means your PC or tablet is the weak link. So log off. 
2- Browser plugins that can rewrite parts of the screen can in theory read your password. Unless you absolutely trust and absolutely need a plugin, do not install it. I suspect if the major password managers get hacked, this will be how it is done. 
3- Making sure that I periodically run a Security Check. LastPass has one. It keeps track of which sites got hacked or had data exposed. It will alert you to change those passwords.  Thanks to this comment, I'm going to add a monthly event repeating to do just that.

---

### Arthur
*February 18 at 2015 at 3:11 AM*

Could you elaborate more on those browsers plugins? What do you mean by "rewrite parts of the screen"?

---

### MAS
*February 18 at 2015 at 4:24 AM*

@Arthur - Yes. Let us take an browser plugin like Readability. It scans the page you are on and formats it in a readable font and strips away ads. 

(EDIT: Readability is no longer around)

If you had a Password manager that auto-filled a form, I suppose it **might** be possible for a plugin like Readability that needs to read the screen to perform an action to scrape the password and sent to a remote server. I'm not an expert on this, but that seems like a potential security risk. I could be wrong. 

If anyone else knows more about security, I'd love their thoughts here.

---

### Colin
*February 18 at 2015 at 8:47 PM*

Some kind of password manager is really indespensible these days. I use Lastpass as well, and it is great. I have it on my Android phone too, which is very useful because I find I need to enter passwords frequently when visiting sites, but entering the Lastpass master password on a phone is a nuisance. I don't have the most complex one, but it always takes me two or three attempts. Yes, you can configure Lastpass to remember member your password, but given the chance one might lose it that seems too risky. By the sound of it you have one more than 20 chars long, which sounds like a complete nightmare.

Dealing with passwords on a phone -- even with a decent password manager -- is a huge nuisance. We really need better authentication technology for smartphones.

---

### MAS
*February 18 at 2015 at 9:07 PM*

@Colin - It can be difficult, but I rarely need to connect to sensitive sites on mobile. I might only need to connect to LastPass on mobile once every 10 days. I use it mostly for desktop. 

In order to hit all ~30 characters right, I have to go very slow.

---

### Dan
*February 23 at 2015 at 2:35 PM*

@MAS: Heh, I think I left a comment on this topic on an earlier post. Yes, Chrome extensions that request the "all your data on all sites" permission would be able to steal anything that you type, rewrite pages to send your password to an attacker's server before it's sent to the real server, etc. For what it's worth, I haven't heard of this happening, at least via any extensions hosted in the Chrome Web Store. (Source: I'm a software engineer who works on Chrome, although I don't speak for my employer here.)

Firefox extensions are called "addons". As far as I can tell, <a href="https://en.wikipedia.org/wiki/Add-on_%28Mozilla%29#Security_of_Firefox_Extension_Environment" rel="nofollow">there's no permission model</a> there, so any addon can do all of the above.

Plugins are thankfully mostly a thing of the past now. They're even worse from a security standpoint: they can do whatever they want when you visit websites, but they're also running native code on your computer, so they can theoretically install malware there as well. (Chrome introduced a new plugin system called <a href="https://en.wikipedia.org/wiki/Google_Native_Client#Pepper" rel="nofollow">Pepper</a> to avoid these problems; it's used for the Flash and PDF plugins on Chrome.)

I'm also nervous about online password managers, mostly because I know little about these companies' security practices. I won't disagree that they're convenient and probably the best option for most people. (And yes, for the love of all that is sacred, don't use the same passwords across multiple sites!)

---

### MAS
*February 23 at 2015 at 4:05 PM*

@Dan - Yes, I recall learning about the potential security risk with browser extensions from you. Thanks for the FireFox info. 

An idea that just came to me this morning to add more security would be to use multiple password managers. That way if one the managers is hacked, they don't get all your passwords. Although implementing that model would be very tough and annoying.

---

