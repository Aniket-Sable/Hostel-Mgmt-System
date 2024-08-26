const pool=require("../../database");

module.exports= {

    getAdminByEmail: (email, callBack) => {
        
        pool.query(
            'select * from admin where email=?',
            [email],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
               // let output=JSON.parse(JSON.stringify(results))
                return callBack(null, results[0]);
    
            }
        );
    },

    storeAdminToken: (data, callBack) => {
        console.log(data);
        pool.query(

            'update admin set token=? where id=?',

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

    getAdminById : (id,callBack) => {
        pool.query(
            'select * from admin where id=?',
            [id],
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
    getStatus : (mail,callBack) => {
        pool.query(
            'select * from manager where email =?',
            [mail],
            (err,results,fields) => {
                if(err){
                    return callBack(err);
                }
                return callBack(null,results[0]); 
                  
            }             
        );

    },
    addManager : (data,callBack) => {
        pool.query(
            'insert into manager(name,phoneno,email,department,username,password,block1,block2) values(?,?,?,?,?,?,?,?)',
            [
            data.name,
            data.phoneno,
            data.email,
            data.department,
            data.username,
            data.pass,
            data.b1,
            data.b2,
           ],
           (error,results,fields) => {
                if(error){
                  return callBack(error);
                }
                return callBack(null,results);
            
          }

        );
        
    },
    getFirstApply: (callBack) => {

        pool.query(
            'select * from firstapp',
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                var string=JSON.stringify(results);
                var json =  JSON.parse(string);
                // console.log(json);
                return callBack(null, json);
            }

        );
    },
    profile : (data,id,callBack) => {
        console.log(data.email);

        pool.query(
            'update admin set name=?,email=?,username=?,phoneno=? where id=?',

            [
                data.name,
                data.email,
                data.username,
                data.phoneno,
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
    fetchAdmin : (data,callBack) => {
        console.log(data.id);
        pool.query(
            'select * from admin where id=?',
            [data.id],
            (error,results,fields) => {
                if(error){
                    console.log("In error");
                     return callBack(error);
                }
                var string=JSON.stringify(results);
                var json =  JSON.parse(string);
                //console.log(json);
                return callBack(null,json[0]);    
            }
            

        );

    },
    deleteManager : (data,callBack) => {
        pool.query(
            'delete from manager where email=? and username=?',
            [
                data.email,
                data.username
            ],
            (error,results,fields) => {
                if(error){
                     return callBack(error);
                }
            
                return callBack(null,results);    
            }

        );
    },
    getManagerByEmailandUsername: (data,callBack) => {
        pool.query(
            'select * from manager where email=? and username=?',
            [
                data.email,
                data.username
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
    
            }
        );

    },
    addCriteria : (data,callBack) => {
        pool.query(
            'insert into criteria(gender,course,year,seats) values(?,?,?,?)',
            [
                data.gender,
                data.program,
                data.year,
                data.seats,
            ],
            (err,results,fields) => {
                if(err){
                    return callBack(err);
                }
                return callBack(null,results);
            }

        );

    },
    handleForm : (data,callBack) => {
        pool.query(
            'update handleform set form1=?, form2=?',
            [
                data.form1,
                data.form2
            ],
            (error,results,fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }

        );
    },
    getForm1State : (callBack) => {
        pool.query(
            'select form1 from handleform',
            [],
            (err,results,fields) => {
                if(err){
                    return callBack(err);
                }
                let output=JSON.parse(JSON.stringify(results))
                return callBack(null,output[0]); 
                  
            }             
        );
    },
    getForm2State : (callBack) => {
        pool.query(
            'select form2 from handleform',
            [],
            (err,results,fields) => {
                if(err){
                    return callBack(err);
                }
                let output=JSON.parse(JSON.stringify(results))
                return callBack(null,output[0]); 
                  
            }             
        );
    }


    



};


