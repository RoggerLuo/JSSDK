const dao = require('./dao')
const {controller} = require('../../utils/controller')
const {updateThumb,getAuthorId} = require('../post/dao')
const {sendMessage} = require('../message/dao')
// const userId = 'c80250ac61534b178ffb9d001f537da7'
module.exports = {
    create: controller(['_id'],function*({req}){
        const userId = req.session.user_id
        // const userId = 'c80250ac61534b178ffb9d001f537da7'
        const postId = req.params._id
        const thumbed = yield dao.isThumbed({postId,userId})
        if(!thumbed) {
            yield dao.create({postId,userId}) //增加点赞
            const thumbNumber = yield dao.count({postId})
            yield updateThumb(postId,thumbNumber) //更新冗余字段
            const receiverId = yield getAuthorId(postId)
            yield sendMessage({senderId:userId,receiverId,postId,type:'thumb'})    
        }
        return 'ok'
    }),
    deleteOne: controller(['_id'],function*({req}){
        const userId = req.session.user_id
        // const userId = 'c80250ac61534b178ffb9d001f537da7'
        const postId = req.params._id
        yield dao.deleteOne({postId,userId})

        const thumbNumber = yield dao.count({postId})
        yield updateThumb(postId,thumbNumber) //更新冗余字段

        return 'ok'
    }),
}
