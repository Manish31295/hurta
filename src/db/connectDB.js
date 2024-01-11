const mongoose = require('mongoose');
const connectDB = async () => {
   await mongoose.connect('mongodb://127.0.0.1:27017/affordableShop').then(res => {
    console.log('DataBase Connected!')
   }).catch(err => {
    console.log('Connection Failed!')
   })
}

module.exports = connectDB;