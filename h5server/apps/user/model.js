const mongoose = require("mongoose")
const def = require("../../utils/default_val").def
const {getDao} = require('../../utils/dao')
const modelName = "user"
const prototype = {
    userId: def.string,
    avatar: def.string,
    nickname: def.string,
    mobile: def.string,
    username: def.string,
    name: String
}
mongoose.model(modelName, new mongoose.Schema(prototype))
module.exports = getDao(modelName)
