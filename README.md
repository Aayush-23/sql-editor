SQL Editor

This is an online SQL editor that enables users to run SQL queries in an online editor and analyze the output obtained as a result of running the queries.

Data

I have taken some data in the form of JSON of some tables. Also, I have written a function that generates the data on run time where we can pass the number of rows we need. This function I created to do a stress test on my application as It was very difficult to find a table of data which has 250K rows

Dependencies -
Material UI - I have used Material UI components and icons to build this UI.
csv-stringify - I have used package to convert the json data into the form of CSV file.
react-virtuoso - I have used React Virtuoso to implement virtulisation for my table and It enable us to render a very large amount of data without breaking the browser.
unique-names-generator - This package I have used to generate random data.

Features -
RUN Query - User can write the query in query box and execute it by clicking on Run Query. Also it's very painful when in a single day you have to write and execute many queries and everytime to run a query we need to click on that button, To resolve this I have added one simple functionality where user can execute the query by simply pressing "ENTER" they do not need to use mouse every time to run the query.
Save Query - User can save the query to the collections for future, Also user can add a title to that query for future reference. Here also we have given a keyboard shortcut (command + s) to open the save modal.
History - Keep track of executed queries with our history feature. Easily revisit and reuse previous queries whenever needed.
Filter Columns - Sometimes there are hundrends of columns in a table and user simply wants to see a few, So to resolve this issue, I have given an option to filter the columns.
Download - A user can download the data into both CSV and JSON format according to his needs.
Full Screen - Maximize the workspace by switching to full-screen view. Hide the header and query box to gain extra space for data visualization and analysis.
Search in Data - Refine your data exploration process with advanced search capabilities. Specify columns to search for specific values, making data discovery more efficient.
Sharable Query - Share the queries effortlessly by copying and sharing the URL.
