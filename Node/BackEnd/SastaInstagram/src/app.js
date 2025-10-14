const express = require('express');

const UserRoutes = require("./Routes/User.routes")
const PostRoutes = require("./Routes/Post.routes")
const cookie = require("cookie-parser")
const cors = require('cors')

const app = express();

app.use(cors())
app.use(cookie())
app.use(express.json())
app.use("/",PostRoutes)
app.use("/user",UserRoutes)

module.exports=app