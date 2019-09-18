const {getDao,toObject} = require('../../utils/dao')
const dao = getDao(require('./model'))
module.exports = {
    ...dao,
    * isThumbed({commentId,userId}){
        const count = yield dao.count({commentId,userId})
        return count > 0
    }
    
}


