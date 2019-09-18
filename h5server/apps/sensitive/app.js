const dao = require('./dao')
const {controller} = require('../../utils/controller')
module.exports = {
    getList: controller([],function*({req,fail}){
        if(!req.session.isAdmin) {
            fail(40004,'access deny')
            return
        }

        // 权限控制
        let {startIndex,pageSize,text} = req.query
        if(startIndex) startIndex = parseInt(startIndex)
        if(pageSize) { pageSize = parseInt(pageSize) }else { pageSize=10}
        const condition = {}
        if(text) condition.text = text
        const [total,data] = yield [dao.count(condition),dao.find(condition,{skip:startIndex,limit:pageSize,sort:{createTime:-1}})]
        return {total,data}
    }),
    create: controller(['words'],function*({req}){
        if(!req.session.isAdmin) {
            fail(40004,'access deny')
            return
        }

        const userId = req.session.user_id
        // 权限控制
        // const userId = 'c80250ac61534b178ffb9d001f537da7'
        const words = req.body.words
        const counts = yield words.map(el=>dao.count({text:el}))
        const _words = words.filter((el,ind)=>counts[ind]===0)
        const createTime = Date.now()
        yield _words.map(text=>dao.create({text,createTime}))
        return 'ok'
    }),
    updateOne: controller(['_id'],function*({req,fail}){
        if(!req.session.isAdmin) {
            fail(40004,'access deny')
            return
        }

        const userId = req.session.user_id
        // 权限控制
        const _id = req.params._id
        const text = req.body.word
        yield dao.updateOne({_id},{text})
        return 'ok'
    }),
    deleteOne: controller(['_id'],function*({req,fail}){
        if(!req.session.isAdmin) {
            fail(40004,'access deny')
            return
        }

        const userId = req.session.user_id
        // 权限控制
        const _id = req.params._id
        yield dao.deleteOne({_id})
        return 'ok'
    }),
}
