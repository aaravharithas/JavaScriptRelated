const mongoose = require("mongoose");

function connectingDB(){
    mongoose.connect("mongodb://localhost:27017/nodemongo") // where "nodemongo" is name of database
    .then(()=>{
        console.log("Connected to Database");
    })
}

module.exports=connectingDB