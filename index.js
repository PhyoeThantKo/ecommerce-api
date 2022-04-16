//import packages
const express = require("express");
const app = express();

const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

const userRoute = require("./routes/user.js")

//connect database
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("Database connected"))
.catch((err)=>{
     console.log(err);
});

app.use(express.json());
app.use("/api/users", userRoute);

//server
app.listen(process.env.PORT || 3000, ()=>{
     console.log("Server running at port no 3000");
})