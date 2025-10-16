const express = require('express')
const jwt = require('jsonwebtoken')
const PostModel = require('../model/Post.model')

async function getPosts(req,res){
    postData = await PostModel.find()
    user = await req.user
    return res.status(200).json({"message":"fetched all data successfully","user":user,postData})
}

module.exports = {getPosts}