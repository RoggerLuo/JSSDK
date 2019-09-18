const {getDao} = require('../../utils/dao')
const dao = getDao(require('./model'))
module.exports = {
    ...dao,
    * isFavorited({postId,userId}){
        const count = yield dao.count({postId,userId})
        return count > 0
    }    
}


