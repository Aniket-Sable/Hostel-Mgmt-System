const { 
    
    managerLogin,
    logout,
    updateManagerProfile,
    fetchManagerProfile
    ,getComments,
  
    
 } = require("./manager.controller");

const router = require("express").Router();
const {checkToken} = require("../../auth/manager_token_validation");
const {body, check} = require('express-validator');
//File Uploading
const multer = require('multer');
const fs = require('fs');

router.post("/login",managerLogin);

router.get("/logout",checkToken,logout);

router.get("/fetch",checkToken,fetchManagerProfile);

router.patch("/update",checkToken,updateManagerProfile);

router.get("/comments",checkToken,getComments);
module.exports = router;