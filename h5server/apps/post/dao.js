const dao = require('./model')
const {toObject} = require('../../utils/dao')
const authDao = require('../user/dao')
const thumbDao = require('../thumb/dao')
const subjectDao = require('../subject/dao')
const favorDao = require('../favorite/dao')
const fail = require('../../utils/fail')

module.exports = {
    ...dao,
    incrementReadNumber(_id){
        const update = {"$inc": {readNumber: 1}}
        return dao.operations.findOneAndUpdate({_id}, update, {new: true}).exec().then(toObject) 
    },
    updateThumb:(_id,thumbNumber) => dao.updateOne({_id},{thumbNumber}),
    getSubjectId: postId => dao.findOne({_id:postId}).then(data=>data.subjectId),
    getAuthorId: postId => dao.findOne({_id:postId}).then(data=>data.authorId),
    *getPost(postId,userId=''){ // 只有在获取帖子详情的情况下才会有userId
        const condition = {_id:postId}
        const subjectId = yield dao.findOne({_id:postId}).then(data=>{
            if(data) { 
                return data.subjectId
            }else{
                return null
                //throw Error(`postId:${postId}找不到subjectId`)
            }
        })
        if(subjectId===null) return null
        const subjectAudit = yield subjectDao.getAuditStatus(subjectId)

        const _post = yield dao.findOne(condition)
        if(!_post) {
            // fail(41001,'post does not exist')
            return null
        }
        // const isManager = yield subjectDao.isManager(userId,subjectId)
        if(userId === _post.authorId) { // 如果是本人，不管审核与否都

        }else{
            if(subjectAudit) {
                condition.auditStatus = true
            }    
        }
        const post = yield dao.findOne(condition)

        if(post) {
            const userId = post.authorId
            post.subjectInfo = yield subjectDao.getSubject(post.subjectId,userId) // userId用来判断是否关注
            post.thumbStatus = yield thumbDao.isThumbed({postId,userId})
            post.authorInfo = yield authDao.getAuthor(userId)
            post.favoriteStatus = yield favorDao.isFavorited({postId,userId})
        }else{
            // fail(41002,'post does not pass audit')
            return null
        }
        return post
    },
}
