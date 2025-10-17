const express = require("express");
const checkUser = require('../middleware/post.middleware')
const multer = require("multer")
// const { createPartFromCodeExecutionResult } = require("@google/genai/node");
const {getPosts,createPost} = require("../controller/post.controller")

const storage = multer({storage:multer.memoryStorage()})

const router = express.Router()

router.get("",checkUser,getPosts)

router.post("/createpost",checkUser,storage.single('imagefile'),createPost)

module.exports = router