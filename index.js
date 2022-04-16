//import packages
const express = require("express");
const app = express();

const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

//connect database
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("Database connected"))
.catch((err)=>{
     console.log(err);
});


//server
app.listen(process.env.PORT || 3000, ()=>{
     console.log("Server running at port no 3000");
})