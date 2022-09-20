const express = require('express')
const { register, login } = require('../controllers/auth.controller')
const { emailExists } = require('../middleware/auth.middleware')

const router = express.Router()

router.post('/register', emailExists, register)
router.post('/login', login)

module.exports = router
