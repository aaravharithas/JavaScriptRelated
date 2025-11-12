const express = require('express')
const jwt = require('jsonwebtoken')
const uploadFile = require("../services/imagekit.service")

const CaptionGenerator = require('../services/ai.service');
const PostModel = require('../model/Post.model')

async function getPosts(req,res){
    postData = await PostModel.find()
    user = await req.user
    return res.status(200).json({"message":"fetched all data successfully","posts":postData})
}

async function userAccount(req,res){
    let user = await req.user
    let userPosts = await PostModel.find({userid:user._id})
    res.status(200).json({"message":"data fetched successfully","user":user,"posts":userPosts})
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


// Delete a single post
async function deletePost(req, res) {
  try {
    const postId = req.params.id;
    const user = req.user;

    // Find the post
    const post = await PostModel.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Only allow the owner to delete
    if (post.userid.toString() !== user._id.toString()) {
      return res.status(403).json({ message: "You are not authorized to delete this post" });
    }

    // Delete the post
    await PostModel.findByIdAndDelete(postId);

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error("Error deleting post:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {getPosts, userAccount, createPost, deletePost}