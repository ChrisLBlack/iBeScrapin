//listing out dependencies for app
const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");
//requiring port and database for express server
const db = require("./models");
let PORT = 3993;
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));
//Mongo db needs to be linked here
mongoose.connect("mongodb://localhost/scrapin", { useNewUrlParser: true });

//this will be all of my routes for the app on the backend.

//this route scrapes stories from Hacker News and saves them in the "result" object
app.get("/scrape", function(req, res){
    axios.get("https://news.ycombinator.com/").then(function(response){
        let $ = cheerio.load(response.data);

       $(".title").each(function(i, element) {
           let result = {};

           result.title = $(this).children("a").text();
           result.link = $(this).children("a").attr("href");

           db.Article.create(result).then(function(dbArticle){
               console.log(dbArticle)
           }).catch(function (err){
               return res.json(err)
           });
       });

       res.send("Scrape Completed")
    })
});

// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });