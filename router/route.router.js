const router = require("express").Router();
const User = require('../models/user.model')
const bcrypt = require('bcryptjs')
const MiddlewareAuth = require("../middleware/authenticate.middleware")

router.get('/', (req,res)=> {
    res.status(200).json({response: "This is Home Page"});
})

router.get('/about', MiddlewareAuth ,(req,res)=> {
    res.send(req.rootUser);
    res.status(200).json({response: "This is About Page"});
})

router.get('/contact', (req,res)=> {
    res.status(200).json({response: "This is Contact Page"});
})

router.get('/login', (req,res)=> {
    res.status(200).json({response: "This is Login Page"})
})

router.get('/signup', (req,res)=>{
    res.status(200).json({response: "This is Signup Page"})
})

router.post('/signup',async (req,res)=>{
    const { name, email, contact, password, cpassword } = req.body;

    if(!name || !email || !contact || !password || !cpassword){
        res.status(400).json({response:"Fill all the required fields."})
    }

    const userExist = await User.findOne({email:email});
    if(!userExist){
        const user = new User({name, email, contact, password, cpassword})
        user.save()
        res.status(200).json({response:"User registered successfully."})
    }
    else{
        res.status(409).json({response:"User already registered."})
    }
})

router.post("/login", async (req, res)=>{
    const { email, password } = req.body;

    if(!email || !password){
        res.status(400).json({response:"Fill all the required fields."})
    }

    const userExist = await User.findOne({email:email})
    if(!userExist){
        res.status(401).json({response: "Invalid Credentials"})
    }

    const userLogin = await bcrypt.compare(password, userExist.password);

    if(!userLogin){
        res.status(401).json({response:"Invalid Credentials"})
    }
    else{
        const authToken = await userExist.getAuthToken();
        if(!authToken){
            res.status(500).json({response:"Internal Server Error."})
        }
        res.cookie("jwtoken", authToken, {
            expires:new Date(Date.now() + 86400000),
            httpOnly:true
        }).status(200).json({response:"User logged in successfully."})
    }
})

router.get('/404', (req,res) =>{
    res.status(404).json({response: "This is 404 Page"})
})

module.exports = router;