// const express = require("express");
// const UserModel = require("../model/User.model")
// const jwt = require("jsonwebtoken")
// const bcrypt = require("bcryptjs")


// async function userAll(req,res){
//     let UserData = await UserModel.find()
//     res.json({"message":"Authentication Model Connected Successfully",
//         "data":UserData}
//     )}

// async function userLogIn (req,res){
//     let {username,password} = req.body;
//     let user = await UserModel.findOne({username:username})
//     // console.log(user)
//     if(!user){
//         return res.json({"message":"user doesn't exists","username":username,"password":password})
//     }
//     // if (user.password != password){
//     //     return res.json({"message":"password didn't match","username":username,"password":password})
//     // }
//     bcrypt.compare(password,user.password,(err,result)=>{
//         if (err){
//             console.log("got error while checking password")
//         }
//         if (result){
//             token = jwt.sign({id:user._id},process.env.JWT_SECRET_KEY)
//             // res.status(200).json({"message":"user logged in",user,"token":token})
//             // res.cookie("token",token)
//             res.cookie("token", token, {
//             httpOnly: true,  // Prevent access to the cookie via JavaScript (for security)
//             secure: true,   // Keep it false for development (set true in production if using HTTPS)
//             sameSite: "None", // For cross-origin requests
//             maxAge: 24 * 60 * 60 * 1000  // Optional: Expire after 1 day
//             });
//             return res.status(200).json({"message":"user logged in",user})
//         }
//         else{
//             return res.status(404).json({"message":"password didn't match","username":username,"password":password})
//         }
//     })
// }

// async function userRegister(req,res){
//     let {username,name,email,password,confirmPass} = req.body;
//     let user = await UserModel.findOne({username:username})
//     // console.log(req.body)
//     if (!(password===confirmPass)) {
//         return res.send(`Password didn't match with confirm Password for the user: ${username}`)
//     }
//     if (user){
//         return res.send(`username already exists.`)
//     }
//     bcrypt.hash(password,12,async(err,result)=>{
//         if (err){
//             console.log("got error while hashing the password",err)
//             return
//         }
//         let new_user = await UserModel.create({"username":username,
//             "name":name,
//             "email":email,
//             "password":result});
//             console.log("new user",new_user)
//             let token = jwt.sign({id:new_user._id},process.env.JWT_SECRET_KEY)
//             // res.cookie("token",token)
//             res.cookie("token", token, {
//             httpOnly: true,  // Prevent access to the cookie via JavaScript (for security)
//             secure: false,   // Keep it false for development (set true in production if using HTTPS)
//             sameSite: "None", // For cross-origin requests
//             maxAge: 24 * 60 * 60 * 1000  // Optional: Expire after 1 day
//             });
//             return res.status(200).json(new_user)
//         })
// }

// async function userLogout (req,res){
//     const {token} = req.cookies
//     if (!token){
//         return res.status(404).json({"message":"No token provided."})
//     }
//     let decodedToken = jwt.verify(token,process.env.JWT_SECRET_KEY)
//     let user = await UserModel.findById(decodedToken.id)
//     if (!user){
//         return res.send(`User Doesn't exist.`)
//             }
//     res.clearCookie("token")
//     res.send(`${user.name} has been logged out.`)
// }


// // async function userDetails(req,res){
// //     const {token} = req.cookies
// //     let decodedToken = jwt.verify(token,process.env.JWT_SECRET_KEY)
// //     let user = await UserModel.findById(decodedToken.id).select("-password -__v")
// //     if (!user){
// //         return res.status(400).json({"message":"user not found."})
// //     }
// //     res.status(200).json(user)
// // }


// async function userDetails(req, res) {
//   const { token } = req.cookies;
// //   console.log("token: ",token)
//   // Check if the token is missing
//   if (!token) {
//     return res.status(401).json({ message: "JWT token is missing" });
//   }
//   try {
//     // Decode the JWT token
//     let decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
//     // Fetch the user details from the database
//     let user = await UserModel.findById(decodedToken.id).select("-password -__v");
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     // Send user details as JSON response
//     res.status(200).json(user);
//   } catch (err) {
//     // Handle JWT verification errors
//     console.error("JWT verification failed:", err);
//     return res.status(401).json({ message: "Invalid or expired token" });
//   }
// }


// module.exports = {userRegister,userLogIn,userLogout,userDetails,userAll}



const express = require("express");
const UserModel = require("../model/User.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function userAll(req, res) {
  let UserData = await UserModel.find();
  res.json({
    "message": "Authentication Model Connected Successfully",
    "data": UserData
  });
}

async function userLogIn(req, res) {
  let { username, password } = req.body;
  let user = await UserModel.findOne({ username: username });

  if (!user) {
    return res.json({ "message": "user doesn't exist", "username": username, "password": password });
  }

  bcrypt.compare(password, user.password, (err, result) => {
    if (err) {
      console.log("Error while checking password");
      return res.status(500).json({ "message": "Error checking password" });
    }

    if (result) {
      // Generate JWT token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);

      // Send token in response body
      return res.status(200).json({
        "message": "User logged in successfully",
        "user": user,
        "token": token
      });
    } else {
      return res.status(404).json({
        "message": "Password didn't match",
        "username": username,
        "password": password
      });
    }
  });
}

async function userRegister(req, res) {
  let { username, name, email, password, confirmPass } = req.body;
  let user = await UserModel.findOne({ username: username });

  if (password !== confirmPass) {
    return res.send(`Password didn't match with confirm Password for the user: ${username}`);
  }

  if (user) {
    return res.send(`Username already exists.`);
  }

  bcrypt.hash(password, 12, async (err, result) => {
    if (err) {
      console.log("Error while hashing the password", err);
      return res.status(500).json({ "message": "Error while hashing the password" });
    }

    let new_user = await UserModel.create({
      "username": username,
      "name": name,
      "email": email,
      "password": result
    });

    const token = jwt.sign({ id: new_user._id }, process.env.JWT_SECRET_KEY);

    // Send token in response body
    return res.status(200).json({
      "message": "User registered successfully",
      "user": new_user,
      "token": token
    });
  });
}

async function userLogout(req, res) {
  // Token is no longer stored in cookies
  const token = req.headers.authorization?.split(' ')[1]; // Authorization header format: "Bearer token"

  if (!token) {
    return res.status(404).json({ "message": "No token provided." });
  }

  try {
    let decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    let user = await UserModel.findById(decodedToken.id);
    if (!user) {
      return res.status(404).json({ "message": "User doesn't exist." });
    }

    // Clear the token on logout if you stored it in cookies
    // res.clearCookie("token");
    
    return res.status(200).json({ "message": `${user.name} has been logged out.` });
  } catch (err) {
    console.error("Error while logging out", err);
    return res.status(500).json({ "message": "Internal Server Error" });
  }
}

async function userDetails(req, res) {
  // Token is passed in the Authorization header
  const token = req.headers.authorization?.split(' ')[1]; // Authorization header format: "Bearer token"

  if (!token) {
    return res.status(401).json({ "message": "JWT token is missing" });
  }

  try {
    let decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    let user = await UserModel.findById(decodedToken.id).select("-password -__v");
    if (!user) {
      return res.status(404).json({ "message": "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("JWT verification failed:", err);
    return res.status(401).json({ "message": "Invalid or expired token" });
  }
}

module.exports = { userRegister, userLogIn, userLogout, userDetails, userAll };
