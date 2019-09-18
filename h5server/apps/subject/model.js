const mongoose = require("mongoose")
const def = require("../../utils/default_val").def
const {getDao} = require('../../utils/dao')
const modelName = "subject"
const prototype = {
    name:{type:String,required:true},
    popularity:def.number,
    image:def.string,
    postCount:Number,
    followedCount:Number,
    audit: Boolean,
    accessTimeLimit: Boolean,
    managersVisible: Boolean,
    managers:[],
    startTime:Number,
    endTime:Number,
    orderIndex: Number,
    onshelf: Boolean
}
mongoose.model(modelName, new mongoose.Schema(prototype))
module.exports = getDao(modelName)