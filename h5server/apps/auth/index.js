const express = require('express')
const router = express.Router()
const app = require('./app')
router.post('/login',app.login)
module.exports = router