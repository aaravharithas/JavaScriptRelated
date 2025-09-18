require("dotenv").config()
const express = require('express')
const app = require('./src/app')

const connectingDB = require("./src/projectDB/db");
const projectModel = require("./src/model/project.model")

connectingDB()

app.listen(3000,()=>{
    console.log("port is running at http://localhost:3000")
})