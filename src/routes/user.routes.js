const express = require('express')
const { editUser, getUserById } = require("../controllers/user.controller");
const { validate } = require('../mongoose/model/user.model');

const router = express.Router()

router.get('/:id', validate, getUserById)
router.patch('/:id', validate, editUser)

module.exports = router