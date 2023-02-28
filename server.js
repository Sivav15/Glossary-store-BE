
const dotenv = require('dotenv')
const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const dbConnection = require('./dbConfig');
const morgan = require("morgan");
const dashboardRoute = require("./routers/dashboardRoute")
const authRoute = require('./routers/authRoute');
const userRoute = require('./routers/userRoute');
const orderRoute = require('./routers/orderRoute');





const fileUpload = require('express-fileupload');


var app = express()

// // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// // parse application/json
app.use(bodyParser.json())
// app.use(express.static(__dirname+'/public'))
// app.use(express.static('./public'));
app.use(
    cors({
      origin: "*",
    })
  );
dotenv.config()
// app.use(express.json());


app.use(fileUpload());

app.use(morgan("dev"));




dbConnection();




  app.get("/", async function (request, response) {
    response.send("Server is Running Successfull");
});



// dashboard route

app.use("/dashboard",dashboardRoute);
app.use("/auth",authRoute);
app.use('/user',userRoute);
app.use('/order',orderRoute);


app.listen(process.env.PORT,()=>console.log("Server is running"))