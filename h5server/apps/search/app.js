const dao = require('./dao')
const {controller} = require('../../utils/controller')
const postApi = require('../post/api')
module.exports = {
    search: controller(['text'],function*({req}){
        const text = req.body.text
        const userId = req.session.user_id
        // const userId = 'c80250ac61534b178ffb9d001f537da7'
        const {subjectId,startIndex,pageSize} = req.query

        if(text && userId) { // 搜索历史
            const count = yield dao.count({text,userId})
            if(count>0){
                yield dao.updateOne({text,userId},{createTime:Date.now()})
            }else{
                yield dao.create({text,userId,createTime:Date.now()})
            }    
        }
        return yield postApi.search(text,userId,{subjectId,startIndex,pageSize})
    }),
    history: controller([],function*({req}){
        const userId = req.session.user_id
        const data = yield dao.find({userId},{sort:{createTime:-1},limit:10})
        data.forEach(el=>{
            delete el._id
            delete el.userId
            delete el.__v
        })
        return data
    })
}
