const express = require('express');

const songsRoute = require("./Routes/project.routes")

const app = express();

app.use(express.json())
app.use("/",songsRoute)

module.exports=app