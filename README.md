# NewsScraper_Onion

Use: NewsScraper scrapes www.theonion.com for articles, pulls the picture, body, and title and appends the results to the page. Also allows
     users to leave comments and read others left by other users (!! Currently unavailable !!)

Functionality: NewsScraper utilizes Cheerio and Axios to scrape the target site (www.theonion.com), adds entries scanned into the Mongo Database with the help of Mongoose. Express and Handlebars are used for the pathing and html construction. 

Author: Auri H Robbins-Phillips