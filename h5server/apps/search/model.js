const {getModelMethods} = require('../../utils/dao')
const mongoose = require("mongoose")
const dataModel = {
    userId: {type:String,required:true},
    text: {type:String,required:true},
    createTime: Number
}
const name = "search"
const schema = new mongoose.Schema(dataModel)
const model = mongoose.model(name, schema)
const methods = getModelMethods(model)
module.exports = methods

