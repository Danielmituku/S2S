const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv')

const app = express();

//Databse connection
dotenv.config({path:'./config.env'});
const DB = process.env.DATABASE.replace('<password>', process.env.PASSWORD);
mongoose.connect(DB, {
    useNewUrlParser: 'true',
  useCreateIndex: 'true',
  useFileAndModify: 'false'
}).then(()=>{console.log("DB connection successfull!!")});

//server creation
const port = 8000;
app.listen(port, ()=>{
    console.log("the app is running at port 8000");
})