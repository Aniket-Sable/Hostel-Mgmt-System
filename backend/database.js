const mysql=require("mysql");
const dotenv = require("dotenv");
dotenv.config({path: './.env'});



const connection=mysql.createConnection({
    host: process.env.DATABASE_HOST, // assign your host name
    user: process.env.DATABASE_USER,      //  assign your database username
    password: process.env.DATABASE_PASSWORD,      // assign your database password
    database: process.env.DATABASE // assign database Name
    
});
        
module.exports = connection;