const dao = require('./dao')
const {controller} = require('../../utils/controller')
const commentDao = require('../comment/dao')
const postDao = require('../post/dao')
const {getAuthor} = require('../user/dao')
// const userId = 'c80250ac61534b178ffb9d001f537da7'
module.exports = {
    getList: controller([],function*({req}){
        // const userId = 'a1dc78ddbdec4f569207e1bdc438d410'
        const userId = req.session.user_id
        let {startIndex,pageSize} = req.query
        if(startIndex) startIndex = parseInt(startIndex)
        if(pageSize) { pageSize = parseInt(pageSize) }else { pageSize=10}
        const [count,data] = yield [dao.count({receiverId:userId}),dao.find({receiverId:userId},{limit:pageSize,skip:startIndex,sort:{createTime:-1}})]
        const authors = yield data.map(el=>getAuthor(el.senderId))
        const comments = yield data.map(el=>commentDao.findOne({_id:el.commentId}))
        const posts = yield data.map(el=>{
            // if(el.type.indexOf('audit')!==-1) {
            return postDao.getPost(el.postId)
            // }
            // return new Promise((resovle)=>resovle(null))
        })
        data.forEach((el,ind)=>{
            if(posts[ind]){
                el.postInfo = posts[ind]
            }
            el.senderInfo = authors[ind]
            el.commentInfo = comments[ind]
            delete el.senderId
            delete el.__v
            delete el.receiverId
        })
        return {count,data}
    }),
    markRead:controller(['_id'],function*({req}){
        const _id = req.params._id
        yield dao.updateOne({_id},{read:true})
        return 'ok'
    }),
    markReadAll:controller([],function*({req}){
        const userId = req.session.user_id
        yield dao.operations.update({receiverId:userId},{$set:{read:true}},{multi:true})
        return 'ok'
    }),
    unreadCount:controller([],function*({req}){
        const userId = req.session.user_id
        const count = yield dao.count({receiverId:userId,read:false})
        return count
    })
}
