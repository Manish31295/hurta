const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const { userAuth } = require('../middlware/userAuth');
const multer = require('multer');
// require("../upload")
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "./src/upload")
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname  + "-" + Date.now() + ".jpg")
        }
    })
}).single("image");


router.post('/user/create', userController.createUser );
router.post('/user/login', userController.loginUser );
router.get('/user/getAllUsers', userAuth, userController.getAllUsers);
router.get('/user/getUserById:id', userAuth, userController.getUserById);
router.get('/user/updateUserById:id', userAuth, userController.updateUserById);
router.get('/user/deleteUserById:id', userAuth, userController.DeleteUserById);
router.post('/user/profileUpload', userAuth, upload, userController.profileUpload);

router.post('/user/sent/otp', userAuth, userController.sendOTPtoPhone);


module.exports = router;