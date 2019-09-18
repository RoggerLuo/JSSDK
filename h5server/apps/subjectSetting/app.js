const {controller} = require('../../utils/controller')
// const userId = 'c80250ac61534b178ffb9d001f537da7'
const dao = require('../subject/dao')
const postApi = require('../post/api')
const getAtwork = require('../getAtwork')
const config = require('../../config')
const {sendMessage} = require('../message/dao')

module.exports = {
    searchForEmployee: controller([],function*({req}){
        const keyword = req.query.keyword
        const atworkInstance = yield getAtwork()
        const orgInfo = yield atworkInstance.searchForEmployee(keyword)
        return orgInfo.result
    }),
    getOrgEmployees: controller([],function*({req}){
        const orgId = req.query.orgId
        const atworkInstance = yield getAtwork()
        const orgInfo = yield atworkInstance.getOrgAllEmployeesByOrgId(config.ctx.orgId,orgId)
        console.log(orgInfo)
        return orgInfo.result
    }),
    getOrg: controller([],function*({req}){
        const orgId = req.query.orgId
        const atworkInstance = yield getAtwork()
        let orgInfo
        if(orgId) {
            orgInfo = yield atworkInstance.getOrgInfoById(config.ctx.orgId,orgId) //orgId||
        }else{
            orgInfo = yield atworkInstance.getOrgInfo(config.ctx.orgId) //orgId||
        }        
        return orgInfo.result
    }),
    auditPost: controller(['_id'],function*({req}){
        const post = yield postApi.updateOne({_id:req.params._id},{auditStatus:true})
        yield sendMessage({receiverId:post.authorId,postId:req.params._id,type:'auditPass'})
        return 'ok'
    }),
    auditPostFail: controller(['_id'],function*({req}){
        const post = yield postApi.updateOne({_id:req.params._id},{auditStatus:false})
        yield sendMessage({receiverId:post.authorId,postId:req.params._id,type:'auditFail',postTitle:post.title})    
        return 'ok'
    }),
    getAudit: controller(['_id'],function*({req}){
        const _id = req.params._id
        let {startIndex,pageSize} = req.query
        if(startIndex) startIndex = parseInt(startIndex)
        if(pageSize) { pageSize = parseInt(pageSize) }else { pageSize=10}
        const condition = {subjectId:_id, $and:[{auditStatus:{$ne:true}},{auditStatus:{$ne:false}}]}
        const userId = req.session.user_id
        // ,{skip:startIndex,limit:pageSize}
        const data = yield postApi.getList({condition,startIndex,pageSize,userId})
        // data.data.forEach(el=>{
        //     el.audit=!!el.audit
        // })
        return data
        // data.map(el=>getPost()
    }),
    openAudit: controller(['_id'],function*({req}){
        const _id = req.params._id
        yield dao.updateOne({_id},{audit:true})
        return 'ok'
    }),
    closeAudit: controller(['_id'],function*({req}){
        const _id = req.params._id
        yield dao.updateOne({_id},{audit:false})
        return 'ok'
    }),
    openAccess: controller(['_id'],function*({req}){
        const _id = req.params._id
        yield dao.updateOne({_id},{accessTimeLimit:true})
        return 'ok'
    }),
    closeAccess: controller(['_id'],function*({req}){
        const _id = req.params._id
        yield dao.updateOne({_id},{accessTimeLimit:false})
        return 'ok'
    }),
    // getRecommend: controller(['subjectId'],function*({req}){
    //     return yield dao.find({subjectId:req.query.subjectId,recommendStatus:true})
    // }),
    // isRecommend
}
