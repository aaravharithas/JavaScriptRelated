var ImageKit = require("imagekit");

const mongoose = require("mongoose")

var imagekit = new ImageKit({
    publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT
});

function uploadFile(file){
    return new Promise((resolove,reject)=>{
        imagekit.upload({
            file:file.buffer,
            fileName: file.originalname.toString(),
            folder:"SastaInstagram"
        },(error,result)=>{
            if (error){
                reject(error)
            }
            else{
                resolove(result)
            }
        })
    })
}

module.exports=uploadFile