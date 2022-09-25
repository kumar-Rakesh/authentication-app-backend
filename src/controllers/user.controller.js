const User = require("../mongoose/model/user.model")
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const { ROUNDS } = require('../mongoose/mongoose')

const getUserById = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(404).json({ message: 'User not found' })
        const user = await User.findById(id)
        if (user === null) return res.status(404).send({ message: 'User not found' })
        return res.status(200).send({ data: { email: user.email, firstName: user.firstName, lastName: user.lastName, image: user.image } })
    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: 'Internal Server Error' })
    }
}

const editUser = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send({ message: 'User not found' })
        const { firstName, lastName, image, password, confirmPassword } = req.body
        let userDetails = null
        if (password && confirmPassword) {
            if (password?.length !== 0 && confirmPassword?.length !== 0) {
                if (password !== confirmPassword) return res.status(400).send({ message: 'Bad Request. Passsword and Confirm Passwords don\'t match' })
                userDetails = { firstName: firstName, lastName: lastName, image: image, password: bcrypt.hashSync(password, ROUNDS) }
            }
        } else {
            userDetails = { firstName: firstName, lastName: lastName, image: image }
        }
        const user = await User.findByIdAndUpdate(id, userDetails)
        return res.status(200).send({ data: { email: user.email, firstName: user.firstName, lastName: user.lastName, image: user.image } })
    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: 'Internal Server Error' })
    }
}

module.exports = { getUserById, editUser }