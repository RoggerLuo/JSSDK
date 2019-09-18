const dao = require('./model')
const getUsers = (condition={}) => {
	console.log('condition', condition)
	const sort = {_id: -1}
	return ops.find(condition).sort(sort).exec()
}
const updateUser = (params) => {
	const condition = {userId:params.userId}
	const update = {"$set": params}
	return ops.findOneAndUpdate(condition, update, {new: true}).exec() 
}
const create = params => ops.insertOne({...params})
module.exports = {
    ...dao,
    * isBannedUser(userId,subjectId){
        const entry = yield dao.findOne({userId,subjectId})
        
        if(entry && Date.now() > entry.start && Date.now() < entry.end){
            return true
        }
        return false
    },
    * updateEmployeeInfo(params){
        params = {...params}
        params.userId = params.user_id
        delete params.user_id
        const len = yield getUsers({userId:params.userId}).then(val=>val.length)
        if(len===0) {
            yield create(params)
        }else{
            yield updateUser(params)
        }
    },
    * getUsers(userId){
        const users = yield dao.find({userId})
        if(users.length>0){
            const userInfo = users[0].toObject()
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
