const express = require("express");
const UserModel = require("../model/User.model")
const jwt = require("jsonwebtoken")


async function userAll(req,res){
    let UserData = await UserModel.find()
    res.json({"message":"Authentication Model Connected Successfully",
        "data":UserData}
    )}

async function userLogIn (req,res){
    let {username,password} = req.body;
    console.log(req.body);
    let user = await UserModel.findOne({username:username})
    // console.log(user)
    if(!user){
        return res.json({"message":"user doesn't exists","username":username,"password":password})
    }
    if (user.password != password){
        return res.json({"message":"password didn't match","username":username,"password":password})
    }
    token = jwt.sign({id:user._id},process.env.JWT_SECRET_KEY)
    // res.status(200).json({"message":"user logged in",user,"token":token})
    res.cookie("token",token)
    res.status(200).json({"message":"user logged in",user})
}

async function userRegister(req,res){
    let {username,name,email,password,confirmPass} = req.body;
    let user = await UserModel.findOne({username:username})
    // console.log(req.body)
    if (!(password===confirmPass)) {
        return res.send(`Password didn't match with confirm Password for the user: ${username}`)
    }
    if (user){
        return res.send(`username already exists.`)
    }
    let obj = {"username":username,
        "name":name,
        "email":email,
        "password":password} 
        let new_user = await UserModel.create(obj);
        console.log("new user",new_user)
        let token = jwt.sign({id:new_user._id},process.env.JWT_SECRET_KEY)
        // res.status(200).json({user:obj,token:token})
        res.cookie("token",token)
        res.status(200).json(new_user)
}

async function userLogout (req,res){
    const {token} = req.cookies
    if (!token){
        return res.status(404).json({"message":"No token provided."})
    }
    let decodedToken = jwt.verify(token,process.env.JWT_SECRET_KEY)
    let user = await UserModel.findById(decodedToken.id)
    if (!user){
        return res.send(`User Doesn't exist.`)
            }
    res.clearCookie("token")
    res.send(`${user.name} has been logged out.`)
}


async function userDetails(req,res){
    const {token} = req.cookies
    let decodedToken = jwt.verify(token,process.env.JWT_SECRET_KEY)
    let user = await UserModel.findById(decodedToken.id).select("-_id -password -__v")
    if (!user){
        return res.status(400).json({"message":"user not found."})
    }
    res.status(200).json(user)
}

module.exports = {userRegister,userLogIn,userLogout,userDetails,userAll}