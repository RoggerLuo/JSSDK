const mongoose = require("mongoose")
const def = require("../../utils/default_val").def
const prototype = {
    userId: def.string,
    postId: def.string,
    createTime: Number
}
schema = new mongoose.Schema(prototype)
mongoose.model("favorite", schema)

module.exports = "favorite"