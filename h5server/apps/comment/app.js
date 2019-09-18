const dao = require('./dao')
const {getSubjectId,getAuthorId} = require('../post/dao') 
const {controller} = require('../../utils/controller')
const {getAuthor} = require('../user/dao')
const messageDao = require('../message/dao')
const {sendMessage} = require('../message/dao')
const commentThumbDao = require('../commentThumb/dao')
const postApi = require('../post/api')
// const userId = 'c80250ac61534b178ffb9d001f537da7'
const banDao = require('../userBan/dao')
const sensitiveDao = require('../sensitive/dao')
const subjectDao = require('../subject/dao')
module.exports = {
    getAllComments: controller([],function*({req}){
        if(!req.session.isAdmin) return 'access denied'

        let {startIndex,pageSize} = req.query
        if(startIndex) startIndex = parseInt(startIndex)
        if(pageSize) { pageSize = parseInt(pageSize) }else { pageSize=10}

        const condition = {}
        if(req.query.subjectId) {
            condition.subjectId = req.query.subjectId
        }
        if(req.query.text) {
            const reg = RegExp(req.query.text,"i")
            condition.content = {$regex:reg}
        }
        const [count,data] = yield [dao.count(condition),dao.find(condition,{skip:startIndex,limit:pageSize,sort:{createTime:-1}})]
        const authors = yield data.map(el=>getAuthor(el.authorId))
        data.forEach((el,ind)=>{
            el.authorInfo = authors[ind]
        })
        return {total:count,data}
    }),
    getComments: controller(['postId'],function*({req}){
        const userId = req.session.user_id
        let {startIndex,pageSize} = req.query
        if(startIndex) startIndex = parseInt(startIndex)
        if(pageSize) { pageSize = parseInt(pageSize) }else { pageSize=10}

        let data
        if(req.query.userId) { //只看楼主
            data = yield dao.find({...req.params,authorId:req.query.userId},{sort:{createTime:1}}).then(data=>data.filter(el=>el.commentId===undefined))
            data = data.slice(startIndex,startIndex+pageSize)

        }else{
            data = yield dao.find(req.params,{sort:{createTime:1,}}).then(data=>{ //
                return data.filter(el=>el.commentId===undefined)
            })
            // skip:startIndex,limit:pageSize
            // 筛选过之后的分页，不能在find中执行，全量拿回来之后再分页
            data = data.slice(startIndex,startIndex+pageSize)
        }
        const replies = yield data.map(el=>dao.getSeveralRepliesFromHead(el._id))
        const authors = yield data.map(el=>getAuthor(el.authorId))
        const repliers = yield data.map(el=>getAuthor(el.replyUserId))

        
        const thumbCounts = yield data.map(el=>commentThumbDao.count({commentId:el._id}))
        const thumbStatuss = yield data.map(el=>commentThumbDao.count({commentId:el._id,userId}).then(count=>count>0))
        data.forEach((el,ind)=>{
            el.replies = replies[ind]
            el.authorInfo = authors[ind]
            el.thumbCount = thumbCounts[ind]
            el.thumbStatus = thumbStatuss[ind] 
            el.replyUserInfo = repliers[ind]
        })
        return data
    }),
    getReplies: controller(['postId','commentId'],function*({req}){
        const commentId = req.params.commentId
        let {startIndex,pageSize} = req.query
        if(startIndex) startIndex = parseInt(startIndex)
        if(pageSize) { pageSize = parseInt(pageSize) }else { pageSize=10}

        const [count,data] = yield [dao.count({commentId}),dao.find({commentId},{sort:{createTime:1}})] //skip:startIndex,limit:pageSize
        const authors = yield data.map(el=>getAuthor(el.authorId))
        const repliers = yield data.map(el=>getAuthor(el.replyUserId))

        // const thumbCounts = yield data.map(el=>commentThumbDao.count({commentId:el._id}))
        data.forEach((el,ind)=>{
            el.authorInfo = authors[ind]
            el.replyUserInfo = repliers[ind]
            // el.thumbCount = thumbCounts[ind]
        })
        const commentInfo = yield dao.findOne({_id:commentId})
        if(commentInfo) {
            commentInfo.authorInfo = yield getAuthor(commentInfo.authorId)
            delete commentInfo.authorId

        }
        return {count,data,commentInfo} 
    }),
    createComment: controller(['postId','content'],function*({req, fail}){
        const userId = req.session.user_id
        const params = {...req.params, ...req.body, authorId:userId, createTime: Date.now()}
        params.subjectId = yield getSubjectId(req.params.postId)
        const isBanned = yield banDao.isBannedUser(userId,params.subjectId)
        if(isBanned) {
            fail(30001,'banned user can not comment')
            return
        }

        const isSensitiveContent = yield sensitiveDao.isContainerBannedWords(req.body.content)
        if(isSensitiveContent) {
            fail(30003,'sensitive word contained')
            return
        }

        if(!params.subjectId) fail(321,'post id not exist')
        const entry = yield dao.create(params)
        // 更新数量
        const count = yield dao.count({postId:req.params.postId})
        yield postApi.updateReplyNumber(req.params.postId,count)
        
        const receiverId = yield getAuthorId(req.params.postId)
        yield sendMessage({senderId:userId,receiverId,commentId:entry._id.toString(),postId:req.params.postId,type:'comment'})
        return {_id: entry._id}
    }),
    createReply: controller(['postId','content','commentId'],function*({req,fail}){
        const userId = req.session.user_id
        const isBanned = yield banDao.isBannedUser(userId,req.params.subjectId)
        if(isBanned) {
            fail(30002,'banned user can not reply')
            return
        }

        const isSensitiveContent = yield sensitiveDao.isContainerBannedWords(req.body.content)
        if(isSensitiveContent) {
            fail(30003,'sensitive word contained')
            return
        }
        // const userId = 'c80250ac61534b178ffb9d001f537da7'
        const params = {...req.params, ...req.body, authorId:userId, createTime: Date.now()}
        params.subjectId = yield getSubjectId(req.params.postId)
        params.replyUserId = req.body.userId
        const entry = yield dao.create(params)
        // 更新数量
        yield dao.updateReplyNumber(req.params.commentId)
        const count = yield dao.count({postId:req.params.postId})
        yield postApi.updateReplyNumber(req.params.postId,count)

        if(params.replyUserId) {
            const receiverId = params.replyUserId
            yield sendMessage({senderId:userId,receiverId,postId:req.params.postId,type:'reply',commentId:entry._id.toString()})    
        }else{
            const receiverId = yield dao.getAuthorId(req.params.commentId)
            yield sendMessage({senderId:userId,receiverId,postId:req.params.postId,type:'reply',commentId:entry._id.toString()})    
        }
        return {_id: entry._id}
    }),
    deleteOne: controller([ '_id' ],function*({req,fail}){
        const userId = req.session.user_id

        const comment = yield dao.findOne(req.params)
        const postId = comment.postId
        const commentId = comment.commentId
        const subjectId = comment.subjectId

        const isManager = yield subjectDao.isManager(userId,subjectId)
        if(!isManager && !req.session.isAdmin) {
            fail(20004,'only manager can delete post')
            return
        }

        yield dao.deleteOne(req.params)
        if(commentId) {
            // 更新数量
            yield dao.updateReplyNumber(commentId)
            const count2 = yield dao.count({postId})
            yield postApi.updateReplyNumber(postId,count2)
        }else{
            // 更新数量
            const count = yield dao.count({postId})
            yield postApi.updateReplyNumber(postId,count)            
        }
        // 删除message
        yield messageDao.operations.find({commentId:req.params._id}).remove().exec()
        return 'ok'
    }),
}
