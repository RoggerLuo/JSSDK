const co = require('co')
// const mongoose = require('mongoose')
const HandleRes = require('../../utils/handle_res')
const Validate = require('../../utils/validate')
const dao = require('./dao')
const {controller} = require('../../utils/controller')
const {updateThumb,getAuthorId} = require('../comment/dao')

const {getAuthor} = require('../user/dao')
const {sendMessage} = require('../message/dao')

// const userId = 'c80250ac61534b178ffb9d001f537da7'
module.exports = {
	getList(req, res){
        const client = HandleRes.getResFn(res)    
        co(function*(){
            yield Validate.isParamsLost(['subjectId'], req.query)
            const data = yield dao.find(req.query)
            client.success(data)
        }).catch(client.fail)
    },
    create: controller(['commentId'],function*({req, res}){
        const userId = req.session.user_id
        const commentId = req.params.commentId
        const thumbed = yield dao.isThumbed({commentId,userId})
        if(!thumbed) {
            yield dao.create({commentId,userId}) //增加点赞
            const thumbNumber = yield dao.count({commentId})
            yield updateThumb(commentId,thumbNumber) //更新冗余字段    
            const receiverId = yield getAuthorId(commentId)
            yield sendMessage({senderId:userId,receiverId,commentId,postId:req.params.postId,type:'thumb-comment'})
        }
        return 'ok'
    }),
    deleteOne(req, res){
        const client = HandleRes.getResFn(res)
        co(function*(){
            let rParams = [ 'commentId' ]
            yield Validate.isParamsLost(rParams, req.params)
            yield dao.deleteOne(req.params)
            client.success('ok')
        }).catch(client.fail)
    },
}