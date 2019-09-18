const {controller} = require('../../utils/controller')
// const userId = 'c80250ac61534b178ffb9d001f537da7'
const postDao = require('../post/dao')
const followDao = require('../subjectFollow/dao')
const subjectDao = require('../subject/dao')
const favoriteDao = require('../favorite/dao')
module.exports = {
    getCount: controller([],function*({req}){
        const userId = req.session.user_id
        const postCount = yield postDao.count({authorId:userId})
        const followCount = yield followDao.count({userId})
        // const favoriteCount = yield favoriteDao.count({userId})
        
        const favoriteCountdata = yield favoriteDao.find({userId},{sort:{createTime:-1}})
        const _data = yield favoriteCountdata.map(el=>postDao.getPost(el.postId))
        
        const favoriteCount = _data.filter(el=>el!==null).length
        return {postCount,followCount,favoriteCount}
    }),
    getMyPost: controller([],function*({req}){
        const userId = req.session.user_id
        let {startIndex,pageSize} = req.query
        if(startIndex) startIndex = parseInt(startIndex)
        if(pageSize) { pageSize = parseInt(pageSize) }else { pageSize=10}
        // 我的帖子，没有板块信息，也没有作者信息
        // 同时未审核的帖子也会显示 
        return yield postDao.find({authorId:userId},{sort:{createTime:-1,},limit:pageSize,skip:startIndex}) //
    }),
    getMyFollow: controller([],function*({req}){
        const userId = req.session.user_id
        let {startIndex,pageSize} = req.query
        if(startIndex) startIndex = parseInt(startIndex)
        if(pageSize) { pageSize = parseInt(pageSize) }else { pageSize=10}
        const [count,data] = yield [followDao.count({userId}),followDao.find({userId},{sort:{createTime:-1,},skip:startIndex,limit:pageSize})] //,
        return yield data.map(el=>subjectDao.getSubject(el.subjectId,userId))
    }),
    getMyFavorite: controller([],function*({req}){
        const userId = req.session.user_id
        let {startIndex,pageSize} = req.query
        if(startIndex) startIndex = parseInt(startIndex)
        if(pageSize) { pageSize = parseInt(pageSize) }else { pageSize=10}
        const [count,data] = yield [favoriteDao.count({userId}),favoriteDao.find({userId},{sort:{createTime:-1},skip:startIndex,limit:pageSize})] //,
        const _data = yield data.map(el=>postDao.getPost(el.postId))
        return _data.filter(el=>el!==null)
    }),
}
