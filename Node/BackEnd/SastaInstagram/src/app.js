const express = require('express');
const UserRoutes = require("./Routes/User.routes");
const PostRoutes = require("./Routes/Post.routes");
const cookie = require("cookie-parser");
const cors = require('cors');

const app = express();

// Update CORS configuration to allow both localhost and 127.0.0.1
app.use(cors({
  origin: [
    "https://java-script-related.vercel.app",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    process.env.FRONTEND_BASE_URL,
  ],
  credentials: true,
}));



app.use(cookie());
app.use(express.json());
app.use("/", PostRoutes);
app.use("/user", UserRoutes);

module.exports = app;
