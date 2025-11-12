const express = require("express");
const checkUser = require('../middleware/post.middleware')
const multer = require("multer")
// const { createPartFromCodeExecutionResult } = require("@google/genai/node");
const {getPosts, userAccount, createPost, deletePost} = require("../controller/post.controller")

const storage = multer({storage:multer.memoryStorage()})

const router = express.Router()

router.get("",checkUser,getPosts)

router.post("/createpost",checkUser,storage.single('imagefile'),createPost)

router.get("/account",checkUser,userAccount)

router.delete("/post/:id",checkUser,deletePost)

module.exports = router