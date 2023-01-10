
const dotenv = require('dotenv')
const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const dbConnection = require('./dbConfig');
const morgan = require("morgan");
const dashboardRoute = require("./routers/dashboardRoute")



// const fileUpload = require('express-fileupload');


var app = express()

// // parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))

// // parse application/json
app.use(bodyParser.json())
app.use(express.static(__dirname+'/public'))
app.use(express.static('./public'));
app.use(
    cors({
      origin: "*",
    })
  );
dotenv.config()
// app.use(express.json());


// app.use(fileUpload());

app.use(morgan("dev"));




dbConnection();




  app.get("/", async function (request, response) {
    response.send("Server is Running Successfull");
});

app.post("/api",(req,res)=>{
    let vv = req.body;
    console.log(vv);
    res.json({message:"success",data:vv})
    // cloudinary.uploader
    // .upload("./Cabbage.png")
    // .then(result=>console.log(result));
})

// upload.single("image"),


// app.post("/admin/addProduct", async(req,res)=>{
//   console.log(req);
//   // res.json({message:"success",data:vv})
//   // let data = await  cloudinary.uploader.upload(req.file.path)
  
//   // res.json({message:"success",data:data})
 
// })


// dashboard route

app.use("/dashboard",dashboardRoute);


app.listen(process.env.PORT,()=>console.log("Server is running"))