const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Hello from server")
})
app.get("/about", ( req, res) => {
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
app.listen(3000, ()=>{
    console.log("server running at 3000");
})