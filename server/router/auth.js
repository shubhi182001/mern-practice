const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


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
        }else if(password != cpassword){
            return res.status(402).json({error: "Password not matching"});
        }else{
            const user = new User({name, email, phone, work, password, cpassword})
            //yaha p schema m pre wala method aaega fir neeche execute ho jaega
            const userRegister = await user.save();
            if(userRegister){
                res.status(201).json({message: "user registered successfully"});
            }
        }
    }catch(e){
        console.log(e);
    }
   
})


router.post("/signin", async(req, res) => {
    try{
        let token;
        const {email ,password} = req.body;
        if(!email || !password){
            return res.status(401).json({error: "invalid input"});
        }
        const userLogin = await User.findOne({email: email});
        if(userLogin){
            const isMatch = await bcrypt.compare(password, userLogin.password);
            token = await userLogin.generateAuthToken();
            console.log(token);

            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 2598200000),
                httpOnly:true
            })

            if(!isMatch){
                res.status(402).json({error:"Invalid Credentials"});
            }
            else{           
                res.json({message:"User sign in successfull"});
            }
        }else{
            res.status(402).json({error:"Email does not exsist"});
        }
        
    }catch(e){
        console.log(e);
    }
})



module.exports = router;