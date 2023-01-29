const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
const app = express();
dotenv.config();
const PORT = process.env.PORT;
require('./db/conn');
const User = require("./model/userSchema");



//Middleware: whenever we want to authorize and check we make use of middleware. 
//we first authorize then call next();  
const middleware = (req, res, next) => {
    console.log("hello from middleware");
    next();
}

app.get("/", (req, res) => {
    res.send("Hello from server")
})
app.get("/about", middleware, ( req, res) => {
    console.log("middleware executed first")
    res.send("hello from about");
})
app.get("/contact", (req, res) => {
    res.send("hello from contact");
})
app.get("/signin", (req, res)=> {
    res.send("Hello login page");
})
app.get("/signup", (req, res) => {
    res.send("Hello from signup page");
})




app.listen(PORT, ()=>{
    console.log("server running at 3000");
})