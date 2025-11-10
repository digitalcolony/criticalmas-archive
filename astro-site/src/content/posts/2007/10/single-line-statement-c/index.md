---
title: "Single Line If Statement in C#"
pubDate: 2007-10-11T01:03:51.000Z
modifiedDate: 2014-04-10T01:40:20.000Z
author: "MAS"
categories: ["Web"]
tags: ["coding"]
description: "Here is a standard if ... then statement in Cfollowed by a single line example. Using a single line if statement will reduce the number of lines of code. if (dayOfTheWeek == \"Tuesday\") {    ..."
commentCount: 2
---

Here is a standard _if ... then_ statement in C# followed by a single line example. Using a single line _if_ statement will reduce the number of lines of code.


if (dayOfTheWeek == "Tuesday")
{
    lunchLocation = "Fuddruckers";
}
else
{
    lunchLocation = "Food Court";
}

And the same example as a single line _if ... then_ statement.

lunchLocation = (dayOfTheWeek == "Tuesday") ? "Fuddruckers" : "Food Court";

---

## Comments

### Alex
*August 27 at 2014 at 2:25 PM*

Thank you, sir.

---

### unknown
*September 30 at 2014 at 8:24 AM*

Thank you very much, this is really helpful.

---

