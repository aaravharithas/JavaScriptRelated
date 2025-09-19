const express = require("express");
const cors = require('cors')

const router = express.Router()
const projectModel = require("../model/project.model")

const multer = require("multer")
const storage = multer({storage:multer.memoryStorage()})

const uploadFile = require("../services/project.services")

router.use(cors())

router.get(("/","/songs","/addsongs"),async(req,res)=>{
    let projectData = await projectModel.find()
    res.json({"message":"file running successfully",
        "data":projectData})
})


router.post("/songs",storage.single("audioFile"),async (req,res)=>{
    // console.log("Request body: ",req.body);
    // console.log("Request file:",req.files);
    let file = await uploadFile(req.file);
    console.log("imagekit file: ",file)
    songObj = {title:req.body.title,artist:req.body.artist,audioFile:file.url,mood:req.body.mood}
    res.json({"message":"data created successfully",data:songObj});
    projectModel.create(songObj)
})


router.post("/addsongs",storage.array("audioFile"),async (req,res)=>{

    async function createSongObj(obj){
        let file = await uploadFile(obj);
        let songObj = {title:obj.originalname.split(".")[0],
                    artist : 'Unknown',
                    audioFile : file.url,
                    mood : req.body.mood}
        return songObj;
    }

    console.log("Request body: ",req.body);
    console.log("Request file:",req.files);
    let songs = await Promise.all(req.files.map(async (el)=>{
        return await createSongObj(el)
    }));
    console.log(songs)
    await projectModel.insertMany(songs);
    res.json({"message":"data created successfully","data":songs});
})

module.exports=router