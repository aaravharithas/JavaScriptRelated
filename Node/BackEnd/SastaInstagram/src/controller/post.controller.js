const express = require('express')
const jwt = require('jsonwebtoken')
const uploadFile = require("../services/imagekit.service")

const CaptionGenerator = require('../services/ai.service');
const PostModel = require('../model/Post.model')

async function getPosts(req,res){
    postData = await PostModel.find()
    user = await req.user
    return res.status(200).json({"message":"fetched all data successfully","user":user,postData})
}

async function createPost(req,res){
    imagefile = await req.file
    user = await req.user
    file = await uploadFile(imagefile)
    const caption = await CaptionGenerator(imagefile)
    // console.log("------------------------------------------\n",caption)
    const postobj = await PostModel.create({"userid":user._id,"imageurl":file.url,"context":caption})
    res.status(200).json({"message":"files send successfully","data":postobj})
}

module.exports = {getPosts, createPost}