const User = require('../mongoose/model/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const path = require('path')

dotenv.config({ path: path.join(__dirname, '../../config/.env') })

const register = async (req, res) => {
    try {
        const { email, firstName, lastName, image, password, confirmPassword } = req.body

        if (password.length === 0 || password !== confirmPassword) return res.status(400).send({ message: 'Bad Request' })

        const ROUNDS = process.env.HASH_ROUNDS

        const hashedPassword = bcrypt.hashSync(password, ROUNDS)

        const user = new User({ email, firstName, lastName, password: hashedPassword, image })

        const { _id } = await user.save()

        return res.status(200).send({ id: _id, message: 'User registered successfully' })

    } catch (err) {
        return res.status(500).send({ message: 'Internal Server Error' })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const users = await User.find({ email: email })

        if (users.length === 0) return res.status(401).send({ message: 'Invalid credentials' })

        if (!bcrypt.compareSync(password, users[0].password)) return res.status(401).send({ message: 'Invalid Credentials' })

        const accessToken = jwt.sign(
            {
                id: users[0]._id, email: email
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: "1h"
            }
        )
        return res.status(200).send({ data: { email: users[0].email, firstName: users[0].firstName, lastName: users[0].lastName }, accessToken: accessToken })
    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: 'Internal Server Error' })
    }
}

module.exports = { register, login }