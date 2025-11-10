---
title: "My Battle With Meetup.com"
pubDate: 2019-11-24T05:12:44.000Z
modifiedDate: 2024-02-06T23:11:04.000Z
author: "MAS"
categories: ["Web"]
tags: ["coding", "meetup"]
description: "I have been a customer and user of Meetup.com going back to my San Diego days in the early 2000s. When I got to Seattle in 2007, I became a more active member. Most of my activity has been as an..."
commentCount: 1
---

I have been a customer and user of Meetup.com going back to my San Diego days in the early 2000s. When I got to Seattle in 2007, I became a more active member. Most of my activity has been as an organizer and event host for the Coffee Club of Seattle. Our group is a highly successful Meetup group. Whereas most groups struggle to last a year or get members to attend, the Coffee Club of Seattle schedules on average 2 new events a week. We have explored close to 400 different coffee shops in our 13.5-year history. Our events routinely get 90-100% turnout. In other words, we know what works and know what doesn't. I even put together a [GitBook](https://coffee-club-of-seattle.gitbook.io/pages/) so other Meetup groups can copy our template to make their groups more successful. Throughout the years, I have submitted several suggestions to Meetup on how to improve their service. All my ideas have been ignored. The company has been historically run by arrogant children that disregard the feedback of their most successful customers. I use the word customers because we pay Meetup to use the service. It is not free. We have never minded paying for the service, as we know with free services, you often get what you pay for. And we get that Meetup won here in Seattle. Other cities might have better options. As our group gathered more and more historical data, I pleaded with Meetup to make searching Past Events easier. It would help our organizers plan better if they knew where we had been and how long it had been since we last visited a venue. My requests were ignored. There was another way to get what I wanted. Meetup had an API, which is a way you could query their database in code. At the time, I didn't know how to access data via an API, but I got frustrated enough that one weekend, I hammered away with every code example I could find to figure it out. And I did. I created the website CoffeeClub.app. Over 1,300 Events aggregated by venue name. Later I would add statistics and mapping. Recently, I added a report that queries Yelp to find new coffee shops. I made all this code available on GitHub so other groups that were interested in historical data could drill into their data. _UPDATE Feb 2024: I abandoned the project. The site and code are no longer online._ Everything was going great. The site pulled data daily from Meetup to update our site. And then my code stopped working at the end of August. Meetup decided to turn off access to their public API. To access the API, you now need to be approved. To be approved, you need to have a Pro account. Pro accounts are for organizations, not for individual groups. It was an extortion move. I knew their parent company We Work needed money, but this was ridiculous. I showed them the website I built and asked for an exemption. I was declined. So in summary, a paying customer spends their own time and resources to build tools to make their experience better and for the thousands of members of that group - who are all also Meetup customers - and Meetup extends its middle finger in our face.


### My Response


I taught myself a new skill. It is called web scraping. I wrote some code that goes to the Meetup website and scrapes all the event and venue data I need for our past Meetups. It is far less efficient than using the API, but they forced my hand I placed the [code up on GitHub](https://github.com/digitalcolony/scrape-meetup) for anyone to use. The code collects prior events. Then goes to those pages, scrapes off everything from venue name to address to event time. That information is then packaged and saved to a JSON file. At that point, you can do whatever you want with the data. This isn't a perfect solution, as the scraping code will break if they change the design of the web page. But if they ever do, I will just update my code. And the battle continues. ![checkmate](./img/checkmate.jpg) _Photo by Felix Mittermeier_

---

## Comments

### Fred
*December 23 at 2019 at 3:13 PM*

I agree. Meetup has been tone deaf to the needs of users for years now.

---

