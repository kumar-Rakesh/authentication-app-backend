const express = require('express')
const { editUser } = require("../controllers/user.controller");
const { validate } = require('../mongoose/model/user.model');

const router = express.Router()

router.patch('/user/edit', validate, editUser)

module.exports = router