const express = require("express");
const cors = require('cors')

const router = express.Router()
const projectModel = require("../model/project.model")

const multer = require("multer")
const storage = multer({storage:multer.memoryStorage()})

const uploadFile = require("../services/project.services")

router.use(cors())

router.get('/',async(req,res)=>{
    let projectData = await projectModel.find()
    res.json({"message":"file running successfully",
        "data":projectData})
})


router.get('/songs',async(req,res)=>{
    let projectData = await projectModel.find()
    res.json(projectData)
})


router.post("/songs",storage.single("audioFile"),async (req,res)=>{
    // console.log("Request body: ",req.body);
    // console.log("Request file:",req.file);
    let file = await uploadFile(req.file);
    // console.log("imagekit file: ",file)
    songObj = {title:req.body.title,artist:req.body.artist,audioFile:file.url,mood:req.body.mood}
    res.json({"message":"data created successfully",data:songObj});
    projectModel.create(songObj)
})

module.exports=router