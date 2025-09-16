require("dotenv").config()
const express = require('express')
const app = require('./src/app')

const connectingDB = require("./src/projectDB/db");
const projectModel = require("./src/model/project.model")

connectingDB()
app.use(express.json())

app.get('/',async(req,res)=>{
    let projectData = await projectModel.find()
    res.json({"message":"file running successfully",
        "data":projectData})
})


app.listen(3000,()=>{
    console.log("port is running at locatlhost:3000")
})