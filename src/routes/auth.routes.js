const express = require('express')
const { register } = require('../controllers/auth.routes')
const { emailExists } = require('../middleware/auth.middleware')

const router = express.Router()

router.post('/auth/register', emailExists, register)

module.exports = router
