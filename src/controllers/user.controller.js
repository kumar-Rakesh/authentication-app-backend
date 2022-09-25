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
        const { email, firstName, lastName, image, password, confirmPassword } = req.body
        if (password !== confirmPassword) return res.status(400).send({ message: 'Bad Request' })
        const user = await User.findOneAndUpdate({ email: email }, { firstName: firstName, lastName: lastName, image: image })
        return res.status(200).send({ data: { email: user.email, firstName: user.firstName, lastName: user.lastName, image: user.image } })
    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: 'Internal Server Error' })
    }
}

module.exports = { getUserById, editUser }