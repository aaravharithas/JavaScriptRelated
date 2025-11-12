const express = require("express");
const router = express.Router()

const {userLogIn,userRegister,userLogout,userDetails,userAll} = require("../controller/user.controller");
const checkUser = require("../middleware/post.middleware");

router.get("",userAll)

router.post("/login",userLogIn)

router.post("/register",userRegister)

router.get("/logout",checkUser,userLogout)

router.get("/user",checkUser,userDetails)

module.exports=router