const User = require("../mongoose/model/user.model")

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

module.exports = { editUser }