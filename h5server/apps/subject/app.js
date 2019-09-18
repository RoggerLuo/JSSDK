const co = require('co');
const dao = require('./dao');
const {controller} = require('../../utils/controller')
const {isFollowed} = require('../subjectFollow/dao')
const userDao = require('../user/dao')
// const userId = 'c80250ac61534b178ffb9d001f537da7'
module.exports = {
    modifyTime: controller(['id'],function*({req,fail}){
        const userId = req.session.user_id
        const _id = req.params.id
        const startTime = req.query.start
        const endTime = req.query.end
        if(startTime) {
            yield dao.updateOne({_id},{startTime})
        }
        if(endTime) {
            yield dao.updateOne({_id},{endTime})
        }
        return 'ok'
    }),
    *getSubject(subjectId,userId) { // userId用来判断是否关注
        return yield dao.getSubject(subjectId,userId)
    },
    modifyOne: controller(['subjectId'],function*({req,fail}){
        if(!req.session.isAdmin) {
            fail(40004,'access deny')
            return
        }
        yield dao.updateOne({_id:req.params.subjectId},{...req.body})
        return 'ok'
    }),
    onshelf: controller(['subjectId'],function*({req,fail}){
        if(!req.session.isAdmin) {
            fail(40004,'access deny')
            return
        }

        yield dao.updateOne({_id:req.params.subjectId},{onshelf:true})
        return 'ok'
    }),
    offshelf: controller(['subjectId'],function*({req,fail}){
        if(!req.session.isAdmin) {
            fail(40004,'access deny')
            return
        }
        yield dao.updateOne({_id:req.params.subjectId},{onshelf:false})
        return 'ok'
    }),
    getOne: controller(['subjectId'],function*({req,fail}){
        const userId = req.session.user_id
        return yield dao.getSubject(req.params.subjectId,userId)
    }),
	getList: controller([],function*({req,fail}){
        const userId = req.session.user_id
        let data
        if(req.session.isAdmin) { // 管理后台操作，需要看到所有数据
            data = yield dao.find({},{sort:{orderIndex:-1}})
        }else{
            data = yield dao.find({onshelf:true},{sort:{orderIndex:-1}})
        }
        const isFollowedStatus = yield data.map(el=>isFollowed({subjectId:el._id,userId}))
        data.forEach((el,ind)=>{
            el.followedStatus = isFollowedStatus[ind]
            el.audit = !!el.audit 
            el.isManager = el.managers.map(el=>el.user_id).indexOf(userId) !== -1
        })
        return data
    }),
	create: controller(['name'],function*({req,fail}){
        if(!req.session.isAdmin) {
            fail(40004,'access deny')
            return
        }

        let entry = yield dao.create({...req.body,accessTimeLimit:req.body.accessTimeLimit||false,audit:req.body.audit||false})
        return {subjectKey: entry._id}
    }),
    deleteOne: controller([ '_id' ],function*({req,fail}){
        if(!req.session.isAdmin) {
            fail(40004,'access deny')
            return
        }

		const res = yield dao.deleteOne({_id:req.params._id})
        return res
    }),
}
