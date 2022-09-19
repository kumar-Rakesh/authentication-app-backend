require('./mongoose/mongoose')
const express = require('express')
const authRoutes = require('./routes/auth.routes')
const dotenv = require('dotenv')
const path = require('path')

dotenv.config({ path: path.join(__dirname, '../config/.env') })

const app = express()

const PORT = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/', authRoutes)

app.listen(PORT, () => {
    console.log(`Server started listening on ${PORT}`)
})
