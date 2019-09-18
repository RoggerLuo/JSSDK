const mongoose = require("mongoose")
const prototype = {
    receiverId: {type:String,required:true},
    senderId: {type:String,required:false},
    createTime: Number,
    type: String, // 3种 thumb,reply,comment
    postId: String, // reply thumb
    commentId: String, // comment
    read: Boolean,
    postTitle: String
}
schema = new mongoose.Schema(prototype)
schema.index({receiverId: 1}) // 索引
mongoose.model("message", schema)
module.exports = "message"

