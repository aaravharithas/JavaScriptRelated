const mongoose = require('mongoose');

const UserModelSchema = new mongoose.Schema({
    username:String,
    name:String,
    email:String,
    password:String
})

const UserModel = mongoose.model('UserModel',UserModelSchema);

module.exports=UserModel;