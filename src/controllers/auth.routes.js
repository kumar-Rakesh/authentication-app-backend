const User = require('../mongoose/model/user.model')
const bcrypt = require('bcryptjs')

const register = async (req, res) => {
    try {
        const { email, firstName, lastName, image, password, confirmPassword } = req.body

        if (password.length === 0 || password !== confirmPassword) return res.status(400).send({ message: 'Bad Request' })

        const hashedPassword = bcrypt.hashSync(password)

        const user = new User({ email, firstName, lastName, password: hashedPassword, image })

        const { _id } = await user.save()

        return res.status(200).send({ id: _id, message: 'User registered successfully' })

    } catch (err) {
        return res.status(500).send({ message: 'Internal Server Error' })
    }
}

module.exports = { register }