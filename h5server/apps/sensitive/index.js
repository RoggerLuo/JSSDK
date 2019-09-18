const express = require('express')
const router = express.Router()
const app = require('./app')
router.get('/',app.getList)
router.post('/',app.create)
router.post('/:_id',app.updateOne)
router.delete('/:_id',app.deleteOne)

module.exports = router