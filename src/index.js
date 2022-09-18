const express = require('express')
const router = require('./routes/test.routes')
const app = express()

const PORT = 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', router)

app.listen(PORT, () => {
    console.log(`Server started listening on ${PORT}`)
})
