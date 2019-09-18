const mongoose = require("mongoose")
const {getDao} = require('../../utils/dao')
const modelName = "adminAuth"
const prototype = {
    password: {type: String,required:true},
    username: {type: String,required:true}
}
mongoose.model(modelName, new mongoose.Schema(prototype))
module.exports = getDao(modelName)