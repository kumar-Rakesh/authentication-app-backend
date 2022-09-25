const path = require('path')
const dotenv = require('dotenv')
const { connect, connection } = require('mongoose')

dotenv.config({ path: path.join(__dirname, '../../config/.env') })

const DB_URI = process.env.DB_URI

connect(DB_URI, null)

connection.once('open', () => console.log('Connection Open!!'))

module.exports = {
    ROUNDS: Number.parseInt(process.env.HASH_ROUNDS),
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET
}

