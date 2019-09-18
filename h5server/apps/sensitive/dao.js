const methods = require('./model')
module.exports = {
    ...methods,
    *isContainerBannedWords(text){
        const words = yield methods.find()
        return words.some(word=>text.indexOf(word.text)!==-1)
    }
}


