const express = require('express');

const AuthRoutes = require("./Routes/Auth.routes")

const app = express();

app.use(express.json())
app.use("/",AuthRoutes)

module.exports=app