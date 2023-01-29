const express = require("express");
const router = express.Router();


const User = require("../model/userSchema");



router.get("/", (req, res) => {
    res.send(`Hello from router`);
})

router.post("/register",(req, res) => {

    const {name, email, phone, work, password, cpassword} = req.body;
    if(!name || !email || !phone || !work || !password || !cpassword){
        return res.status(401).json({error: "Please fill all the details"});
    }
    User.findOne({email:email}).then((e) => {
        if(e){
            return res.status(402).json({error: "USer already exsists"});
        }

        const user = new User({
            name, email, phone, work, password, cpassword
        })
        user.save().then(() => {
            res.status(201).json({message: "user registered successfully"});
        }).catch((e) => {
            res.status(500).json({error:"Failed to register"});
        })

    }).catch((e) => {
        console.log(e);
    })


   
})

module.exports = router;