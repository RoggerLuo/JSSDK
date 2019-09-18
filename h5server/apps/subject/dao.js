const dao = require('./model')
const postApi = require('../post/api')
const commentDao = require('../comment/dao')
const subjectFollowDao = require('../subjectFollow/dao')
const thumbDao = require('../thumb/dao')
const {isFollowed} = require('../subjectFollow/dao')

module.exports = {
    ...dao,
    getAuditStatus(subjectId){
        return dao.findOne({_id:subjectId}).then(val=>{
            if(val) return !!val.audit
            return false
        })
    },
    updatePopularity: function*(subjectId){
        const within1month = {createTime:{'$gte': Date.now() - 30*24*60*60}}
        const condition = {subjectId,...within1month}
        const postCount = yield postApi.count(condition)
        const commentCount = yield commentDao.count(condition)
        const followedCount = yield subjectFollowDao.count(condition)
        const thumbCount = yield thumbDao.count(condition)
        const count = followedCount*4 + postCount*2 + commentCount + thumbCount
        yield dao.updateOne({_id:subjectId},{popularity:count})
        return 'ok'
    },
    updateFollowedCount:(subjectId,count) => dao.updateOne({_id:subjectId},{followedCount:count}),
	getList: params => dao.find(params),
    updatePostCount: (subjectId,length) => dao.operations.findOneAndUpdate({_id:subjectId},{postCount:length}),
    *getSubject(subjectId,userId) { // userId用来判断是否关注
        const subject = yield dao.findOne({_id:subjectId})
        const isFollowedStatus = yield isFollowed({subjectId,userId})
        subject.followedStatus = isFollowedStatus
        const isManager = subject.managers.map(el=>el.userId).indexOf(userId) !== -1
        subject.isManager = isManager
        return subject
    },
    * isBannedSubject(subjectId){
        const entry = yield dao.findOne({_id:subjectId})
        if(entry === null) return true
        if(!entry.startTime||!entry.endTime) return false
        const getMins = date=>{
            console.log(date.getHours())
            console.log(date.getMinutes())
            return date.getHours()*60 + date.getMinutes()    
        }
        if(entry.accessTimeLimit === true && getMins(new Date()) > getMins(new Date(entry.startTime)) && getMins(new Date()) < getMins(new Date(entry.endTime))){
            return true
        }
        return false
    },
    * isManager(userId,subjectId) {
        const entry = yield dao.findOne({_id:subjectId})
        return entry.managers.map(el=>el.user_id).indexOf(userId) !== -1
    }
}