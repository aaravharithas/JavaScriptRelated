const express = require("express");
const cors = require('cors')

const router = express.Router()
const AuthModel = require("../model/Auth.model")


// const uploadFile = require("../services/project.services")

router.use(cors())

router.get("/",async(req,res)=>{
    let AuthData = await AuthModel.find()
    res.json({"message":"Authentication Model Connected Successfully",
        "data":AuthData})
})

router.post("/login",async(req,res)=>{
    let {username,password} = req.body;
    console.log(req.body);
    let AuthData = await AuthModel.find({username:username})
    console.log(AuthData)
    if (AuthData.length){
        res.json({"message":"user logged in","username":username,"password":password})
    }
    else{res.json({"message":"user doesn't exists","username":username,"password":password})}
})


router.post("/register",async(req,res)=>{
    let {username,name,email,password,confirmPass} = req.body;
    let AuthData = await AuthModel.find({username:username})
    console.log(req.body)
    if(password===confirmPass){
        if (AuthData.length){
            res.send(`username already exists.`)
        }
        else{
            let obj = {"username":username,
                "name":name,
                "email":email,
                "password":password} 
            res.json(obj)
            AuthModel.create(obj);
            }}
    else {
        res.send(`Password didn't match with confirm Password for the user: ${username}`)
    }
})

router.get("/logout/:id",async(req,res)=>{
    let id = req.params.id
    let user = await AuthModel.findById(id)
    if (user){
        res.send(`${user.name} has been logged out.`)
    }
    else{
        res.send(`User Doesn't exist.`)
    }
})

module.exports=router