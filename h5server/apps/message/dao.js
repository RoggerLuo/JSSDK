const {getDao,toObject} = require('../../utils/dao')
const dao = getDao(require('./model'))
module.exports = {
    ...dao,
    /* 评论帖子 回复评论 点赞帖子 点赞评论  一共5个地方用到 */
    *sendMessage({senderId,receiverId,postId,commentId,type,postTitle}){
        yield dao.create({senderId,receiverId,postId,commentId,type,createTime:Date.now(),read:false,postTitle})
        return 'ok'
    },
}


