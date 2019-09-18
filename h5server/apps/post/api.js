const dao = require('./model')
const authDao = require('../user/dao')
const thumbDao = require('../thumb/dao')
// const {getSubject} = require('../subject/app')
const {getAuthor} = require('../user/dao')
// const searchDao = require('../search/dao')
const favorDao = require('../favorite/dao')
function*getList({condition,startIndex,pageSize,userId}){
    const [count,data] = yield [dao.count(condition),dao.find(condition,{skip:startIndex,limit:pageSize,sort:{createTime:-1}})]
    const authors = yield data.map(el=>getAuthor(el.authorId))
    const thumbStatus = yield data.map(el=>thumbDao.isThumbed({postId:el._id,userId}))
    const favoriteStatus = yield data.map(el=>favorDao.isFavorited({postId:el._id,userId}))

    data.forEach((el,ind)=>{
        el.thumbStatus = thumbStatus[ind]
        el.authorInfo = authors[ind]
        el.recommendStatus = !!el.recommendStatus
        el.favoriteStatus = favoriteStatus[ind]
        delete el.authorid
    })
    return {total:count,data}
}
module.exports = {
    ...dao,
    *updateReplyNumber(postId,number){
        yield dao.updateOne({_id:postId},{replyNumber:number})
    },
    getList,
    *search(text,userId,{subjectId,startIndex,pageSize}){
        if(text) {
            const reg = RegExp(text,"i")
            const condition = {$or:[{content:{$regex:reg}},{title:{$regex:reg}}]}
            if(subjectId) {
                condition.subjectId = subjectId
            }
            condition.auditStatus = true
            if(startIndex) startIndex = parseInt(startIndex)
            if(pageSize) { pageSize = parseInt(pageSize) }else { pageSize=10}
            return yield getList({condition,startIndex,pageSize,userId})
            
        }else{
            return {total:0,data:[]}
        }
    },
    updateThumb:(_id,thumbNumber) => dao.updateOne({_id},{thumbNumber}),
    getSubjectId: postId => dao.findOne({_id:postId}).then(data=>data.subjectId),
    getAuthorId: postId => dao.findOne({_id:postId}).then(data=>data.authorId),
}
