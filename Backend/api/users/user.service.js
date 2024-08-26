const pool=require("../../database");
const date=require('date-and-time');

//here all services of users are listed
module.exports= {
    
    create: (data,callBack) => {
        pool.query(
            'insert into registration(name,email,prn,password,cpassword) values(?,?,?,?,?)',
          
            [
                data.name,
                data.email,
                data.prn,
                data.password,
                data.cpassword

            ],
            (error,results,fields) => {
                
                //When database has entry for that email will return array of rows containing that email.
                //when database doesn't have entry with that email it will return an empty array.
               // undefined !== results && results.length
               
                if(error){
                   return callBack(error);
                }
                return callBack(null,results);
            }

        );
    },
    getUsers : (callBack) => {
        pool.query(
            'select id,name,email,prn from registration',
            [],
            (error,results,fields) => {
                if(error){
                    return callBack(error);
                
                }
                    return callBack(null,results);
            }

        );
    },
    getUserById : (id,callBack) => {
        
        pool.query(
            'select id,name,email,prn from registration where id =?',
            [id],
            (error,results,fields) => {
                if(error){
                    return callBack(error);
                }
                    return callBack(null,results[0]);
            }
        );
    },
    updateUser : (data,callBack) => {
        pool.query(
            'update registration set name =?,email=?,prn=?,password=?,cpassword=? where id=?',
            [
                data.name,
                data.email,
                data.prn,
                data.password,
                data.cpassword,
                data.id
            ],          
            (error,results,fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack (null,results);
            }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                


        );
    },
    deleteUser : (data,callBack) => {
        pool.query(
          'delete from registration where id =?',
          [data.id],
          (error,results,fields) => {
              if(error){
                  callBack(error);
              }
                  return callBack(null,results[0]);
          }
        );
    },
    // getUserByUserEmail: (email,callBack) => {

    //      pool.query(
    //          'select * from registration where email=?',
    //          [email],
    //          (error,results,fields) => {
    //              if(error) {
    //                 callBack(error);
    //              }
    //              return callBack(null,results[0]);

    //          }
    //      );



    // },
    getUserByUserPrn : (prn,callBack) => {

        pool.query(
            'select * from registration where prn=?',
            [prn],
            (error,results,fields) => {
                if(error) {
                   callBack(error);
                }
                return callBack(null,results[0]);

            }
        );


    },
    application:(data,callBack) => {
        //console.log(data);
        pool.query(
            'insert into applicationform (fullname,email,prn,phoneno,caddress,paddress,year,branch,lastexam,score,category,bloodgroup,gender,ishandicap,medicalinfo,dob) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
            [
                data.name,
                data.email,
                data.prn,
                data.contactno,
                data.caddress,
                data.paddress,
                data.year,
                data.branch,
                data.exam,
                data.score,
                data.category,
                data.bgroup,
                data.gender,
                data.handicap,
                data.allergy,
                data.dob

            ],

            (error,results,fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
          
           
        );
    },
    profile : (data,id,callBack) => {
        console.log(data.email);

        pool.query(
            'update registration set email=?,name=?,phoneno=?,caddress=?,year=?,dob=? where id=?',

            [
                data.email,
                data.name,
                data.phoneno,
                data.caddress,
                data.year,
                data.dob,
                id
               
            ],

            (error,results,fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }

        );

    },
    getUserByToken: (token,callBack) => {
        pool.query(
            'select * from registration where token=?',
            [token],
            (error,results,fields) => {
                if(error){
                    return callBack(error);
                }
                    return callBack(null,results[0]);
            }


        );
    },
    storeToken : (data,callBack) => {
        console.log(data);
        pool.query(
            
            'update registration set token=? where id=?',
        
            [
                data.jsontoken,
                data.id
            ],
            
            (error,results,fields) => {
                if(error){
                    callBack(error);
                }
                return callBack(null,results[0]);
            }

        );

       
    },
    fetch : (data,callBack) => {
        pool.query(
            'select * from profile where id=?',
            [data.id],
            (error,results,fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null,results)
            }
            

        );

    },
    message: (data, callBack) => {
        console.log(data);
        pool.query(
            'insert into queries (email, name, roomno, comment) values (?,?,?,?)',
            [
                data.email,
                data.name,
                data.roomno,
                data.comment
            ],
            (err, results, fields) => {
                if (err) {
                    return callBack(err);
                }
                return callBack(null, results);

            }
        );
    },
    getUserByRecEmail: (email, callBack) => {
        
        pool.query(
            'select * from rectorlogin where email=?',
            [email],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);

            }
        );



    },
    storeRecToken: (data, callBack) => {
        pool.query(

            'update rectorlogin set token=? where id=?',

            [
                data.jsontoken,
                data.id
            ],

            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }

                return callBack(null, results[0]);
            }

        );


    },
    getapply: (callBack) => {

        pool.query(
            'select * from applicationform',
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }

                return callBack(null, results[0]);
            }

        );
    },
    allocated : (callBack) => {
        pool.query (
            'select * from applicationform where year in("First Year","Second Year","Third Year","Final Year") and category in("General","OBC","EWS","SEBC","SC","ST","VJNT") order by year,category,score desc',
            [],
            (err,results,fields) => {
                if(err){
                   return callBack(err);
                }
                return callBack(null,results);
            }
        );
    },
    malelist : (callBack) => {
        pool.query (
            'select * from applicationform where gender = "male" and year in ("First Year","Second Year","Third Year","Final Year") and category in("General","OBC","EWS","SEBC","SC","ST","VJNT") order by year,category,score desc',
            [],
            (err,results,fields) => {
                if(err){
                    return callBack(err);
                }
                return callBack(null,results);
            }
        );

    },
    femalelist : (callBack) => {
        pool.query(
            'select * from applicationform where gender = "female" and year in ("First Year","Second Year","Third Year","Final Year") and category in("General","OBC","EWS","SEBC","SC","ST","VJNT") order by year,category,score desc',
            [],
            (err,results,fields) => {
                if(err){
                    return callBack(err);
                }
                return callBack(null,results);
            }
        );
    },
    getIdByToken : (token,callBack) => {
         pool.query(
             'select id from registration where token=?',
             [token],
             (err,results,fields) => {
                 if(err){
                    callBack(err);
                 }
                 return callBack(null,results);
                 

             }
         );

    },
    sendotp : (email,code,callBack) => {
        const expireIn = new Date().getTime() + 300*1000;
        pool.query(
            'insert into otp(email,code,expiretime) values(?,?,?)',
            [
               email,
               code,
               expireIn
            ],
            (err,results,fields)=> {
                if(err){
                    callBack(err);
                }
                return callBack(null,results);
            }
        );
    },
    check_otp_email : (data,callBack) => {
        pool.query(
            'select * from otp where email=? and code =?',
            [data.email,data.code],
            (err,results,fields) => {
                if(err){
                    callBack(err);
                }
                return callBack(null,results);
            }
        );
    },
    changepass : (data,email,callBack) => {
        console.log(data.newpass);
        pool.query(
            'update registration set password=?,cpassword= ? where email=?',
            [
               data.newpass,
               data.cnewpass,
               email
            ],
            (err,results,fields) => {
                if(err){
                   return callBack(err);
                }
                return callBack(null,results);

            }
        );
    },
    
    checkotp : (token,callBack) => {
        console.log(token);
        pool.query(
            'select * from otp where code=?',
            [token],
            (err,results,fields) => {
                if(err){
                    callBack(err);
                }
                var string=JSON.stringify(results);
                var json =  JSON.parse(string);
                console.log(json);
                return callBack(null,json);
            }

        );
    },
    //*********New Services*******
    getByUserEmailID: (email,callBack) => {

        pool.query(
            'select * from firstapp where email=?',
            [email],
            (error,results,fields) => {
                if(error) {
                   callBack(error);
                }
                return callBack(null,results[0]);

            }
        );



    },
    firstapplication: (data,callBack) => {
        //console.log(data);
        pool.query(
            'insert into firstapp(name,prn,email,phoneno,gender,category,course,branch,preexam,prescore,addreceipt,addmarksheet,castcertificate) values(?,?,?,?,?,?,?,?,?,?,?,?,?)',
            [
                data.name,
                data.prn,
                data.email,
                data.phoneno,
                data.gender,
                data.category,
                data.course,
                data.branch,
                data.preexam,
                data.prescore,
                data.addreceipt,
                data.marksheet,
                data.castcertificate,
                
            ],
            (error,results,fields) => {
                if(error){
                    return callBack(error);
                 }
                 var string=JSON.stringify(results);
                 //var json =  JSON.parse(string);
                 return callBack(null,string);
            }

        );

    },
    getStatusfromfirst : (prn,callBack) => {
        console.log(prn);
        pool.query(
            'select status from firstapp where prn =?',
            [prn],
            (err,results,fields) => {
                if(err){
                    return callBack(err);
                }
                var string=JSON.stringify(results);
                var json =  JSON.parse(string);
                console.log(json[0].status);
                return callBack(null,json[0].status);
                  
            }             
        );

    },
    secondapplication : (data,callBack) => {

        pool.query(
            'insert into secondapp(name,guardiannm,address,district,state,age,dob,category,bloodgp,gender,course,branch,preexam,prescore,addreceipt,premarksheet,castcertificate,email,prn,adhaarno,phoneno,guardianno,username,password,hostelfeereceipt,vacinationcert,undertaking) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
            [
                data.name,
                data.guardiannm,
                data.address,
                data.district,
                data.state,
                data.age,
                data.dob,
                data.category,
                data.bloodgp,
                data.gender,
                data.course,
                data.branch,
                data.preexam,
                data.prescore,
                data.addmissionreceipt,
                data.previousmarksheet,
                data.castcertificate,
                data.email,
                data.prn,
                data.adhaar,
                data.phoneno,
                data.guardianno,
                data.username,
                data.pass,
                data.hostelfeereceipt,
                data.vacinationcert,
                data.undertaking
    
            ],
            (error,results,fields) => {
                if(error){
                    return callBack(error);
                 }
                 var string=JSON.stringify(results);
                 var json =  JSON.parse(string);
                 return callBack(null,json);
            }

        );

    },
    getUserByUserEmail: (email,callBack) => {
        console.log(email);
        pool.query(
            'select * from secondapp where email=?',
            [email],
            (error,results,fields) => {
                if(error) {
                   callBack(error);
                }
                return callBack(null,results[0]);

            }
        );

    },
    storeToken : (data,callBack) => { 
    console.log(data);
    pool.query(
        
        'update secondapp set token=? where id=?',
    
        [
            data.jsontoken,
            data.id
        ],
        
        (error,results,fields) => {
            if(error){
                callBack(error);
            }
            return callBack(null,results[0]);
        }

    );

   
    },
    userfetch : (data,callBack) => {
        console.log(data.id);
        pool.query(
            'select * from secondapp where id=?',
            [data.id],
            (error,results,fields) => {
                if(error){
                    console.log("In error");
                     return callBack(error);
                }
                // var string=JSON.stringify(results);
                // var json =  JSON.parse(string);
                //console.log(json);
                return callBack(null,results);    
            }
            

        );
    },
    getUserById : (id,callBack) => {
        
        pool.query(
            'select * from secondapp where id =?',
            [id],
            (error,results,fields) => {
                if(error){
                    return callBack(error);
                }
                    return callBack(null,results[0]);
            }
        );
    },
    userprofile : (data,id,callBack) => {
        console.log(data.email);

        pool.query(
            'update secondapp set name=?,email=?,phoneno=?,branch=?,address=?,year=? where id=?',

            [
                data.name,
                data.email,
                data.phoneno,
                data.branch,
                data.address,
                data.year,
                id
               
            ],

            (error,results,fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }

        );

    }, 
    queries: (data, callBack) => {
        console.log(data);
        const now  =  new Date();
        const value = date.format(now,'YYYY/MM/DD HH:mm:ss');

        pool.query(
            'insert into comments (title,email,name,roomno,block,comment,date) values (?,?,?,?,?,?,?)',
            [
                data.title,
                data.email,
                data.name,
                data.roomno,
                data.block,
                data.comment,
                value
            ],
            (err, results, fields) => {
                if (err) {
                    return callBack(err);
                }
                return callBack(null, results);

            }
        );
    },

    
};