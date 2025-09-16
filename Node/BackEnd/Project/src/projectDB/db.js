const mongoose = require("mongoose")

function connectingBD(){
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("database nodemongo connected successfully");
    }).catch(()=>{
        console.log("got error while getting connected.")
    })
}

module.exports = connectingBD