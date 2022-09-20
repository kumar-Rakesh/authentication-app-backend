const User = require('../mongoose/model/user.model')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const path = require('path')

dotenv.config({ path: path.join(__dirname, "../../config/.env") })

const emailExists = async (req, res, next) => {
    try {
        const { email } = req.body
        const user = await User.find({ email })
        if (user.length !== 0) return res.status(400).send({ message: 'Email already in use' })
        next()
    } catch (err) {
        return res.status(500).send({ message: 'Internal Server Error' })
    }
}

const validateToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        if (!token || token.length === 0) return res.status(401).send({ message: 'Token missing' })
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.userId = decoded?.id
        next()
    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: 'Internal Server Error' })
    }
}

module.exports = { emailExists, validateToken }