const dao = require('./dao')
const {controller} = require('../../utils/controller')
const postDao = require('../post/dao')

module.exports = {
    create: controller(['_id'],function*({req,fail}){
        const userId = req.session.user_id
        // const userId = 'c80250ac61534b178ffb9d001f537da7'
        const postId = req.params._id
        const data = yield postDao.getPost(postId)
        if(data) {
            const favorited = yield dao.isFavorited({postId,userId})
            if(!favorited) {
                yield dao.create({postId,userId,createTime:Date.now()}) //增加
            }    
        }else{
            fail(30011,'post id dose not exist')
        }
        return 'ok'
    }),
    deleteOne: controller(['_id'],function*({req}){
        const userId = req.session.user_id
        const postId = req.params._id
        yield dao.deleteOne({postId,userId})
        return 'ok'
    }),
}
