const mongoose = require("mongoose");
const schemaOptions = {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};
const userModel = mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },

}, schemaOptions);
module.exports = mongoose.model("tbl_users", userModel);