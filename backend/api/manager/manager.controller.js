const dotenv = require("dotenv");
dotenv.config({path: './.env'});


const {
    
     getManagerByEmail,
     storeMangerToken,
     profile,
     fetchManager,
     getManagerById,
     complaints,
     getManager,
     
    }=require("./manager.service");

const jwt=require("jsonwebtoken");
const express=require("express");
const { genSaltSync, hashSync} = require("bcryptjs");
const bcrypt = require('bcryptjs')
const {validationResult, check} = require('express-validator');
const cookieParser = require('cookie-parser');
var nodemailer = require("nodemailer");
const hbs = require('nodemailer-express-handlebars');
const { response } = require("express");
const { Context } = require("express-validator/src/context");
const path = require('path');
const app = express();

app.use(cookieParser());

module.exports = {

    managerLogin: async(req,res) => {
        const body = req.body;
        console.log(body)
        getManagerByEmail(body.email,async(err,result) => {
            if(err){
                console.log(err);
            }
            if (!result) {
                return res.status(231).json({
                    success: 0,
                    data: "Invalid email or password"
                });
            }
            let isMatchPassword = await bcrypt.compare(body.password , result.password); 
            if (body.email===result.email && isMatchPassword) {
                let jsontoken = jwt.sign({ id: result.id }, process.env.MANAGER_TOKEN_KEY);
                let id = result.id;
                
                let usertoken = {
                    jsontoken,
                    id
                }
                //storing token into database
                storeMangerToken(usertoken,async(err, result) => {
                    console.log("In store");
                    //console.log(result);
                    if (err) {
                        console.log(err);
                        return;
                    }

                });
                res.cookie("Managercookie", jsontoken, {
                        expires: new Date(Date.now() + 86400000),
                        httpOnly: true
                    })
                    .status(200)
                    .json({
                        success: 1,
                        message: "Login Successfully",
                        token: jsontoken,
                    });

            }
            else {
                return res.status(260).send({
                    success: 0,
                    errors: "Invalid mail or password"
                });
            }

        });

    },
    logout : async(req,res) => {
        return res
        .clearCookie("Managercookie")
        .status(200)
        .send({ message: "Successfully logged out " });
    },
    updateManagerProfile :  (req,res) => {

        const body= req.decoded;
        const user = req.body;
        console.log(body);

         getManagerById(body.id,(err,result) => {
            if(err){
                console.log(err);
            }
            
            else{
                const salt = bcrypt.genSaltSync(10);
                user.password = bcrypt.hashSync(user.password,salt);
                profile(user,result.id,(err,results) => {
                    console.log("Profile");
                    console.log(results);
                    if(err){
                        console.log(err);
                        return res.status(240).json({
                            success : 0,
                            message : "Database Error..."
                        });
                    }
                    if(!results){
                        return res.status(299).json({
                            success : 0,
                            message : "Email Already Exists"
                        });
                    }
                    return res.status(200).json({
                        success : 1,
                        message:"Manager Updated Successfully",
                        data: results
                    });
                });
                
                }

            });
        
    },
    fetchManagerProfile : (req,res) => {
        const body= req.decoded;
        //const id = req.body;
         try{
            fetchManager(body,(err,results) => {
                console.log(results);
             
                if(err){ 
                    console.log(err);
                    return;
                }
              
                else if(!results){
                    console.log("Not Found");
                    return res.json({
                       success:0,
                       message:"Record Not Found"
       
                   });
               }
               else{
                   //console.log("in else");
                    return res.status(201).send({
                       data:results
                   });
               }
             });
         }catch(e){
             console.log(e);
         }
        
    },
    getComments : (req,res) => {
        const body = req.decoded;

        getManager(body.id,(err,result) => {
            console.log(result);
            if(err){
                console.log(err);
            }
            if (!result) {
                return res.status(231).json({
                    success: 0,
                    data: "Invalid Manager"
                });
            }
            const b1 = result.block1;
            const b2 = result.block2;
            // var block ={
            //     b1,
            //     b2
            // };
            complaints(b1,b2,(error,results) =>{
                if(error){
                    console.log(error);
                }
                if(results){
                    res.status(200).send({
                        data:results
                    })
                }

            });

        });
    }

};