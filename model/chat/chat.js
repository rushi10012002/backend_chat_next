const mongoose = require("mongoose");
const schemaOptions = {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};
const messageModel = mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: false
    },
    senderId: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    conversationId: {
        type: mongoose.Schema.ObjectId,
        required: true
    },


}, schemaOptions);
module.exports = mongoose.model("tbl_messages", messageModel);