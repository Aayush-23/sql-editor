<h1>SQL Editor</h1>

This is an online SQL editor that enables users to run SQL queries in an online editor and analyze the output obtained as a result of running the queries.

<h3>Data</h3>
I have taken some data in the form of JSON of some tables. Also, I have written a function that generates the data on run time where we can pass the number of rows we need. This function I created to do a stress test on my application as It was very difficult to find a table of data which has 250K rows

<h3> Dependencies -</h3>
<ul>
  <li>Material UI - I have used Material UI components and icons to build this UI.</li>
<li>csv-stringify - I have used a package to convert the JSON data into the form of a CSV file.</li>
<li>react-virtuoso - I have used React Virtuoso to implement virtualization for my table and It enables us to render a very large amount of data without breaking the browser.</li>
<li>unique-names-generator - This package I have used to generate random data.</li>
  
</ul>

<h3>Features -</h3>

<ul>
  <li>RUN Query - The user can write the query in the query box and execute it by clicking on Run Query. Also, it's very painful when in a single day you have to write and execute many queries, and every time to run a query we need to click on that button, To resolve this I have added one simple functionality where the user can execute the query by simply pressing "ENTER" they do not need to use mouse every time to run the query.</li>



<li>Save Query - The user can save the query to the collections for the future, Also user can add a title to that query for future reference. Here also we have given a keyboard shortcut (command + s) to open the save modal.</li>

<li>History - Keep track of executed queries with our history feature. Easily revisit and reuse previous queries whenever needed.</li>

<li>Filter Columns - Sometimes there are hundreds of columns in a table and the user simply wants to see a few, So to resolve this issue, I have given an option to filter the columns.</li>

<li>Download - A user can download the data into both CSV and JSON format according to his needs.</li>

<li>Full Screen - Maximize the workspace by switching to a full-screen view. Hide the header and query box to gain extra space for data visualization and analysis.</li>

<li>Search in Data - Refine your data exploration process with advanced search capabilities. Specify columns to search for specific values, making data discovery more efficient.</li>

<li>Sharable Query - Share the queries effortlessly by copying and sharing the URL.</li>
</ul>

<h3>Optimisations -</h3>
<ul>
  <li>Implemented virtualization using the react-virtuoso that will keep the performance fast in case very large amount of data is present</li>
  <li>Memoised the table component to stop rerendering on every props change using useMemo hook</li>
  <li>Avoided creating a state for everything, instead of that used refs which will store the data, and will not rerender the application</li>
</ul>

<h3>Performance -</h3>
<ul>
  <li><a href="https://pagespeed.web.dev/analysis/https-sql-editor-phi-vercel-app/6tw46slo94?form_factor=desktop">PageSpeed Insights</a> - The website scored 100 in performance, Accessibility, Best Practices, and SEO. The exact matrices are here: <ul>
    <li>First Contentful Paint - 0.5S</li>
    <li>Largest Contentful Paint - 0.5S</li>
    <li>Total Blocking Time - 0</li>
    <li>
      Cumulative Layout Shift - 0
    </li>
    <li>Speed Index - 0.5</li>
  </ul></li>
  <ul>According to the network the load time of the website is 300ms</ul>
</ul>

<h3>Future Work -</h3>
<ul>
  <li>Create a server to load the results from an API, and write all the JSON present on the client which increases the memory</li>
  <li>Validation on the form input, We can add validations on all the inputs for a better user experience</li>
  <li>To analyze the data better we can give different types of operators like equal, not equals, in, not in</li>
  <li>Sorting of rows based on columns</li>
</ul>

