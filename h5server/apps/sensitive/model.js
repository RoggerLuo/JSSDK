const mongoose = require("mongoose")
const def = require("../../utils/default_val").def
const {getDao} = require('../../utils/dao')
const modelName = "sensitive"
const prototype = {
    text:def.string,
    createTime:def.number,
}
mongoose.model(modelName, new mongoose.Schema(prototype))
module.exports = getDao(modelName)