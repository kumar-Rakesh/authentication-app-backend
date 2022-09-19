const path = require('path')
const dotenv = require('dotenv')
const { connect, connection } = require('mongoose')

dotenv.config({ path: path.join(__dirname, '../../config/.env') })

const DB_URI = process.env.DB_URI

connect(DB_URI, null)

connection.once('open', () => console.log('Connection Open!!'))

