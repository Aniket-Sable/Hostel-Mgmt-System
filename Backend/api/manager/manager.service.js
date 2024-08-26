const pool=require("../../database");

module.exports = {
    getManagerByEmail: (email,callBack) => {
        pool.query(
            'select * from manager where email=?',
            [email],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                //let output=JSON.parse(JSON.stringify(results))
                return callBack(null, results[0]);
    
            }
        );

    },
    storeMangerToken : (data,callBack) => {
        pool.query(

            'update manager set token=? where id=?',

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
    profile : (data,id,callBack) => {
        console.log(data.email);
        
        
        pool.query(
            'update manager set name=?,email=?,password=?,phoneno=? where id=?',

            [
                data.name,
                data.email,
                data.password,
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
    fetchManager : (data,callBack) => {
        console.log(data.id);
        pool.query(
            'select * from manager where id=?',
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
    getManagerById : (id,callBack) => {
        pool.query(
            'select * from manager where id=?',
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }

                return callBack(null, results[0]);
            }

        );

    },
    complaints : (b1, b2,callBack) => {
        
        pool.query(
            'select * from comments where block=? or block=?',
            [   
                b1,
                b2
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }

                var string=JSON.stringify(results);
                var json =  JSON.parse(string);
                return callBack(null, json);
            }

        );

    },
    getManager: (id,callBack) => {
        pool.query(
            'select * from manager where id=?',
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                //let output=JSON.parse(JSON.stringify(results))
                return callBack(null, results[0]);
    
            }
        );

    },

};