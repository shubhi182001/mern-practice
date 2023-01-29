const express = require("express");
const router = express.Router();


const User = require("../model/userSchema");



router.get("/", (req, res) => {
    res.send(`Hello from router`);
})

router.post("/register", async (req, res) => {

    const {name, email, phone, work, password, cpassword} = req.body;
    if(!name || !email || !phone || !work || !password || !cpassword){
        return res.status(401).json({error: "Please fill all the details"});
    }

    try{
        const userExsist = await User.findOne({email: email});
        if(userExsist){
            return res.status(402).json({error: "USer already exsists"});
        }
        const user = new User({name, email, phone, work, password, cpassword})
        const userRegister = await user.save();
        if(userRegister){
            res.status(201).json({message: "user registered successfully"});
        }

    }catch(e){
        console.log(e);
    }
   
})

module.exports = router;