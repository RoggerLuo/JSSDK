const mongoose = require("mongoose")
const def = require("../../utils/default_val").def
const {getDao} = require('../../utils/dao')
const modelName = "post"
const prototype = {
    title:def.string,
    content:def.string,
    createTime:def.number,
    images:[],
    subjectId: String,
    // {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'subject'
    // },//def.string,
    recommendStatus: Boolean,
    topStatus: Boolean,
    authorId:def.string,
    readNumber:def.number,
    thumbNumber:def.number,
    replyNumber:def.number,
    auditStatus: Boolean
}
mongoose.model(modelName, new mongoose.Schema(prototype))
module.exports = getDao(modelName)