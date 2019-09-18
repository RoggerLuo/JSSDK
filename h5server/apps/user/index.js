const express = require('express')
const router = express.Router()
const app = require('./app')
router.get('/search',app.search)
// router.get('/', app.getList)
// router.get('/:_id', app.getOne)
// router.delete('/:_id',app.deleteOne)
module.exports = router