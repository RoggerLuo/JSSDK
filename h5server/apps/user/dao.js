const dao = require('./model')
const getUsers = (condition={}) => {
	// console.log('condition', condition)
	// const sort = {_id: -1}
	return dao.find(condition)//.sort(sort).exec()
}
const updateUser = (params) => {
	const condition = {userId:params.userId}
	return dao.updateOne(condition, params) 
}
const create = params => dao.create({...params})
module.exports = {
    ...dao,
    * updateEmployeeInfo(params){
        params = {...params}
        params.userId = params.user_id
        delete params.user_id
        const len = yield dao.count({userId:params.userId})
        if(len===0) {
            yield create(params)
        }else{
            yield updateUser(params)
        }
    },
    * getUser(userId){
        const users = yield getUsers({userId})
        if(users.length>0){
            const userInfo = users[0]//[0].toObject()
            delete userInfo._id
            delete userInfo.__v
            delete userInfo.username
            delete userInfo.mobile
            return userInfo
        }else{
            return null
        }
    },
    * getAuthor(userId){
        const users = yield getUsers({userId})
        if(users.length>0){
            const userInfo = users[0]//[0].toObject()
            delete userInfo._id
            delete userInfo.__v
            delete userInfo.username
            delete userInfo.mobile
            return userInfo
        }else{
            return null
        }
    }
}
