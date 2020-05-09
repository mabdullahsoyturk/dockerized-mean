const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const postsRoutes = require("./routes/posts");
const usersRoutes = require("./routes/users");

const app = express();

mongoose.connect("mongodb://database/test", { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use((req,res,next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.use("/api/posts", postsRoutes);
app.use("/api/users", usersRoutes);


module.exports = app;