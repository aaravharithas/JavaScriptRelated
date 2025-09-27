const express = require('express');
// npx nodemon filename
const app = express()

app.use(express.json())

// app.get("/",(req,res)=>{
//     res.end("this is home page.")
// });

// app.get("/admin",(req,res)=>{
//     res.end("this is admin page.")
// });
// // data passing through params
// app.get("/user/:id",(req,res)=>{ 
//     res.end(`User: ${req.params.id}`)
// })
// // res.end only returns single string as response.
// app.get("/student/:id",(req,res)=>{ 
//     const newid = String(req.params.id)
//     // res.end("Student id: ",newid) // it does not work.
//     res.end("Student id: " + newid)
// })
// // data passing through query
// app.get("/city",(req,res)=>{ 
//     res.end(`User: ${req.query.q}`)
// })

// app.get("/user/:id/city",(req,res)=>{
//     res.end(`User: ${req.params.id}, City: ${req.query.q}`)
// })
// // data passing through body: it sends data into json object form using post method
// app.use(express.json()) // used for converting data into json format or vise-versa
// app.post("/studentuser/",(req,res)=>{ // on post-man, go to body, pass raw data like: {"user":"aarav","pass":"123456"}
//     res.end(`User: ${req.body.user}, Password: ${req.body.pass}`)
// })




app.get("/",(req,res)=>{
    res.end("Welcome to My Express Website.")
});

// app.get("/about",(req,res)=>{
//     res.end("this is about page.")
// });


// app.get("/contact",(req,res)=>{
//     res.end(`Message from ${req.query.name}: ${req.query.message}`)
// });


// app.get("/user/:id",(req,res)=>{
//     res.end(`User Id received: ${req.params.id}`)
// });


// app.get("/search",(req,res)=>{
//     res.end(`Searching for: ${req.query.q}, Page: ${req.query.page}`)
// });

// app.use(express.json())
// app.post("/login/",(req,res)=>{
//     res.end(`username: ${req.body.username}, password: ${req.body.password}`)
// })

// app.post("/register",(req,res)=>{
//     res.end(`name: ${req.body.name}, email: ${req.body.email}, age: ${req.body.age}`)
// })

// ----------------------------------------- create basic api ----------------------------------
// const notes = [];

// // const obj = {
// //     "title":"demo 1",
// //     "content":"demo content"
// // }

// app.get('/notes',(req,res)=>{
//     res.json(notes);
// })

// app.post('/notes',(req,res)=>{
//     notes.push(req.body);
//     res.end("Data send Successfully");
// })

// app.delete('/notes/:index',(req,res)=>{
//     const idx = req.params.index;
//     delete notes[idx];
//     res.end("Data deleted Successfully");
// })

// app.patch('/notes/:index',(req,res)=>{
//     const idx = req.params.index;
//     const {content} = req.body;
//     notes[idx].content = content;
//     res.end("Data patch Successfully")
// })

// -------------------------------------- connecting to database:

const connectingDB = require("./db/db") // database connectivity
const noteModel = require("./model/notes.model"); // database model

connectingDB()

app.get('/notes',async(req,res)=>{
    let notes = await noteModel.find()
    res.json(notes);
})

app.post('/notes',async(req,res)=>{
    const{title,content} = req.body;
    await noteModel.create({title,content})
    res.end("Data send Successfully");
})

app.delete('/notes/:id', async(req,res)=>{
    const id = req.params.id
    await noteModel.findByIdAndDelete(id)
    res.json({
        'message':'Element got deleted'
    })
})

app.patch('/notes/:id', async(req,res)=>{
    const id = req.params.id
    const {content}= req.body
    await noteModel.findByIdAndUpdate(id,{"content":content})
    res.json({
        'message':'Element got updated',
        "data": await noteModel.findById(id)
    })
})
// --------------------------------------------------------------
app.listen(3000,()=>{
    console.log("Server running at localhost:3000");
})