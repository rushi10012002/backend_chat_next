const conversationModel = require("../../model/chat/conversation")
const messageModel = require("../../model/chat/chat")
exports.getConversationMessages = async (req, res) => {
    try {
        const { conversationId } = req.params

        const result = await messageModel.find({ conversationId })
        return res.json({
            code: 1,
            message: "message get successfully",
            data: result
        })
    } catch (error) {
        return res.status(400).json({
            code: 0,
            message: error.message,
            stack: error.stack,
            data: null
        })
    }
}
exports.createConversationMessage = async (req, res) => {
    try {
        console.log(req.files);
        const result = await messageModel.create({
            message: req.body.message,
            type: req.body.type,
            imageUrl: req.body.type == "file" ? req.files.images[0].path : "",
            conversationId: req.body.conversationId,
            senderId: req.body.senderId
        });
        return res.json({
            code: 1,
            message: "message sent successfully",
            data: result
        })
    } catch (error) {
        return res.status(400).json({
            code: 0,
            message: error.message,
            stack: error.stack,
            data: null
        })
    }
}
exports.createConversation = async (req, res) => {
    try {
        const check = await conversationModel.findOne({
            conversation: req.body.conversation.sort()
        })
        console.log(check);
        if (check) {
            return res.json({
                code: 1,
                message: "conversation already exist",
                data: check
            })
        }
        const result = await conversationModel.create({
            lastMessage: "",
            type: "",
            conversation: req.body.conversation.sort()
        });
        return res.json({
            code: 1,
            message: "conversation created successfully",
            data: result
        })
    } catch (error) {
        return res.status(400).json({
            code: 0,
            message: error.message,
            stack: error.stack,
            data: null
        })
    }
}