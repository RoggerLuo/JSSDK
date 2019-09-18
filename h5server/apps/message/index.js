const express = require('express')
const router = express.Router()
const app = require('./app')
router.get('/',app.getList)
router.get('/unread-count',app.unreadCount)
router.get('/mark-read-all',app.markReadAll)
router.get('/mark-read/:_id',app.markRead)
module.exports = router