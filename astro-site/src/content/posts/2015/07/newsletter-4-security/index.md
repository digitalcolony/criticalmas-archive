---
title: "Newsletter #4 - Security"
pubDate: 2015-07-15T21:40:26.000Z
author: "MAS"
categories: ["General"]
tags: ["newsletter", "security"]
description: "It has been a while since Newsletter #3 - Eliminate. For #4, I wanted to take a break from fitness and nutrition for one issue and focus on a topic that we can all benefit from. With all the data..."
commentCount: 4
---

It has been a while since [Newsletter #3 - Eliminate](/2015/02/newsletter-3-eliminate/). For #4, I wanted to take a break from fitness and nutrition for one issue and focus on a topic that we can all benefit from. With all the data breaches and hacking that has taken place in this year, I thought a Security theme newsletter would be good to share. Regular readers may have already read those posts and implemented the ideas, but if you haven't, this might be a good time to start locking down your digital security.


#### [http://eepurl.com/bs9JYX](http://eepurl.com/bs9JYX)


If you have any additional ideas on Security, drop a comment. This is an ongoing battle. ![newsletter](./img/15743483265_1aca718cd2_z.jpg) _[Photo](https://flic.kr/p/pZct5D) by Dennis Skley_

---

## Comments

### MikeTO
*July 16 at 2015 at 5:16 PM*

I use protonmail which is free, there is a waiting list and you might have to wait up to a month to actually get an account email.  It actually encrypts all your emails, there is one for password and then password for your emails.  According the site all PGP are all local so the email provider can not read your email.

Use snort which is a traffic filtering software that will help you block trojans, viruses, etc.  This doesn't mean you don't have to use antivirus.  If this is too much for you can guy Iguardian.  I have never bought this device so I can't obviously she it's good however it does use snort and pretty much idiot proof.

Buy a good router and install tomato or dd wrt.  I prefer tomato and I only use what I need.  These tend to be more secure than a regular home router which are known to be hacked.  I highly recommend asus routers for this because it's very difficult to brick them.  You do need to be somewhat technical but it's worth the effort.  If you can't do yourself find a linux tech who can it's well worth the investment. If you're going to install tomato firmware especially tomato shibby or based on shibby do not activate software like torrents on the router because these can be exploits.  Even the tomato Anon can be exploited.  The reason I know is that I enabled and a hacker was able to exploit the software.  Luckily he didn't get root.  I did have to do a clean install over again for the issue to go away.  Less is usually better in security.  .  Some was hacking my router so I had to fix the issue.  Also I use static ip on my devices and turn off DHCP on my router.  DHCP can be exploited, hacker can perform a DDOS attack. 

I am not a security expert I just doing a lot of researching.

protonmail.ch
snort.org
http://www.computerworld.com/article/2921388/network-security/insecure-routers-hacked-yet-again.html

https://www.cnet.com/news/top-wi-fi-routers-easy-to-hack-says-study/

---

### MAS
*July 16 at 2015 at 10:36 PM*

@MikeTO - Thanks for the additional security tips. Does snort slow things down?

---

### MikeTO
*July 18 at 2015 at 9:34 AM*

I have used snort with virtual box only on my mac since they don't provide from binary package.  It depends on the security settings.  If you have an old computer you can install pfsense, pfsense provides packages and snort is included, you just need the supported hardware for freebsd.  If you're planning to upgrade your computer in the near future don't sell your old one.  You may need to buy a cheap graphics and/or network card.

I forgot to add you can do a scan for the dns servers used.  Do not use google dns servers, I had a hacker exploit the dns server for google dns eserver and the hacker was able to redirect all traffic to their site or do a man in the niddle.  You can use dns advantage which is free.  (156.154.70.1 and 156.154.71)  Scan with your isp dns server then dns advanatage.  You will probably see dns advantage more secure.

My isp only allow people on their network to use the dns servers, so users from the outside their network can not connect to their dns servers.  They didn't have this setup before, they in fact had a very insecure dns server settings not I notified them by showing the results of the dns scans from GRC.com.  At first they said if I was a security expert and some users asked me if i was an expert and claimed I was in idiot.  However a few years later I did another scan and I see they changed setting to make it more security.  

This is important.  If your ISP dns server isn't secured properly then hackers can redirect traffic.  

This is it should look like.  

1. External ping -ignored.
2. External query ignored
3. DNSSEC Security -- supported


http://i.imgur.com/k8T3kwk.png


There's also ARP spoofing.   Basically a hacker can pretend to be your router if you're using one.  To defeat this is to use static arp.

you need admin account or access.  If you're using admin account while surfing you're asking for big trouble.

if you're linux or mac it's easily

router ip address which is usually 192.168.1.1 plus router's mac address

eg. sudo arp -s 192.168.1.1  00:24:4C:C3:B0:55  

 for windows it's  arp -s 192.168.1.1  00-10-54-CA-E1-40 


Here's instructions on how to use a limited account for windows you should rarely need to use admin account because admin access to everything you can do on the machine.  A limited user can do minimal damage unless they can exploit software to get admin access.  A good example is flash plugin.

Why you should use a Limited User Account in Windows

http://www.ricksdailytips.com/limited-windows-account/

On mac it's called standard account.

http://www.maccomputerlessons.com/how_to_create_another_administrator_limited_user_account_apple_mac.htm

---

### MAS
*July 19 at 2015 at 2:31 PM*

@MikeTO – Thanks for the response. The networking side is the least I know when it comes to security.

---

