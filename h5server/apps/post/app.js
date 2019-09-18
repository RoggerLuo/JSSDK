const dao = require('./dao')
const thumbDao = require('../thumb/dao')
const {getAuthor} = require('../user/dao')
const subjectDao = require('../subject/dao') //getAuditStatus {getSubject,updatePostCount,updatePopularity}
const {controller} = require('../../utils/controller')
const subjectFollowDao = require('../subjectFollow/dao')
const favorDao = require('../favorite/dao')
const banDao = require('../userBan/dao')
const messageDao = require('../message/dao')
const sensitiveDao = require('../sensitive/dao')
/* post error code basic: 2 */
// const userId = 'c80250ac61534b178ffb9d001f537da7'
module.exports = {
    getList: controller([],function*({req}){
        const userId = req.session.user_id
        // const userId = 'c80250ac61534b178ffb9d001f537da7'
        let {startIndex,pageSize} = req.query
        if(startIndex) startIndex = parseInt(startIndex)
        if(pageSize) { pageSize = parseInt(pageSize) }else { pageSize=10}
        
        // 板块信息
        let subjectInfo = null
        if(req.query.subjectId) {
            subjectInfo = yield subjectDao.getSubject(req.query.subjectId,userId)
        }

        const condition = {}

        // 获取某个板块的帖子数据
        const hasSubject = !!req.query.subjectId
        if(hasSubject){
            condition.subjectId = req.query.subjectId
            // 是否是管理员 
            const isManager = yield subjectDao.isManager(userId,req.query.subjectId)
            // 审帖状态，显示审核后的帖子or not
            const needAudit = yield subjectDao.getAuditStatus(req.query.subjectId)
            if(needAudit) {
                condition.auditStatus = true
            }

            // 访问时间限制
            const banned = yield subjectDao.isBannedSubject(req.query.subjectId) 
            if(banned && !isManager) {
                return {total:0,data:[],subjectInfo}
            }
        }
        
        if(req.query.recommend && req.query.recommend!=='false') {
            condition.recommendStatus = true
        }
        if(req.query.top && req.query.top!=='false') {
            condition.topStatus = true
        }
        // 获取首页的帖子数据
        if(!hasSubject) { 
            condition.auditStatus = true //{$ne:false}
            const subjects = yield subjectDao.find()
            const subjectsBannedStatus = yield subjects.map(el=>subjectDao.isBannedSubject(el._id.toString())) 
            const availableSubjects = subjects.filter((el,ind)=>!subjectsBannedStatus[ind]).map(el=>el._id.toString())
            condition.subjectId = {$in:availableSubjects}
            // const data = yield dao.operations.find(condition).populate('subject')
        }
        // 获取用户关注的板块的帖子 要放在首页条件后面，不然会被覆盖
        if(req.query.follow && req.query.follow!=='false'){
            const subList = yield subjectFollowDao.getMyFollowList(userId)
            condition.subjectId = {'$in': subList}
        }
        // 后台管理员逻辑
        if(req.session.isAdmin) { 
            delete condition.auditStatus
            if(req.query.auditStatus=='false') {
                condition.auditStatus = false
            }
            if(req.query.auditStatus=='true') {
                condition.auditStatus = true
            }
        }

        const [count,data] = yield [dao.count(condition),dao.find(condition,{skip:startIndex,limit:pageSize,sort:{createTime:-1}})]
        const authors = yield data.map(el=>getAuthor(el.authorId))
        const thumbStatus = yield data.map(el=>thumbDao.isThumbed({postId:el._id,userId}))
        const favoriteStatus = yield data.map(el=>favorDao.isFavorited({postId:el._id,userId}))

        data.forEach((el,ind)=>{
            el.thumbStatus = thumbStatus[ind]
            el.authorInfo = authors[ind]
            el.recommendStatus = !!el.recommendStatus
            el.favoriteStatus = favoriteStatus[ind]
            delete el.authorid
            delete el.managers
        })
        if(req.query.subjectId) {
            // const subjectInfo = yield subjectDao.getSubject(req.query.subjectId,userId)
            return {total:count,data,subjectInfo}
        }
        return {total:count,data}
    }),
    create: controller([ 'title', 'content', 'images', 'subjectId' ],function*({req,fail}){
        const userId = req.session.user_id
        const subject = yield subjectDao.getSubject(req.body.subjectId,userId)
        const isBanned = yield banDao.isBannedUser(userId,subject._id)
        if(isBanned) {
            fail(20001,'banned user can not release post')
            return
        }

        const isSensitiveContent = yield sensitiveDao.isContainerBannedWords(req.body.content)
        const isSensitiveTitle = yield sensitiveDao.isContainerBannedWords(req.body.title)
        if(isSensitiveContent || isSensitiveTitle ) {
            fail(20002,'sensitive word contained')
            return
        }

        let entry
        if(subject.audit) {
            entry = yield dao.create({...req.body, authorId:userId, createTime: Date.now(), topStatus:false})
        }else{ //如果没开审帖，默认发帖就审核通过 
            entry = yield dao.create({...req.body, authorId:userId, createTime: Date.now(), topStatus:false, auditStatus:true})
        }
        const len = yield dao.count({subjectId:req.body.subjectId})
        yield subjectDao.updatePostCount(req.body.subjectId,len)
        yield subjectDao.updatePopularity(req.body.subjectId)
        return {_id: entry._id}
    }),
    getOne: controller(['_id'],function*({req}){
        const userId = req.session.user_id

        if(req.query.refresh !== 'true') {
            yield dao.incrementReadNumber(req.params._id) // 阅读+1
        }
        return yield dao.getPost(req.params._id,userId)
    }),
    deleteOne: controller(['_id'],function*({req,fail}){
        const rs = yield dao.findOne({_id:req.params._id})
        if(rs === null) fail(240,'post does not exist')
        const subjectId = yield dao.getSubjectId(req.params._id)
        const userId = req.session.user_id
        const isManager = yield subjectDao.isManager(userId,subjectId)
        const isAuthorItSelf = rs.authorId === userId // 自己可以删除
        if(!isManager && !req.session.isAdmin && !isAuthorItSelf) {
            fail(20004,'only manager can delete post')
            return
        }
        // const post = yield findOne({_id:req.params._id})
        yield dao.deleteOne(req.params)
        const len = yield dao.count({subjectId})
        yield subjectDao.updatePostCount(subjectId,len)
        // yield sendMessage({receiverId:post.authorId,postId:req.params.postId,type:'comment'})
        // 删除message
        yield messageDao.operations.find({postId:req.params._id}).remove().exec()
        yield favorDao.operations.find({postId:req.params._id}).remove().exec()
        return 'ok'
    }),
}
