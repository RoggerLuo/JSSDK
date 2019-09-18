// const {getDao} = require('../../utils/dao')
// const dao = getDao(require('./model'))
// const postApi = require('../post/api')
// const commentDao = require('../comment/dao')
// const subjectFollowDao = require('../subjectFollow/dao')
// const thumbDao = require('../thumb/dao')
const dao = require('./model')
const {isFollowed} = require('../subjectFollow/dao')

module.exports = {
    ...dao,
    *getSubject(subjectId,userId) { // userId用来判断是否关注
        const subject = yield dao.findOne({_id:subjectId})
        const isFollowedStatus = yield isFollowed({subjectId,userId})
        subject.followedStatus = isFollowedStatus
        return subject
    },
}