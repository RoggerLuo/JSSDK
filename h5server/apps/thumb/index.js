const express = require('express')
const router = express.Router()
const app = require('./app')
router.post('/:_id',app.create)
router.delete('/:_id',app.deleteOne)

module.exports = router