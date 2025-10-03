const express = require("express");
const cors = require('cors')

const router = express.Router()
const AuthModel = require("../model/Auth.model")

const jwt = require("jsonwebtoken")
const cookie = require("cookie-parser")

router.use(cookie())

router.use(cors())

router.get("/",async(req,res)=>{
    let AuthData = await AuthModel.find()
    res.json({"message":"Authentication Model Connected Successfully",
        "data":AuthData})
})

router.post("/login",async(req,res)=>{
    let {username,password} = req.body;
    console.log(req.body);
    let user = await AuthModel.findOne({username:username})
    // console.log(user)
    if (user){
        if (user.password != password){
            res.json({"message":"password didn't match","username":username,"password":password})
        }
        token = jwt.sign({id:user._id},process.env.JWT_SECRET_KEY)
        // res.status(200).json({"message":"user logged in",user,"token":token})
        res.cookie("token",token)
        res.status(200).json({"message":"user logged in",user})
    }
    else{res.json({"message":"user doesn't exists","username":username,"password":password})}
})


router.post("/register",async(req,res)=>{
    let {username,name,email,password,confirmPass} = req.body;
    let user = await AuthModel.findOne({username:username})
    // console.log(req.body)
    if(password===confirmPass){
        if (user){
            res.send(`username already exists.`)
        }
        else{
            let obj = {"username":username,
                "name":name,
                "email":email,
                "password":password} 
                let new_user = await AuthModel.create(obj);
                console.log("new user",new_user)
                let token = jwt.sign({id:new_user._id},process.env.JWT_SECRET_KEY)
                // res.status(200).json({user:obj,token:token})
                res.cookie("token",token)
                res.status(200).json(new_user)
            }}
    else {
        res.send(`Password didn't match with confirm Password for the user: ${username}`)
    }
})

router.get("/logout",async(req,res)=>{
    const {token} = req.cookies
    let decodedToken = jwt.verify(token,process.env.JWT_SECRET_KEY)
    let user = await AuthModel.findById(decodedToken.id)
    if (user){
        res.clearCookie("token")
        res.send(`${user.name} has been logged out.`)
    }
    else{
        res.send(`User Doesn't exist.`)
    }
})


router.get("/user",async(req,res)=>{
    const {token} = req.cookies
    let decodedToken = jwt.verify(token,process.env.JWT_SECRET_KEY)
    let user = await AuthModel.findById(decodedToken.id).select("-_id -password -__v")
    if (user){
        res.status(200).json(user)
    }
    else {
        res.status(400).json({"message":"user not found."})
    }
})

module.exports=router