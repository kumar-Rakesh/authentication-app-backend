const { Schema, model } = require('mongoose')

const schema = new Schema({
    email: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    description: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    createdAt: {
        type: Date,
        default: new Date().toISOString()
    }
})

const User = model('User', schema)

module.exports = User