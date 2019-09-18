const express = require('express')
const router = express.Router()
const app = require('./app')
router.get('/post',app.getMyPost)
router.get('/follow',app.getMyFollow)
router.get('/favorite',app.getMyFavorite)
router.get('/count',app.getCount)

module.exports = router