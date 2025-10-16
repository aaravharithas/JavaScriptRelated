const mongoose = require('mongoose');

const PostModelSchema = new mongoose.Schema({
    userid:String,
    imageurl:String,
    context:String,
})

const PostModel = mongoose.model('PostModel',PostModelSchema);

module.exports=PostModel;