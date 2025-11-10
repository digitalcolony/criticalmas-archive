---
title: "Return HTML Page Source From Web URL in C#"
pubDate: 2007-12-02T03:54:55.000Z
modifiedDate: 2014-04-10T01:56:32.000Z
author: "MAS"
categories: ["Web"]
tags: ["coding"]
description: "Below is a snippet of code showing how to retrieve the page source of a web page. This code will return the HTML source from the home page on this site. It will then load that HTML into the..."
commentCount: 2
---

Below is a snippet of code showing how to retrieve the page source of a web page. This code will return the HTML source from the home page on this site. It will then load that HTML into the string _myPageSource_.

using System.Net;
using System.Xml;
using System.IO; 

string url = "http://yahoo.com";

HttpWebRequest myWebRequest = (HttpWebRequest)HttpWebRequest.Create(url);
myWebRequest.Method = "GET";

// make request for web page
HttpWebResponse myWebResponse = (HttpWebResponse)myWebRequest.GetResponse();
StreamReader myWebSource = new StreamReader(myWebResponse.GetResponseStream());
string myPageSource = myWebSource.ReadToEnd();
myWebResponse.Close();

---

## Comments

### ozstudio
*June 12 at 2014 at 1:40 PM*

thanks.
but i want to see page source on page load...

---

### MAS
*June 12 at 2014 at 1:56 PM*

@ozstudio - Maybe PhantomJS? Haven't tested it yet, but it looks like it might work.
http://phantomjs.org/

---

