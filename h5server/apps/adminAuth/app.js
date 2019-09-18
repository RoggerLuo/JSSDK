const md5 = require('js-md5');
const dao = require('./dao')
const {controller} = require('../../utils/controller')
// 初始化数据
dao.find().then(val=>{
    if(val.length === 0) {
        dao.create({username:'superadmin',password:'admin'})
    }
})
module.exports = {
    login: controller(['username','password'],function*({req,fail}){
        const {username,password} = req.body
        if(isLoggedIn(req)){
            req.session.touch()
            return req.session
        }else{
            const account = yield dao.findOne({username})
            if(password !== md5(account.password) ) {
                fail(1110,'username or password error')
            }
            yield generateSession(req,username)
            console.log(' ********* login成功 ********* ')
            return 'ok'
        }
    }),
    logout: controller([],function*({req}){
        delete req.session.isAdmin 
        delete req.session.username
        delete req.session.user_id         
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
        req.session.isAdmin &&
		req.session.username === req.body.username
	) {
        return true
    }
    return false
}
function generateSession(req,username){
    return new Promise((resolve)=>{
        req.session.regenerate(function(e) {
            if (e) {
                console.error('重新生成session失败')
                console.error(e)
                throw Error('e_session')
            } else {
                req.session.username = username || ""
                req.session.isAdmin = true
                console.log(' ********* session生成成功 ********* ')
                resolve()
            }
        })
    })
}
