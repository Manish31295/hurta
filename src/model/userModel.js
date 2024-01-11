const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    firstName: { 
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required:true
    },
    phone: {
        type: String
    },
    role: {
        type: String,
        default: 'user'
    },
    address: {
        type: String
    },
    password: {
        type: String,
        required:true
    },
    image: {
        type: String,
        default: null
    },
    otp: {
        type: String,
        default: null
    },
}, { timestamps: true})

module.exports = mongoose.model('user', userSchema)