const mongoose = require('mongoose');

const AuthModelSchema = new mongoose.Schema({
    username:String,
    name:String,
    email:String,
    password:String
})

const AuthModel = mongoose.model('AuthModel',AuthModelSchema);

module.exports=AuthModel;