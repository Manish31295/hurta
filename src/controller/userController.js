const jwt = require('jsonwebtoken');
const ObjectId = require('mongoose').Types.ObjectId; 
const User = require('../model/userModel')
const {createUserValidation} = require("../validate/validator")
require('dotenv').config()

// Twilio configration
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const createUser = async (req, res) => {
    try{
        const { error } = await createUserValidation(req.body)
        if(error) return res.status(400).json({ success: false, message: error.details[0].message })

        const alreadyEmailExist = await User.findOne({ email: req.body.email})
        if(alreadyEmailExist && alreadyEmailExist.email === req.body.email){
            return res.status(400).json({ success: false, message: 'Email Already Registered!'})
        }
        const alreadyPhoneExist = await User.findOne({ phone: req.body.phone})
        if(alreadyPhoneExist && alreadyPhoneExist.phone === req.body.phone){
            return res.status(400).json({ success: false, message: 'Phone Already Registered!'})
        }

        const  userDoc = await User.create(req.body)

        res.status(200).json({ success: true, message: 'User Created Successfully', result: userDoc})

    } catch(error){
        res.status(400).json({ success: false, message: 'Server Error', error: error.message })
    }
}

const loginUser = async (req, res) => {
    try{
        const {email, password} = req.body;
        const emailFind = await User.findOne({email: email})
        if(!emailFind) return res.status(404).json({ success: false, message: "User Not Found!"})
        console.log(emailFind)
        if(emailFind.email !== email) return res.status(400).json({ success: false, message: "Email Wrong Credentials" })
        if(emailFind.password !== password) return res.status(400).json({ success: false, message: "Password Wrong Credentials" })

        const token = jwt.sign({ data: emailFind}, 'qwerty12345qwerty', { expiresIn: "5m" });
        
        res.status(200).json({ success: true, message: "User Logined", data: emailFind, token: token })

    } catch (error) {
        res.status(400).json({ success: false, message: 'Server Error', error: error.message })
    }
}

const getAllUsers = (req, res) => {
    try{
res.send('hello')
    } catch(error){
        res.status(400).json({ success: false, message: 'Server Error', error: error.message })
    }
}
const getUserById = (req, res) => {
    try{

    } catch(error){
        res.status(400).json({ success: false, message: 'Server Error', error: error.message })
    }
}
const updateUserById = (req, res) => {
    try{

    } catch(error){
        res.status(400).json({ success: false, message: 'Server Error', error: error.message })
    }
}
const DeleteUserById = (req, res) => {
    try{

    } catch(error){
        res.status(400).json({ success: false, message: 'Server Error', error: error.message })
    }
}
const profileUpload = async (req, res) => {
    try{
        const userid = req.userId
        if(!userid) return res.status(400).json({ success:false, message:"UserID is Required."})
        const userInfo = await User.findOneAndUpdate({_id: new ObjectId(userid)}, {image: req.file.filename})
        if(!userInfo) return res.status(404).json({ success: false, message: "Failed"})
        res.status(200).json({ success: true, message: "Uploaded Image", data: userInfo})
    } catch(error){
        res.status(500).json({ success: false, message: 'Server Error', error: error.message })
    }
}

const sendOTPtoPhone = async (req, res) => {
    try{
        const userid = req.userId
        if(!userid) return res.status(400).json({ success:false, message:"UserID is Required."})
        const phoneNumber = req.body.phoneNumber
        if(!phoneNumber) return res.status(400).json({ success:false, message:"Phone Number is Required."})
await client.messages
    .create({
        body: 'Hi Amit, This side Vikash Here',
        messagingServiceSid: 'MG275ce661532545bfad8b7cc48292d53e',
        to: phoneNumber
    })
    .then(message =>  res.status(200).json({ success: true, message: "Sent OTP", data: message}));
    } catch(error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message })
    }
}

module.exports = {
    createUser,
    loginUser,
    getAllUsers,
    getUserById,
    updateUserById,
    DeleteUserById,
    profileUpload,
    sendOTPtoPhone
}