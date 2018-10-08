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
mongoose.connect()

//this will be all of my routes for the app on the backend