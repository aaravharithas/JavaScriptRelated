'use strict';
console.log('hello world');

// const http = require('http');
// const server = http.createServer((req,res)=>{
//     res.writeHead(200, { 'Content-type': 'text/plain'});

//     res.end('Hello world from node app\n');
    
// });
// server.listen(5000,'localhost',()=>{
//     console.log('Server running at http/localhost:5000/');
// });

// const fs = require('fs');
//read files
// fs.readFile('index.html','utf-8',(error,data)=>{
//     if (error) throw error;
//     console.log(data)
// });

// write files
// fs.writeFile('textdemo.txt','This is demo text.',(error)=>{
//     if (error) throw error;
// });

// append files
// fs.appendFile('textdemo.txt','\nnew line from vs code.',(error)=>{
//     if (error) throw error;
// });


// file system using promises
// const fs = require("fs").promises;

// fs.readFile('textdemo.txt','utf-8')
// .then(data1=>{fs.appendFile('textdemo.txt','\n first then: \n' + data1);
//     return data1;
// })
// .then(data2=>{fs.appendFile('textdemo.txt','\n second then: \n' + data2)});

// async function fileHandling(){
//     try{
//         let data1 = await fs.readFile('newdemo.txt',"utf-8")
//         fs.appendFile("newdemo.txt",data1+"added new string from data 1\n")
//         let data2 = await fs.readFile('newdemo.txt',"utf-8")
//         fs.appendFile("newdemo.txt",data1+data2+"added new string from data 2\n")
//     }
//     catch (error){
//         console.log(error)
//     }
// }

// fileHandling();

const math = require("./custom_module");
console.log(math.add(2,4));

console.log('Program End.');