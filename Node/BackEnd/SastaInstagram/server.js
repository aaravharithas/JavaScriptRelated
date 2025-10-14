require("dotenv").config()
const express = require('express')
const app = require('./src/app')

const connectingDB = require("./src/db/db");

connectingDB()

app.listen(3000,()=>{
    console.log("SastaInstagram is running at http://localhost:3000")
})