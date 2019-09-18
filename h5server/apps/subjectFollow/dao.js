const {getDao,toObject} = require('../../utils/dao')
const dao = getDao(require('./model'))
module.exports = {
    ...dao,
    *isFollowed({subjectId,userId}){
        const count = yield dao.count({subjectId,userId})
        return count > 0
    },    
    *getMyFollowList(userId){
        return yield dao.find({userId}).then(list=>list.map(el=>el.subjectId))
    }
}

