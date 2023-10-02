const mongoose = require("mongoose");
const schemaOptions = {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};
const conversationModel = mongoose.Schema({
    lastMessage: {
        type: String,
        required: false
    },
    type: {
        type: String,
        required: false
    },
    conversation: {
        type: Array,
        required: true
    },


}, schemaOptions);
module.exports = mongoose.model("tbl_conversation", conversationModel);