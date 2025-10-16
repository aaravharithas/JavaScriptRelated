const express = require("express");
const cors = require('cors')
const checkUser = require('../middleware/post.middleware')
const {getPosts} = require("../controller/post.controller")
const multer = require("multer")

const storage = multer({storage:multer.memoryStorage()})

const router = express.Router()

router.get("",checkUser,getPosts)

router.post("/createpost",checkUser,storage.single('imagefile'),async(req,res)=>{
    imagefile = req.file
    console.log("------------------------\n",imagefile)
    res.status(200).json({"message":"files send successfully"})
})

module.exports = router