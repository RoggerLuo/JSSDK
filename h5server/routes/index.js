const express = require('express')
const v1 = express()
v1.use('/auth', require('../apps/auth'))
v1.use('/admin-auth', require('../apps/adminAuth'))
v1.use('/user', require('../apps/user'))
v1.use('/user-ban', require('../apps/userBan'))

v1.use('/subject', require('../apps/subject'))
v1.use('/subject-follow', require('../apps/subjectFollow'))
v1.use('/subject-setting', require('../apps/subjectSetting'))

v1.use('/search', require('../apps/search'))
v1.use('/post', require('../apps/post'))
v1.use('/post-top', require('../apps/postTop'))
v1.use('/post-recommend', require('../apps/postRecommend'))

v1.use('/medias', require('../apps/medias'))
v1.use('/thumb', require('../apps/thumb'))
v1.use('/comment', require('../apps/comment'))
v1.use('/comment-thumb', require('../apps/commentThumb'))
v1.use('/message', require('../apps/message'))
v1.use('/favorite', require('../apps/favorite'))
v1.use('/sensitive', require('../apps/sensitive'))
v1.use('/my', require('../apps/my'))

/* 注意，v1改成了bbs */
module.exports = function (app) {
    app.use('/bbs',v1)
}
