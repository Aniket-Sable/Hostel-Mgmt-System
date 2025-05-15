//from here we are controlling/handling the services
const dotenv = require("dotenv");
dotenv.config({ path: './.env' });

//const { genSaltSync,compareSync, hashSync } = require("bcrypt");

const {
    create,
    getUserById,
    getUsers,
    updateUser,
    deleteUser,
    getUserByUserEmail,
    getUserByUserPrn,
    application,
    profile,
    storeToken,
    fetch,
    getUserByRecEmail,
    storeRecToken,
    getapply,
    allocated,
    malelist,
    femalelist,
    getIdByToken,
    sendotp,
    check_otp_email,
    changepass,
    checkotp,
    getByUserEmailID,
    firstapplication,
    secondapplication,
    getStatusfromfirst,
    userfetch,
    userprofile,
    queries,
} = require("./user.service");

const jwt = require("jsonwebtoken");
const express = require("express");
const { genSaltSync, hashSync, } = require("bcryptjs");
var bcrypt = require('bcryptjs')
const { validationResult, check } = require('express-validator');
const cookieParser = require('cookie-parser');
var nodemailer = require("nodemailer");
const hbs = require('nodemailer-express-handlebars');
const { response } = require("express");
const { Context } = require("express-validator/src/context");
const path = require('path');
const app = express();
//const fileUpload = require('express-fileupload');
//environments
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(fileUpload())

//****File Uploading ******
const multer = require('multer');
const fs = require('fs');



// module.exports =  storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'public/uploads/'); 
//     },
//     filename: function (req, file, cb) {

//         let prn = req.body.prn;
//         const mimeExtension = {
//             'image/jpeg':'.jpeg',
//             'image/jpg':'.jpg',
//             'image/png':'.png',
//             'application/pdf':'.pdf',
//         }
//       //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//       cb(null, prn + "-" + file.fieldname + '-' + Date.now() + mimeExtension[file.mimetype])
//     }
//   })

//   module.exports =  userUpload = multer({
//       storage: storage,
//        fileFilter: (req, file, cb) => {
//           if (file.mimetype === 'image/jpeg' ||
//               file.mimetype === 'image/png' ||
//               file.mimetype === 'image/jpg' ||
//               file.mimetype === 'application/pdf') {
//               cb(null, true);
//           }
//           else {
//               cb(null, false);
//               req.fileError = "File Format is not valid.";
//           }
//       }
//   }
//   )

//***********End*********
app.use(cookieParser());



