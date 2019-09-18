const {getDao,toObject} = require('../../utils/dao')
const dao = getDao(require('./model'))
const {getAuthor} = require('../user/dao')
module.exports = {
    ...dao,
    * getAuthorId(commentId){
        return yield dao.findOne({_id:commentId}).then(one=>one.authorId)
    },
    * updateThumb(commentId,thumbNumber){
        yield dao.updateOne({_id:commentId},{thumbCount:thumbNumber})
    },
    * updateReplyNumber(commentId){
        const count = yield dao.count({commentId})
        yield dao.updateOne({_id:commentId}, {replyNumber:count})
    },
    * getSeveralRepliesFromHead(commentId){
        const sort = {createTime: 1}
        const replies = yield dao.operations.find({commentId},null,{limit: 2}).sort(sort).exec().then(toObject)
        const authors = yield replies.map(el=>getAuthor(el.authorId))
        const repliers = yield replies.map(el=>getAuthor(el.replyUserId))

        replies.forEach((el,ind)=>{
            el.authorInfo = authors[ind]
            el.replyUserInfo = repliers[ind]

        })
        return replies
    }
}
