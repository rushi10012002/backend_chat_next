const express = require("express");
const { resisterNewUser, loginUser, getUserList } = require("../../controller/user");
const router = express.Router();
const path = require('path')
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
router.post("/resister", Upload.fields([{
    name: "images",
    maxCount: 1
}]), resisterNewUser)
router.post("/login", loginUser)
router.get("/user-list", getUserList)

module.exports = router;