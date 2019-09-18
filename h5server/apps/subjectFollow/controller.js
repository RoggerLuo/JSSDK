const dao = require('./dao');
const {controller} = require('../../utils/controller')
const {updateFollowedCount,getSubject} = require('../subject/dao')
/* error code basic 1 */
module.exports = {
    follow: controller(['_id'],function*({req,fail}){
        const userId = req.session.user_id
        const subjectId = req.params._id
        const subj = yield getSubject(subjectId,userId)
        if(!subj){
            fail(110,'subject id does not exist')
        }
        const followedCount = yield dao.count({subjectId,userId})
        if(followedCount===0) {
            yield dao.create({subjectId,userId,createTime:Date.now()}) 
            const followedCount = yield dao.count({subjectId})
            yield updateFollowedCount(subjectId,followedCount) 
        }
        return 'ok'
    }),
    deleteOne: controller([ '_id' ],function*({req}){
        const userId = req.session.user_id
        const subjectId = req.params._id
        const subj = yield getSubject(subjectId,userId)
        if(!subj){
            fail(110,'subject id does not exist')
        }
		const res = yield dao.deleteOne({subjectId:req.params._id})
        return res
    })
}
