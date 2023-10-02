const express = require("express");
const { createConversation, createConversationMessage, getConversationMessages } = require("../../controller/chat");
const router = express.Router();
const fs = require('fs')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!fs.existsSync("Upload")) {
            fs.mkdirSync("Upload")
        }
        if (!fs.existsSync("Upload/images")) {
            fs.mkdirSync("Upload/images")
        }
        cb(null, "Upload/images")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})
const Upload = multer({
    storage: storage
})
router.post("/conversation", createConversation)
router.post("/message", createConversationMessage)
router.post("/message-file", Upload.fields([{
    name: "images",
    maxCount: 1
}]), createConversationMessage)
router.get("/get-message-list/:conversationId", getConversationMessages)

module.exports = router;