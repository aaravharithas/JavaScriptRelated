const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    title:String,
    content:String
})

const noteModel = mongoose.model("note",noteSchema); // where "note" is name of collection
module.exports=noteModel;