module.exports = {
    createUser: (req, res) => {
        //const body=req.body;
        let { name, email, prn, password, cpassword } = req.body;


        const body = {
            name,
            email,
            prn,
            password,
            cpassword
        }
        //  if(getUserByUserEmail(body.email,(err,result) => {
        //      if(err){
        //          console.log(err);
        //      }
        //      if(result){
        //          return res.status(400).send({
        //              msg: 'Email already exist'
        //          });
        //      }

        // }))
        // if(getUserByUserPrn(body.prn,(err,result)=> {
        //     if(err){
        //         console.log(err);
        //     }
        //     if(result){
        //         return res.status(400).send({
        //             msg : 'PRN Should be Unique'
        //         })
        //     }

        // }) )

        ///////////////////
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        ///////////

        if (!name) {
            return res.status(422).send({
                msg: 'Name should not be empty'

            })
        }

        if (!name || !email || !prn || !password || !cpassword) {
            return res.status(422).send({
                msg: 'Please check all fields entered or not'
            });
        }
        if (!password) {
            return res.status(400).send({
                msg: 'Please enter a password '
            });
        }
        if (!cpassword || password != cpassword) {
            return res.status(400).send({
                msg: 'Both Password Must Match'

            });
        }

        const salt = genSaltSync(10);
        body.password = hashSync(password, salt);
        body.cpassword = hashSync(cpassword, salt);



        create(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database Connection error....Email/PRN should be Unique"
                });
            }
            return res.status(200).json({
                success: 1,
                message: "User Registered Successfully",
                data: results
            });
        });

    },
    getUserByUserId: (req, res) => {
        const body = req.body;
        getUserById(body.id, (err, results) => {

            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Record Not Found.."
                });
            }
            return res.json({
                success: 1,
                data: results

            });

        });
    },
    getUsers: (req, res) => {

        getUsers((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                data: results

            });

        });
    },
    updateUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        body.cpassword = hashSync(body.cpassword, salt);
        updateUser(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Failed to update user"
                });
            }
            return res.json({
                success: 1,
                message: "updated successfully"

            });
        });
    },
    deleteUser: (req, res) => {
        const data = req.body;
        deleteUser(data, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Record Not Found"
                });
            }
            return res.json({
                success: 1,
                message: "User deleted Successfully"
            });
        });
    },
    login: async (req, res) => {
        const body = req.body;
        try {
            getUserByUserEmail(body.email, async (err, results) => {

                if (err) {
                    console.log(err);
                    return res.status(400).send({ msg: err });
                }
                if (!results) {
                    return res.status(401).send({
                        message: "Invalid email or password"
                    });
                }
                let isMatchPassword = await bcrypt.compare(body.password, results.password); //comparing password by bcrypt
                console.log(isMatchPassword);
                if (isMatchPassword) {

                    results.password = undefined; //we don't use while sign so make it undefind

                    let jsontoken = jwt.sign({ id: results.id }, process.env.USER_TOKEN_KEY, { expiresIn: "24h" });

                    let id = results.id;

                    let usertoken = {
                        jsontoken,
                        id
                    }

                    //storing token into database
                    storeToken(usertoken, (err, results) => {

                        if (err) {
                            console.log(err);
                            return;
                        }

                    });


                    return res.status(200).cookie("Hostelcookie", jsontoken, {

                        expires: new Date(Date.now() + 86400000),
                        httpOnly: true

                    }).send({
                        success: 1,
                        message: "Login Successfully",
                        cookieMsg: "Cookies Being Initialized"

                    });


                }
                else {
                    return res.status(401).send({
                        success: 0,
                        errors: "Invalid mail or password"
                    });
                }

            });
        }
        catch (err) {
            console.log(err);
        }



    },
    applicationForm: (req, res) => {

        // console.log(req.body);

        let { name, email, prn, contactno, caddress, paddress, year, branch, exam, score, category, bgroup, gender, handicap, allergy, dob } = req.body;

        const body = {
            name,
            email,
            prn,
            contactno,
            caddress,
            paddress,
            year,
            branch,
            exam,
            score,
            category,
            bgroup,
            gender,
            handicap,
            allergy,
            dob

        }
        console.log(body);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }


        application(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database Connection error"
                });
            }
            return res.status(200).json({

                success: 1,
                message: "Application Form Submitted Successfully",
                data: results
            });

        });
    },
    updateProfile: (req, res) => {

        const body = req.decoded;
        const user = req.body;
        console.log(body);

        getUserById(body.id, (err, result) => {
            if (err) {
                console.log(err);
            }

            else {
                profile(user, result.id, (err, results) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({
                            success: 0,
                            message: "Database Connection error....Email should be Unique"
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "User Updated Successfully",
                        data: results
                    });
                });

            }

        });

    },
    logout: async (req, res) => {

        return res
            .clearCookie("Hostelcookie")
            .status(200)
            .send({ message: "Successfully logged out " });
    },
    getAuthorizedUser: (req, res) => {
        return res.json({ user: { id: req.userId, email: req.userEmail } });
    },
    fetchProfile: (req, res) => {
        const id = req.params.id;

        fetch(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Record Not Found"

                });
            }
            return res.status(201).send({
                data: results
            })

        });

    },
    isLoggedIn: (req, res) => {

        const user = req.decoded;
        console.log(user.id);
        getUserById(user.id, (err, result) => {
            if (err) {
                return res.status(401).send({
                    success: 0,
                    message: "User Not Found"
                });
            }
            return res.status(201).send({
                success: 1,
                message: "User Logged In",
                data: result
            });

        });



    },
    // sendmessage: (req, res) => {
    //     const msg = req.body;

    //     message(msg, (err, results) => {
    //         if (err) {
    //             console.log(err);
    //         }
    //         return res.status(200).send({
    //             message: "message sent to rector",
    //             data: results
    //         });
    //     });
    // },
    reclogin: (req, res) => {
        const body = req.body;
        getUserByRecEmail(body.email, (err, results) => {
            console.log(results)
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.json({
                    success: 0,
                    data: "Invalid email or password"
                });
            }

            // const isMatchPassword = compare(body.password, results.password); //comparing password by bcrypt
            if (body.password == results.password) {
                results.password = body.password;
                let jsontoken = sign({ id: results.id }, process.env.TOKEN_KEY);
                let id = results.id;
                let usertoken = {
                    jsontoken,
                    id
                }
                //storing token into database
                storeRecToken(usertoken, (err, results) => {

                    if (err) {
                        console.log(err);
                        return;
                    }

                });

                //store token in the cookies
                res
                    .cookie("Hostelcookie", jsontoken, {
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
                return res.status(400).send({
                    success: 0,
                    errors: "Invalid mail or password"
                });
            }

        });

    },
    getapplications: (req, res) => {

        getapply((err, res) => {
            if (err) {
                console.log(err);
            }
            res.send(data);
        });
    },
    allocatedlist: (req, res) => {

        allocated((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                data: results

            });

        });

    },
    malealllocatedlist: (req, res) => {

        malelist((err, results) => {

            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                Result: "Males Allocated List",
                data: results

            });

        });

    },
    femalealllocatedlist: (req, res) => {

        femalelist((err, results) => {

            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                Result: "Females Allocated List",
                data: results

            });

        });

    },
    emailSend: async (req, res) => {

        const email = req.body.email;
        const response = {}
        getUserByUserEmail(email, (err, result) => {
            if (err) {
                console.log(err);
                res.status(401).send({ err: "Error Occured" });
            }
            if (!result) {
                res.status(400).send({
                    success: 0,
                    message: "Email Not Found"

                });
            }

            let otpcode = Math.floor((Math.random() * 10000) + 1);
            sendotp(email, otpcode, (err, results) => {
                if (err) {
                    console.log(err);
                    res.status(400).send({ err: "Error!!!" });
                }
                //***********Mailer Function*******
                try {
                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        port: 587,
                        secure: false,
                        auth: {
                            user: process.env.HOST_EMAIL,
                            pass: process.env.HOST_PASSWORD
                        }
                    });

                    transporter.use('compile', hbs({

                        viewEngine: {
                            extName: ".handlebars",
                            partialsDir: path.resolve(__dirname, "../../views"),
                            defaultLayout: false,
                        },
                        viewPath: path.resolve(__dirname, "../../views"),
                        extName: ".handlebars",


                    }));

                    var mailOptions = {
                        from: process.env.HOST_EMAIL,
                        to: email,
                        subject: 'Password Reset',
                        //html: "",
                        // text: 'OTP for reset password: ' + otpcode,
                        template: 'email',
                        context: {
                            name: result.name,
                            otp: otpcode,
                            email: email,

                        }

                    };

                    transporter.sendMail(mailOptions, (err, info) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            console.log('Email sent: ' + info.response);
                        }
                    });

                    //************end of mailer *******
                    res.status(200).send({
                        success: 1,
                        message: "Please check your Email for OTP"

                    });
                }
                catch (err) {
                    console.log(err);
                }


            });

        });


    },
    changePassword: async (req, res) => {
        let data = req.body;
        checkotp(data.code, (err, result) => {
            if (err) {
                res.status(400).send({ err: "OTP Not Found" });
                console.log(err);

            }
            let currentTime = new Date().getTime();
            //console.log(currentTime);
            //console.log(result[0].expiretime);
            let diff = result[0].expiretime - currentTime;
            //console.log(diff);
            if (diff <= 0) {
                res.status(400).send({ err: "OTP invalid...Expired" });
            }
            else {
                // console.log(data.newpassword);
                if (data.newpassword === data.cnewpassword) {
                    let newpass;
                    let cnewpass;

                    const salt = genSaltSync(10);
                    newpass = hashSync(data.newpassword, salt);
                    cnewpass = hashSync(data.cnewpassword, salt);

                    let pass = {

                        newpass,
                        cnewpass
                    }
                    // console.log(pass);
                    //console.log(result.email);
                    changepass(pass, result[0].email, (err, results) => {
                        if (err) {
                            console.log(err);
                        }
                        if (!results) {
                            res.status(400).send({
                                success: 0,
                                message: "Failed to change password"

                            });
                        }
                        res.status(200).send({
                            success: 1,
                            message: "Password Changed Successfully"
                        });


                    });

                }
                else {
                    return res.status(401).send({
                        message: "Both Password Must Match"

                    });
                }
            }

        });
    },
    //*********New Controllers*******

    getUserByEmailId: async (req, res) => {
        let email = req.body.email;
        getByUserEmailID(email, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database Connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Email Found",
                data: results
            });

        });

    },

    firstapp: async (req, res) => {
        // console.log(req.body);
        console.log(req.files);
        var file = [];
        var path = [];
        const obj = JSON.parse(JSON.stringify(req.body));
        console.log(obj);
        const obj1 = JSON.parse(JSON.stringify(req.files));
        // console.log(obj1);

        var fileKeys = Object.keys(obj1);
        for (let i = 0; i < fileKeys.length; i++) {
            //    var fileKey =Object.keys(req.files)[0]; //fieldname
            //    var file = req.files[fileKey][0].filename; //filename
            file[i] = req.files[Object.keys(req.files)[i]][0].originalname;
            console.log(file[i]);
            path[i] = req.files[Object.keys(req.files)[i]][0].path;

            // console.log(path[i]);
        }

        let name = req.body.name;
        let prn = req.body.prn;
        let email = req.body.email;
        let phoneno = req.body.phoneno;
        let gender = req.body.gender;
        let category = req.body.category;
        let course = req.body.course;
        let branch = req.body.branch;
        let preexam = req.body.preexam;
        let prescore = req.body.prescore;
        //uploading files options variables
        let addreceipt = file[0];
        let marksheet = file[1];
        let castcertificate = file[2];

        var body = {
            name,
            prn,
            email,
            phoneno,
            gender,
            category,
            course,
            branch,
            preexam,
            prescore,
            addreceipt,
            marksheet,
            castcertificate
        }

        let errors = {};
        try {
            if (req.fileError) {
                errors[Object.keys(req.files)[0]] = req.fileError;
            }
            getByUserEmailID(email, (err, result) => {
                if (err) {
                    fs.unlinkSync(path[0]);
                    fs.unlinkSync(path[1]);
                    fs.unlinkSync(path[2]);
                    return res.status(401).send({
                        err: "Error!!!"
                    });
                }
                if (result) {
                    fs.unlinkSync(path[0]);
                    fs.unlinkSync(path[1]);
                    fs.unlinkSync(path[2]);

                    return res.status(401).send({
                        message: "Email Already Exists"
                    })
                }
                else {
                    firstapplication(body, async (err, results) => {

                        if (err) {
                            console.log(err);
                            fs.unlinkSync(path[0]);
                            fs.unlinkSync(path[1]);
                            fs.unlinkSync(path[2]);
                            return res.status(500).json({
                                success: 0,
                                message: "Database Error....Email/PRN should be Unique"
                            });
                        }
                        if (!results) {
                            fs.unlinkSync(path[0]);
                            fs.unlinkSync(path[1]);
                            fs.unlinkSync(path[2]);
                            return res.status(401).send({
                                success: 0,
                                message: "Invalid Data"

                            });
                        }
                        return res.status(200).send({
                            success: 1,
                            message: "Application 1 Submitted Successfully",
                            data: results
                        });
                    });

                }
            });
        }
        catch (err) {
            fs.unlinkSync(path[0]);
            fs.unlinkSync(path[1]);
            fs.unlinkSync(path[2]);
            console.log(err);
        }
    },

    secondapp: async (req, res) => {

        // console.log(req.files);
        // console.log(req.body);
        var file = [];
        var path = [];
        const obj = JSON.parse(JSON.stringify(req.body));
        // console.log(obj);
        const obj1 = JSON.parse(JSON.stringify(req.files));
        var fileKeys = Object.keys(obj1);
        // console.log(fileKeys.length);
        for (let i = 0; i < fileKeys.length; i++) {
            //    var fileKey =Object.keys(req.files)[0]; //fieldname
            //    var file = req.files[fileKey][0].filename; //filename
            file[i] = req.files[Object.keys(req.files)[i]][0].filename;
            path[i] = req.files[Object.keys(req.files)[i]][0].path;
            // console.log(file[i]);
            // console.log(path[i]);
        }

        //personal information
        let name = req.body.name;
        let guardiannm = req.body.guardiannm;
        let address = req.body.address;
        //let city = req.body.city;
        let district = req.body.district;
        let state = req.body.state;
        let age = req.body.age;
        let dob = req.body.dob;
        let category = req.body.category;
        let bloodgp = req.body.bloodgp;
        let gender = req.body.gender;

        //Academic Details
        let course = req.body.course;
        let branch = req.body.branch;
        let preexam = req.body.preexam;
        let prescore = req.body.prescore;
        let addmissionreceipt = file[0];
        let previousmarksheet = file[1];
        let castcertificate = file[2];

        //Contact information
        let email = req.body.email;
        let prn = req.body.prn;
        let adhaar = req.body.adhaar;
        let phoneno = req.body.phoneno;
        let guardianno = req.body.guardianno;

        //other 
        let username = req.body.username;
        let password = req.body.password;
        let hostelfeereceipt = file[3];
        let vacinationcert = file[4];
        let undertaking = file[5];

        const salt = genSaltSync(10);
        let pass = hashSync(password, salt);


        var body = {
            name,
            guardiannm,
            address,
            //city,
            district,
            state,
            age,
            dob,
            category,
            bloodgp,
            gender,
            course,
            branch,
            preexam,
            prescore,
            addmissionreceipt,
            previousmarksheet,
            castcertificate,
            email,
            prn,
            adhaar,
            phoneno,
            guardianno,
            username,
            pass,
            hostelfeereceipt,
            vacinationcert,
            undertaking,


        }

        try {
            getStatusfromfirst(prn, (err, result) => {
                console.log(!result);
                console.log(result == 0);
                if (err) {
                    fs.unlinkSync(path[0]);
                    fs.unlinkSync(path[1]);
                    fs.unlinkSync(path[2]);
                    fs.unlinkSync(path[3]);
                    fs.unlinkSync(path[4]);
                    fs.unlinkSync(path[5]);
                    console.log(err);
                }
                else if (result == 0) {
                    fs.unlinkSync(path[0]);
                    fs.unlinkSync(path[1]);
                    fs.unlinkSync(path[2]);
                    fs.unlinkSync(path[3]);
                    fs.unlinkSync(path[4]);
                    fs.unlinkSync(path[5]);

                    return res.status(245).send({
                        message: "You are not eligible for next process"
                    })
                }
                else if (result == 1) {
                    secondapplication(body, (error, results) => {
                        if (error) {
                            console.log(error);
                            fs.unlinkSync(path[0]);
                            fs.unlinkSync(path[1]);
                            fs.unlinkSync(path[2]);
                            fs.unlinkSync(path[3]);
                            fs.unlinkSync(path[4]);
                            fs.unlinkSync(path[5]);
                            return res.status(240).json({
                                success: 0,
                                message: "Database Error....Email/PRN should be Unique"
                            });
                        }
                        if (!results) {
                            fs.unlinkSync(path[0]);
                            fs.unlinkSync(path[1]);
                            fs.unlinkSync(path[2]);
                            fs.unlinkSync(path[3]);
                            fs.unlinkSync(path[4]);
                            fs.unlinkSync(path[5]);
                            return res.status(231).send({
                                success: 0,
                                message: "Invalid Data"

                            });
                        }
                        return res.status(200).send({
                            //  success : 1,
                            message: "Application 2 Submitted Successfully",
                            //  data: results
                        });



                    });

                }

            });
        } catch (e) {
            fs.unlinkSync(path[0]);
            fs.unlinkSync(path[1]);
            fs.unlinkSync(path[2]);
            fs.unlinkSync(path[3]);
            fs.unlinkSync(path[4]);
            fs.unlinkSync(path[5]);
            console.log(e);
        }




    },
    getStatus: async (req, res) => {
        let prn = req.body.prn;
        getStatusfromfirst(prn, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.status(401).send({
                    success: 0,
                });
            }
            return res.status(200).send({
                success: 1,
                data: results

            });
        });
    },
    userLogin: async (req, res) => {
        const body = req.body;
        console.log(body.email);

        try {
            getUserByUserEmail(body.email, async (err, results) => {
                console.log(results);
                // console.log(results.status);
                if (err) {
                    console.log(err);
                    return res.status(231).send({ msg: err });
                }
                if (!results) {
                    return res.status(260).send({
                        message: "Invalid email or password"
                    });
                }
                if (results.status === 1) {
                    let isMatchPassword = await bcrypt.compare(body.password, results.password); //comparing password by bcrypt
                    console.log(isMatchPassword);
                    if (isMatchPassword) {

                        results.password = undefined; //we don't use while sign so make it undefind

                        let jsontoken = jwt.sign({ id: results.id }, process.env.USER_TOKEN_KEY, { expiresIn: "24h" });

                        let id = results.id;

                        let usertoken = {
                            jsontoken,
                            id
                        }

                        //storing token into database
                        storeToken(usertoken, (err, results) => {

                            if (err) {
                                console.log(err);
                                return;
                            }

                        });

                        return res.status(200).cookie("Hostelcookie", jsontoken, {

                            expires: new Date(Date.now() + 86400000),
                            httpOnly: true

                        }).send({
                            success: 1,
                            message: "Login Successfully",
                            cookieMsg: "Cookies Being Initialized"

                        });


                    }
                    else {
                        return res.status(260).send({
                            success: 0,
                            errors: "Invalid mail or password"
                        });
                    }
                }
                else if (results.status === 0) {
                    return res.status(271).send({
                        message: "You are not Eligible for Next Process...Contact Rector Office"
                    });
                }


            });
        }
        catch (err) {
            console.log(err);
        }



    },
    fetchuserProfile : (req,res) => {
        const body= req.decoded;
        console.log(body);
        
        userfetch(body,(err,results) => {
            console.log(results);
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success:0,
                    message:"Record Not Found"

                });
            }
            return res.status(201).send({
                data:results
            })

        });

    },
    updateuserProfile :  (req,res) => {

        const body= req.decoded;
        const user = req.body;
        console.log(body);

         getUserById(body.id,(err,result) => {
            if(err){
                console.log(err);
            }
            
            else{
                userprofile(user,result.id,(err,results) => {
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
    postComment: (req, res) => {
        const msg = req.body;

        queries(msg, (err, results) => {
            if (err) {
                console.log(err);
            }
            return res.status(200).send({
                message: "message sent...",
                data: results
            });
        });
     },
     

}
