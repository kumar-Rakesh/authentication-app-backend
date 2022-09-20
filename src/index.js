require('./mongoose/mongoose')
const express = require('express')
const authRoutes = require('./routes/auth.routes')
const userRoutes = require('./routes/user.routes')
const dotenv = require('dotenv')
const path = require('path')
const cors = require('cors')

dotenv.config({ path: path.join(__dirname, '../config/.env') })

const app = express()

const PORT = process.env.PORT

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)

app.listen(PORT, () => {
    console.log(`Server started listening on ${PORT}`)
})
