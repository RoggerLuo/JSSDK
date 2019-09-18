const {controller} = require('../../utils/controller')
const {getAtworkInstance} = require('../../utils/atwork_tool')
const dao = require('./dao')
const config = require('../../config')
module.exports = {
    search: controller(['name'],function*({req}){
        const text = req.query.name
        const userId = req.session.user_id
        // const userId = 'c80250ac61534b178ffb9d001f537da7'
        let {startIndex,pageSize} = req.query
        if(!text) return null

        const reg = RegExp(text,"i")
        const condition = {nickname:{$regex:reg}} //{$or:[,{title:{$regex:reg}}]}
        if(startIndex) startIndex = parseInt(startIndex)
        if(pageSize) { pageSize = parseInt(pageSize) }else { pageSize=10}
        return yield dao.find(condition,{skip:startIndex,limit:pageSize})
    })    
}
