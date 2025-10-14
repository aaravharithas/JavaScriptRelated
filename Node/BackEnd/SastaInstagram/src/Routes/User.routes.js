const express = require("express");
const router = express.Router()

const {userLogIn,userRegister,userLogout,userDetails,userAll} = require("../controller/user.controller")


router.get("",userAll)

router.post("/login",userLogIn)

router.post("/register",userRegister)

router.get("/logout",userLogout)

router.get("/user",userDetails)

module.exports=router