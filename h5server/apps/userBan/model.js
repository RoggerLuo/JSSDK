const mongoose = require("mongoose")
const {getDao} = require('../../utils/dao')
const modelName = "userBan"
const prototype = {
    userId: {type:String,required:true},
    username:String,
    start: Number,
    end: Number,
    subjectId: {type:String,required:true},
    reason: String,
    createTime:Number
}
mongoose.model(modelName, new mongoose.Schema(prototype))
module.exports = getDao(modelName)
