const jwt = require('jsonwebtoken');

const userAuth = (req, res, next) => {
    try{
        const token = req.headers.authorization?.split(" ")[1]
        const decodeToken = jwt.verify(token, 'qwerty12345qwerty')
         req.userId = decodeToken.data._id;
         const userId = req.userId;
        if(req.body.userId && req.body.userId !== userId) {
            throw "Invalid User ID"
        } else {
            next()
        }

    } catch (error) {
        console.log(error.message)
        res.status(400).json({ success: false, message: 'JWT Error', error: error.message })
    }
}

module.exports = {userAuth}