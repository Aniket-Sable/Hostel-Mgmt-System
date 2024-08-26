
const {
  createUser,
  getUserByUserId,
  getUsers,
  updateUser,
  deleteUser,
  login,
  applicationForm,
  updateProfile,
  logout,
  getAuthorizedUser,
  fetchProfile,
  // sendmessage,
  reclogin,
  getapplications,
  allocatedlist,
  malealllocatedlist,
  femalealllocatedlist,
  isLoggedIn,
  emailSend,
  changePassword,
  mailer,
  firstapp,
  secondapp,
  getStatus,
  userLogin,
  fetchuserProfile,
  updateuserProfile,
  postComment,
} = require("./user.controller");

const router = require("express").Router();
// const { checkToken } = require("../../auth/token_validation");
const {checkToken} = require("../../auth/user_token_validation");
const { body, check } = require('express-validator');
//File Uploading
const multer = require('multer');
const fs = require('fs');
let uuidv4 = require('uuidv4');
//CRUD operation
router.post("/", createUser);

router.get("/", getUsers);
router.get("/:id", getUserByUserId);
router.patch("/", updateUser);
router.delete("/", deleteUser);
router.post("/login", login);

//Apply for hostel
router.post("/apply", [
  check('email', 'Please check the email').isEmail().isLength({ min: 10, max: 30 }),
  check('prn', 'PRN Should be complete').isAlphanumeric().isLength({ min: 14, max: 17 }),
  check('contactno', 'Mobile number should contains 10 digits').isLength({ min: 10, max: 10 })
], applicationForm);

//Allocation List
router.get("/reclogin/allocated", allocatedlist);
router.get("/reclogin/maleallocated", malealllocatedlist);
router.get("/reclogin/femaleallocated", femalealllocatedlist);

router.patch("/profile", checkToken, updateProfile);

// router.get("/login/logout", checkToken, logout);


router.get("/protected", checkToken, getAuthorizedUser);

router.get("/update", checkToken, fetchProfile);

// router.post("/message", sendmessage);

router.get("/login/isloggedin", checkToken, isLoggedIn);

router.post("/reclogin", reclogin);

router.get("/getapplications", getapplications);

router.post("/email-send", emailSend);

router.post("/change-password", changePassword);

//**************New Routes**********
//First Application
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/firstappln');
  },
  filename: function (req, file, cb) {

    let prn = req.body.prn;
    let course = req.body.course;
    const mimeExtension = {
      'image/jpeg': '.jpeg',
      'image/jpg': '.jpg',
      'image/png': '.png',
      'application/pdf': '.pdf',
    }
    //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    // const fileName = file.originalname.toLowerCase().split(' ').join('-');

    cb(null, Date.now() + '-' + file.originalname);
    // console.log(req.files);
    // cb(null, prn + "_" + course + "-" + file.fieldname + '-' + Date.now() + mimeExtension[file.mimetype])
  },
});

const userUpload = multer({
  // console.log("In multer");
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'application/pdf') {
      cb(null, true);
    }
    else {
      cb(null, false);
      req.fileError = "File Format is not valid.";
    }
  }
});

var uploadMultiples = userUpload.fields(
  [
    { name: 'addreceipt', maxCount: 1 },
    { name: 'marksheet', maxCount: 1 },
    { name: 'castcertificate', maxCount: 1 },
  ]
);
router.post("/firstapply", uploadMultiples, firstapp);
//------------------------------------------------------
//Second Application
const secondstorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/secondappln');
  },
  filename: function (req, file, cb) {

    let prn = req.body.prn;
    let course = req.body.course;
    const mimeExtension = {
      'image/jpeg': '.jpeg',
      'image/jpg': '.jpg',
      'image/png': '.png',
      'application/pdf': '.pdf',
    }
    //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, prn + "_" + course + "-" + file.fieldname + '-' + Date.now() + mimeExtension[file.mimetype])
  },
});

const upload = multer({
  storage: secondstorage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'application/pdf') {
      cb(null, true);
    }
    else {
      cb(null, false);
      req.fileError = "File Format is not valid.";
    }
  }
}).fields(
  [
    { name: 'addmissionreceipt', maxCount: 1 },
    { name: 'previousmarksheet', maxCount: 1 },
    { name: 'castcertificate', maxCount: 1 },
    { name: 'hostelfeereceipt', maxCount: 1 },
    { name: 'vacinationcert', maxCount: 1 },
    { name: 'undertaking', maxCount: 1 },
  ]
);

router.post("/secondapply", upload, secondapp);
//------------------------------------------------------
router.get("/user/getstatus", getStatus);

router.get("/user/logout",checkToken,logout);
router.post("/userlogin",userLogin);
router.get("/user/fetch",checkToken,fetchuserProfile);
router.patch("/user/update",checkToken,updateuserProfile);
router.post("/user/comment",checkToken,postComment);
module.exports = router;
