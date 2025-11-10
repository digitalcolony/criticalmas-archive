---
title: "Writing Your Own Search Engine Using SQL Server"
pubDate: 2011-12-12T09:57:29.000Z
modifiedDate: 2025-06-30T22:33:01.000Z
author: "MAS"
categories: ["Web"]
tags: ["coding", "sql"]
description: "My coffee site, INeedCoffee, needed a better search engine. I had thrown some basic SQL together when the site was launched back in 1999. It did an OK job when the site didn’t have much content. Over..."
commentCount: 5
---

My coffee site, [INeedCoffee,](https://ineedcoffee.com/) needed a better search engine. I had thrown some basic SQL together when the site was launched back in 1999. It did an OK job when the site didn’t have much content. Over the years, the quality of search results has deteriorated. So I did what any coder would do: I looked for a free solution. Google did a better job searching my site than my own code, so I looked at their _Google Custom Search_ solution. I didn’t like their free ad version, and I didn’t want to pay them $100 each and every year for the non-ad version. I decided that not only could I write my own search engine that was just as fast, but I could also deliver better results to the users. After all, I knew my content better than anyone else.


### Assigning a Quality Score


The first thing I noticed about Google’s search results is that the best article on a given topic often wasn’t listed first. It had no way to know the quality, but I did. I then assigned a quality score of 1 to 5 to every article. The default was 3. The best content was rated a 4 or 5. Articles that needed better photos or improvement in some way, I would give a 1 or 2. Later, I’d also use this quality score when assigning weight to the sitemap.


### Web Form -> Server Side Code -> Stored Procedure


The HTML search form is pretty basic. A single text box and a submit button. The server-side code you use to call the stored procedure is irrelevant. ASP.NET, Classic ASP, PHP – it is all good. The server-side code will call the search stored procedure.


### Two Temp Tables


The search stored procedure will have two temp tables: #searchWords and #searchResults. The purpose of #searchWords is to chop up any search phrase into individual words and then record their position. Later, that position will be used to order search results, with more weight being placed on the first and second words in a search query. The #searchResults table is the results being returned to the web page.

CREATE TABLE #searchWords (
    word      VARCHAR(100),
    position    INT
)
CREATE TABLE #searchResults (
    url        VARCHAR(100),
    title      VARCHAR(100),
    longDesc   VARCHAR(MAX),
    quality    TINYINT,
    score      INT
)


### Splitting Search Phrases


I found some code on _StackOverflow_ that did the job for this functionality. The SplitWordList user-defined function\*, developed by Terrapin, works perfectly. If the user places the search term inside quotes, I do not call the SplitWordFunction; instead, I enter the entire phrase as one row in the #searchWords table.

INSERT INTO #searchWords 
SELECT word, position 
FROM SplitWordList(@searchString)


### Count String Function


For the actual search, I used the [Count String Occurrence Function](http://www.sql-server-helper.com/functions/count-string.aspx). The search words are compared first against the article title and then against the content.

CREATE FUNCTION \[dbo\].\[udfCountString\](
    @InputString    VARCHAR(MAX),
    @SearchString    VARCHAR(100)
)
RETURNS INT
BEGIN
    RETURN (LEN(@InputString) -
       LEN(REPLACE(@InputString, @SearchString, ''))) /
       LEN(@SearchString)
END


### I Like Cursors


The most straightforward approach I could think of for getting search results was to use two cursors—one with the content and one with the search words—and then write the hits to the #searchResults temp table. However, cursors are often frowned upon due to their poor performance. I decided to code the search engine using cursors first, and then, if I encountered a performance problem, I’d come up with an alternative solution. However, I didn’t need to, as I achieved rapid results using cursors.

DECLARE ContentCursor CURSOR FAST\_FORWARD FOR
SELECT url, title, longDesc, quality, page
FROM Articles 

DECLARE SearchWordCursor CURSOR DYNAMIC FOR
SELECT word, position FROM #searchWords
OPEN SearchWordCursor 

OPEN ContentCursor
FETCH NEXT FROM ContentCursor 
INTO @url, @title, @longDesc, @quality, @page

WHILE @@FETCH\_STATUS = 0
BEGIN
    FETCH FIRST FROM SearchWordCursor 
          INTO @word, @position
    WHILE @@FETCH\_STATUS = 0
    BEGIN
        -- place more weight on the first search term
        SELECT @score = CASE @position
            WHEN 1 THEN 3
            WHEN 2 THEN 2
            ELSE 1
        END
        -- search the TITLE 
        SET @count = dbo.udfCountString(@title, @word)
        IF @count > 0
        BEGIN
            INSERT INTO #searchResults 
            VALUES (@url, @title, @longDesc, @quality, @score \* 10)
        END
        -- search the PAGE
        SET @count = dbo.udfCountString(@page, @word)
        IF @count > 0
        BEGIN
            INSERT INTO #searchResults 
            VALUES (@url, @title, @longDesc, @quality, @score)
        END                    

        FETCH NEXT FROM SearchWordCursor 
        INTO @word, @position
    END
    FETCH NEXT FROM ContentCursor 
    INTO @url, @title, @longDesc, @quality, @page
END

CLOSE ContentCursor
DEALLOCATE ContentCursor

CLOSE SearchWordCursor
DEALLOCATE SearchWordCursor


### Working With the Results


Before dropping both temp tables, here is the query used to return the search results. If you look at the SQL above, you will see that it is possible (likely) that a search hit will take place on both the title and the page content. I ran some tests and determined that a search hit against a word in the title was 10 times more important than the content, so I multiply the score by ten if there is a title match. I use a GROUP BY clause in the SQL to flatten the results. Then, the results are returned in order of highest to lowest scores.

SELECT TOP 20 S.url, S.title, S.longDesc, 
      S.quality, SUM(S.score) AS Score
FROM #searchResults S
GROUP BY S.url, S.title, S.longDesc, S.quality
ORDER BY SUM(S.score) DESC, S.Quality DESC


### Better Than Google?


I ran numerous tests comparing my search engine to Google. My hand-coded INeedCoffee search engine delivered better results at equal or faster speeds. And the best part is that I don’t need to send Google a check for $100 yearly.


### Code


All the above code is available on [GitHub](https://github.com/digitalcolony/sql-server-search-engine). \* _https://stackoverflow.com/questions/2647/how-do-i-split-a-string-so-i-can-access-item-x/2681#2681_

---

## Comments

### Jim
*April 25 at 2014 at 7:00 PM*

The only missing is the variables declaration for datas to fetch in

---

### Jim
*May 1 at 2014 at 6:42 PM*

Came back to say thank you for the code. The code is brilliant and fast. 

Keep up the good work.

---

### MAS
*May 1 at 2014 at 11:30 PM*

@Jim - Thanks. Glad to hear it worked.

---

### Paa
*July 22 at 2014 at 12:24 AM*

Hello Sir, 
I'm building a basic "search engine" and i mean a true search engine such as yahoo, bing and google
i can use crawlers, I program using python... but these search engine stuff is new to me,
i have read a lot on the internet  but still can really grasp  the big picture on the server side.
i have asked many questions concerning SQL and have received alot of different answers...
such you don't need SQL and you do need SQL i'm just very confused. i would seriously appreciate a very detailed
explanation of what goes on behind the HTML page. example after you hit the enter key what program grabs the keywords and then sends it to the server and how do the server interacts with the database"if there is any" which i think there should be.

---

### MAS
*July 22 at 2014 at 12:30 AM*

@Paa - This post is for people with knowledge of SQL and SQL Server. I'm sure there are many ways to write a search engine. This is but one solution, for which I am not offering support.

---

