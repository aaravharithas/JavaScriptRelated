const express = require('express')
const jwt = require('jsonwebtoken')
const UserModel = require('../model/User.model')

async function checkUser(req,res,next){
    let {token} = req.cookies
    if (!token){
        return res.status(400).json({"message":"token not found"})
    }
    try{
        decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
    }
    catch{
        return res.status(400).json({"message":"invalid token"})
    }
    user = UserModel.findById(decoded.id)
    if(!user){
        return res.status(404).json({"message":"User not found"})
    }
    req.user = user
    next()
}

module.exports = checkUser