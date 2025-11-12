const express = require('express');
const jwt = require('jsonwebtoken');
const UserModel = require('../model/User.model');

async function checkUser(req, res, next) {
  // Extract token from the Authorization header (Bearer token)
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(400).json({ "message": "Token not found" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Find user by ID decoded from the token
    const user = await UserModel.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ "message": "User not found" });
    }

    // Attach the user to the request object for access in subsequent middleware or route handlers
    req.user = user;
    next();
  } catch (error) {
    return res.status(400).json({ "message": "Invalid token" });
  }
}

module.exports = checkUser;
