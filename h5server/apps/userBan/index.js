const express = require('express')
const router = express.Router()
const app = require('./app')
router.post('/:subjectId/:userId',app.create)
router.delete('/:subjectId/:userId',app.del)
router.get('/:subjectId',app.get)
router.get('/',app.getAll)

module.exports = router