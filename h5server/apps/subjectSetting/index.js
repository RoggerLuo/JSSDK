const express = require('express')
const router = express.Router()
const app = require('./app')
const subjectApp = require('../subject/app')
// router.get('/',app.getRecommend)
router.post('/audit/:_id',app.openAudit)
router.delete('/audit/:_id',app.closeAudit)

router.post('/audit-post/:_id',app.auditPost)
router.delete('/audit-post/:_id',app.auditPostFail)

router.post('/access/:_id',app.openAccess)
router.delete('/access/:_id',app.closeAccess)

router.get('/audit/:_id',app.getAudit)
router.get('/org',app.getOrg)
router.get('/employees',app.getOrgEmployees)
router.get('/search-employee',app.searchForEmployee)

router.post('/range/:id',subjectApp.modifyTime)
// router.delete('/:_id',app.recommendDelete)

module.exports = router