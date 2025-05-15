const dotenv = require("dotenv");
dotenv.config({path: './.env'});


const {
    
     getAdminByEmail,
     storeAdminToken,
     getapply,
     allocated,
     malelist,
     femalelist,
     getStatus,
     addManager,
     getAdminById,
     getFirstApply,
     profile,
     fetchAdmin,
     deleteManager,
     getManagerByEmailandUsername,
     addCriteria,  
     handleForm,
     getForm1State,
     getForm2State,
        
    }=require("./admin.service");

const jwt=require("jsonwebtoken");
const express=require("express");
const { genSaltSync, hashSync,} = require("bcryptjs");
var bcrypt = require('bcryptjs')
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

    adminlogin: async(req, res) => {
        const body = req.body;
        getAdminByEmail(body.email,async(err, results) => {
            console.log(results);
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.status(231).json({
                    success: 0,
                    data: "Invalid email or password"
                });
            }
           
            // const isMatchPassword = compare(body.password, results.password); //comparing password by bcrypt
            if (body.email===process.env.ADMIN_EMAILID && body.password === process.env.ADMIN_PASSWORD) {

                //results.password = body.password;
                let jsontoken = await jwt.sign({ id: results.id }, process.env.ADMIN_TOKEN_KEY);
                let id = results.id;
                let usertoken = {
                    jsontoken,
                    id
                }
                //storing token into database
                storeAdminToken(usertoken,async(err, result) => {
                    console.log("In store");
                    console.log(usertoken);
                    if (err) {
                        console.log(err);
                        return;
                    }

                });
                //console.log(results);
                //store token in the cookies
                res
                    .cookie("Admincookie", jsontoken, {
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
    getapplications: (req, res) => {
        
        getapply((err, res) => {
            if(err){
                console.log(err);
            }
            res.send(data);
        });
    },
    admininfo : async(req,res) => {
        let email = req.body.email;
         getAdminByEmail(email,(err,result) => {
             if(err){
                 console.log(err);
             }
             if(!result){
                 res.status(401).send({
                     message:"Invalid ..."
                 });
             }
             res.status(200).send({
                 data:result
             })

         });
    },
    allocatedlist : (req,res) => {

        allocated((err,results) => {
           if(err){
               console.log(err);
               return;
           }
           return res.json({
               success:1,
               data:results

           });

       });

    },
    malealllocatedlist : (req,res) => {

       malelist((err,results) => {

           if(err){
               console.log(err);
               return;
           }
           return res.json({
               success:1,
               Result : "Males Allocated List",
               data:results

           });

       });

    },
    femalealllocatedlist : (req,res) => {

       femalelist((err,results) => {

           if(err){
               console.log(err);
               return;
           }
           return res.json({
               success:1,
               Result : "Females Allocated List",
               data:results

           });

       });

    },
    getStatusByUsername : async(req,res) => {
        let username = req.body.username;
        getStatus(username,(err,results) => {
           if(err){
               console.log(err);
               return res.status(500).json({
                   success : 0,
                   message : "Database Connection error"
               });
           }
           return res.status(200).json({
               success : 1,
               message:"Email Found",
               data: results
           });

        });

    },
    addmanager : async(req,res) => {
        let name = req.body.name;
        let phoneno = req.body.phoneno;
        let email = req.body.email;
        let department = req.body.department;
        let b1 = req.body.block1;
        let b2 = req.body.block2;
        let username = req.body.username;
        let password = req.body.password;

       const salt = await genSaltSync(10);
       let pass = await hashSync(password,salt);

        const body ={
            name,
            phoneno,
            email,
            department,
            b1,
            b2,
            username,
            pass
        }
        try{
            getStatus(email,async(err,result) => {
                console.log(result);
                if(err){
                    console.log(err);
                }
                if(result){
                    res.status(299).send({
                        success : 0,
                        message : "Manager Already Exists"

                    });
                }else{
                    addManager(body,(error,results) => {
                   
                        if(error){
                            console.log(error);
                            return res.status(231).json({
                                success : 0,
                                message : "Database Error..."
                            });
                        }
                        if(!results){
                            return res.status(299).send({
                                success:0,
                                message: "Invalid Data"
    
                            });
                        }
                        //  res.status(200).send({
                        //     success : 1,
                        //     message:"Manager Added Successfully",
                        //     data: results
                        // });
                             ////Send Mail to added Manager
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                     //host: 'smtp.gmail.com',
                     port: 587,
                     secure: false,
                     auth: {
                         user: process.env.HOST_EMAIL,
                         pass: process.env.HOST_PASSWORD
                     }
                });
 
                transporter.use('compile',hbs({
                 
                 viewEngine: {
                     extName: ".hbs",
                     partialsDir: path.resolve(__dirname, "../../views"),
                     defaultLayout: false,
                   },
                   viewPath: path.resolve(__dirname, "../../views"),
                   extName: ".hbs",
 
                    
                }));
        
                var mailOptions = {
                    from: process.env.HOST_EMAIL,
                    to: email,
                    subject: 'You are added as a Manager - WCE Hostel Sangli',
                    //html: "",
                   // text: 'OTP for reset password: ' + otpcode,
                    template: 'manageremail',
                    context: {
                        name :name,
                        email : email,
                        password:password
 
                    }
 
                };
        
                transporter.sendMail(mailOptions,(err,info) =>{
                    if(err){
                        console.log("In error");
                        console.log(err);
                    }
                    else{
                        console.log('Email sent: '+info.response);
                    }
                });   
        
                  //************end of mailer *******
                  res.status(200).send({
                     success: 1,
                     message: "Please check your Email for Being Added"
 
                 });
    
                    });

                }
                
           
 
             });
 

        }catch(e){
            console.log(e);
        }

    },
    getFirstApplications: (req, res) => {
        
        getFirstApply((err, result) => {
            if(err){
                console.log(err);
            }
            res.status(200).send(result);
            //console.log(result);
        });
    },
    logout : async(req,res) => {

         res
        .clearCookie("Admincookie")
        .status(200)
        .send({ message: "Successfully logged out " });
    },
    updateAdminProfile :  (req,res) => {

        const body= req.decoded;
        const user = req.body;
        console.log(body);

         getAdminById(body.id,(err,result) => {
            if(err){
                console.log(err);
            }
            
            else{
                process.env.ADMIN_EMAILID=user.email;
                process.env.ADMIN_PASSWORD=user.password;
                profile(user,result.id,(err,results) => {
                    if(err){
                        console.log(err);
                        return res.status(240).json({
                            success : 0,
                            message : "Email Already Exists"
                        });
                    }
                    return res.status(200).json({
                        success : 1,
                        message:"User Updated Successfully",
                        data: results
                    });
                });
                
                }

            });
        
    },
    fetchAdminProfile : (req,res) => {
        const body = req.decoded;
        
         try{
            fetchAdmin(body,(err,results) => {
                console.log(results);
             
                if(err){ 
                    console.log(err);
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
                    res.status(201).json({          
                       data:results
                   });
               }
             });
         }catch(e){
             console.log(e);
         }
        
    },
    removeManager :(req,res) => {
        const data = req.body;
        getManagerByEmailandUsername(data,(err,result) => {
            if(err){
                console.log(err);

            }
            if(!result){
                return res.status(299).send({
                    success:0,
                    message : "Record Not Found"
                });
            }
            deleteManager(data,(err,results) => {
                 if(err){
                     console.log(err);
                     return ;
                 }
                 else{
                     return res.status(200).send({
                         message : "Manager Removed Successfully"
                     });
                 }
                 
             });

        });

       

    },
    criteria : (req,res) => {
        const body = req.body;
        console.log(body)
        console.log("In criteria")
        addCriteria(body,(err,result) => {
            if(err){
                console.log(err);
            }
            if(!result){
                return res.status(299).send({
                    error: "Error"
                })
            }
            else{
                return res.status(200).send({
                //    data:result,
                   message:"criteria Added"
                });
            }

        });

    },
    changeFormSetting : (req,res) => {
        console.log("in changeformsetting")
        const option = req.body;
        console.log(req.body);
        handleForm(option,(err,result)=>{
            if(err){
                console.log(err);
            }
            else{
                return res.status(200).send({
                    message:"Form Setting Changed"

                });
            }

        });
    },
    getForm1Status : (req,res) => {
        
        getForm1State((err,result)=> {
            console.log(result);
            if(err){
                console.log(err);
            }
            return res.status(200).send({
                status:result.form1

            });

        });

    },
    getForm2Status : (req,res) => {

        getForm2State((err,result)=> {
            console.log(result);
            if(err){
                console.log(err);
            }
            return res.status(200).send({
                status:result.form2

            });

        });

    }
   

};