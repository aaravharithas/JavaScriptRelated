const express = require('express');
const UserRoutes = require("./Routes/User.routes");
const PostRoutes = require("./Routes/Post.routes");
const cookie = require("cookie-parser");
const cors = require('cors');

const app = express();

// Update CORS configuration to allow both localhost and 127.0.0.1
app.use(cors({
  origin: [
    "http://localhost:5173",  // frontend running on localhost
    "http://127.0.0.1:5173"   // frontend running on 127.0.0.1
  ],
  credentials: true,  // Allow cookies to be sent across domains
}));

app.use(cookie());
app.use(express.json());
app.use("/", PostRoutes);
app.use("/user", UserRoutes);

module.exports = app;
