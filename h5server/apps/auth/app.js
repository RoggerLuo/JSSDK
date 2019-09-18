const {controller} = require('../../utils/controller')
const {getAtworkInstance} = require('../../utils/atwork_tool')
const {updateEmployeeInfo} = require('../user/dao')
const config = require('../../config')
module.exports = {
    //'user_id','domain_id','org_id','ticket'
    login: controller([],function*({req}){
        if(req.body.test) {
            const employeeInfo = {    
                user_id:"c80250ac61534b178ffb9d001f537da7",
                avatar:'Z3JvdXAxL00wMC8wOC82MC9DaTh4Q0ZxbmpFLUFOVUZ1QUFKYWdHaGFCcU00MTkudG1w',
                org_id:'e63bf7a5-ce40-4c03-bd08-3204d33034ac',
                nickname:'罗捷',
                name:'罗捷',
                mobile:'123456789',
                domain_id:'workplus'
            }
            yield generateSession(req,employeeInfo)
            return req.session
        }
        
        if(isLoggedIn(req)){
            req.session.touch()
            return req.session
        }else{
            const employeeInfo = yield getEmployeeInfo(req.body)
            console.log(' ********* 验证完之后拿回的用户信息 ********* ', employeeInfo)
            yield updateEmployeeInfo(employeeInfo)
            yield generateSession(req,employeeInfo)
            console.log(' ********* login成功 ********* ')
            return req.session
        }
    }),
    logout: controller([],function*({req}){
        delete req.session.user_id 
        delete req.session.domain_id 
        delete req.session.org_id 
        return 'log_out'
    }),
    retrieveInfo: controller([],function*({req, fail}){
        if(isLoggedIn(req)){
            req.session.touch() 
            return req.session
        }else{
            fail(999,'log_out')
        }
    })
}
function isLoggedIn(req) { // 如果是相同域和组织
    if (
        req.session.user_id &&
		req.session.user_id === req.body.user_id &&
		req.session.domain_id === req.body.domain_id &&
		req.session.org_id === req.body.org_id
	) {
        return true
    }
    return false
}
function getEmployeeInfo({user_id,ticket}) {
    return getAtworkInstance(config.ctx).then(atworkInstance => {
        return atworkInstance.validateUserTicket(ticket,user_id)
    })
}
function generateSession(req,employeeInfo){
    return new Promise((resolve)=>{
        req.session.regenerate(function(e) {
            if (e) {
                console.error('重新生成session失败')
                console.error(e)
                throw Error('e_session')
            } else {
                req.session.user_id = employeeInfo.user_id || ""
                req.session.domain_id = employeeInfo.domain_id || ""
                req.session.org_id = employeeInfo.org_id || ""
                req.session.avatar = employeeInfo.avatar || ""
                req.session.nickname = employeeInfo.nickname || ""
                req.session.mobile = employeeInfo.mobile || ""
                console.log(' ********* session生成成功 ********* ')
                resolve()
            }
        })
    })
}
