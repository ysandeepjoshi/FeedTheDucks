const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//set up DB connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex:true})
const connection = mongoose.connection;

connection.once('open',()=>{
    console.log("MongoDB database connection has been established successfully");
})

const feeddataRouter= require("./routes/feeddata");
const userRouter= require("./routes/users");
app.use('/users',userRouter);
app.use('/feeddata',feeddataRouter);



app.listen(port,()=>{
    console.log(`Server is running on port: ${port}`);
})