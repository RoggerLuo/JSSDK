const {controller} = require('../../utils/controller')
const dao = require('./dao')
const userDao = require('../user/dao')
module.exports = {
    getAll: controller([],function*({req}){
        if(!req.session.isAdmin) return 'access denied'
        let {startIndex,pageSize} = req.query
        if(startIndex) startIndex = parseInt(startIndex)
        if(pageSize) { pageSize = parseInt(pageSize) }else { pageSize=10}

        const condition = {}
        if(req.query.subjectId) {
            condition.subjectId = req.query.subjectId
        }
        const [count,data] = yield [dao.count(condition),dao.find(condition,{skip:startIndex,limit:pageSize,sort:{createTime:-1}})]
        const users = yield data.map(el=>userDao.getUser(el.userId))
        data.forEach((el,ind)=>{
            el.userInfo = users[ind]
        })
        return {total:count,data}
    }),
    get: controller([],function*({req}){
        const subjectId = req.params.subjectId
        const data = yield dao.find({subjectId},{sort:{createTime:-1}})
        const users = yield data.map(el=>userDao.getUser(el.userId))
        users.forEach((el,ind)=>{
            el.start = data[ind].start
            el.end = data[ind].end
        })
        return users
    }),
    create: controller(['userId','subjectId'],function*({req}){
        const userId = req.session.user_id
        const banUserId = req.params.userId
        const subjectId = req.params.subjectId

        let {reason,username,start,end} = req.body
        
        const banUser = yield userDao.getUser(banUserId)
        if(banUser===null) { // 还未进入过论坛，user表中没有，//是从后台组织机构添加的
            const userParams = {
                user_id: banUserId,
                ...req.body
            } 
            yield userDao.updateEmployeeInfo(userParams) 
        }
        /* 
        avatar,nickname,mobile,name
        username: def.string,
        name: String        
    */
        if(!reason) {
            reason = ''
        }
        if(!username) {
            username = ''
        }
        const count = yield dao.count({userId:banUserId,subjectId})
        if(count>0) {
            yield dao.updateOne({userId:banUserId,subjectId},{username,start,end,reason,createTime:Date.now()})
        }else{
            yield dao.create({username,start,end,userId:banUserId,subjectId,reason,createTime:Date.now()})
        }
        return 'ok'
    }),
    del: controller(['userId','subjectId'],function*({req}){
        /* 
        post manager 权限
         */
        const userId = req.session.user_id
        const subjectId = req.params.subjectId
        const banUserId = req.params.userId
        yield dao.deleteOne({userId:banUserId,subjectId})
        return 'ok'
    }),
    
}
