const express=require("express");
const mysql = require("mysql");
const app = express();
require("dotenv").config();
const cors = require("cors");
const { Router } = require("express");
const { header } = require("express-validator");
const userRouter = require("./api/users/user.router");
const cookieParser = require('cookie-parser');
const managerRouter = require("./api/manager/manager.router");
// const multer = require('multer');
const adminRouter = require("./api/admin/admin.router");
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use("/api/users",userRouter); //For Student
app.use("/api/admin",adminRouter); //For admin
app.use("/api/manager",managerRouter); //For Managers

require("./database");


app.get('/api',(req,res)=>{
  res.json({
    success:1,
    message: "This is working"
  });
});


app.listen(3001, (err, res) => {
  if(err)
      throw err;
  console.log("Sever Connnected ....");
})