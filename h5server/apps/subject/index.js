const express = require('express')
const router = express.Router()
const app = require('./app')
router.get('/', app.getList)
router.get('/:subjectId', app.getOne)
router.post('/:subjectId', app.modifyOne)
router.post('/',app.create)
router.delete('/:_id',app.deleteOne)

router.post('/:subjectId/onshelf', app.onshelf)
router.delete('/:subjectId/onshelf',app.offshelf)


module.exports = router