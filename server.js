const express=require("express");
const mongoose=require("mongoose");
const bodyParser = require("body-parser");
const routes = require("./routes/index");

const app=express();
app.use(bodyParser.json());

mongoose
.connect('mongodb+srv://guvi:guvi@guvi.axlpmqp.mongodb.net/')
.then(()=>{
    console.log("Connected");
})
.catch((err)=>{
    console.log("Error connecting to DB",err);
});

//Use Routes
app.use("/api",routes);

const port = 3000;

app.listen(port,()=>{
    console.log(`Server running @ ${port}`);
});

