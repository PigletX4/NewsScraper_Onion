const axios = require("axios");
const mongoose = require("mongoose");
const logger = require("morgan");
const express = require("express");
const cheerio = require("cheerio")
var db = require("./models");
var PORT = 3000;

var app = express();

// Configure middleware

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


mongoose.connect("mongodb://localhost/NewsScraper", { useNewUrlParser: true });

app.use(express.static(process.cwd() + "/public"));

const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main"}));


app.get("/scrape", function(req, res) {
    
  axios.get("http://www.theonion.com/").then(function(response) {
  var $ = cheerio.load(response.data);

    $("article").each(function(i, element) {
    
      var result = {};
      result.title = $(this).children('header').children('h1').children('a').text();
      result.link = $(this).children("header").children("h1").children('a').attr('href');
      result.image = $(this).children("div.item__content").children("figure").children("a").children("div").children("picture").children("source").attr('data-srcset');
      result.text = $(this).children("div.item__content").children("div").children('p').text();

      db.Article.create(result)
      .then(function(dbArticle) {
        console.log(dbArticle)
      })
      .catch(function(err) {
        console.log(err);
      });
    });
  res.send("Scrape Complete!");
    });

  

});

app.get("/articles", function(req, res) {
    db.Article.find({})
      .then(function(dbArticle) {
        res.json(dbArticle);
      })
      .catch(function(err) {
        res.json(err);
      });
});

app.get("/articles/:id", function(req, res) {
    db.Article.findOne({ _id: req.params.id })
      .populate("note")
      .then(function(dbArticle) {
        res.json(dbArticle);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

var port = process.env.port || 3000;
app.listen(port, function() {
    console.log("Listening on PORT " + port)
});