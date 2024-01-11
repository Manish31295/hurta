const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 8080

const connectDB = require('./src/db/connectDB')
const userRoutes = require('./src/route/userRoute')

var corsOptions = {
    origin: ["http://www.swift.com/","http://localhost:3000"],
    optionsSuccessStatus: 200 // For legacy browser support
    }
    
    app.use(cors(corsOptions));
app.use(bodyParser.json())
app.use('/api', userRoutes)

app.listen(port, () => {
    console.log(`server on running http://localhost:${port}`)
    connectDB()
})