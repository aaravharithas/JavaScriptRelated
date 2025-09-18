const mongoose = require('mongoose');

const projectModelSchema = new mongoose.Schema({
    title:String,
    artist:String,
    audioFile:String,
    mood:String
})

const projectModel = mongoose.model('projectModel',projectModelSchema);

module.exports=projectModel;