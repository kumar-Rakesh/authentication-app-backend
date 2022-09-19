const User = require('../mongoose/model/user.model')

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

module.exports = { emailExists }