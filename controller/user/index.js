const userModel = require("../../model/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
exports.resisterNewUser = async (req, res) => {
    try {
        console.log(req.files.images);
        const { userName, email, imageUrl, password } = req.body;
        const exist = await userModel.findOne({ email })
        if (exist) {
            return res.status(200).json({
                code: 0,
                message: "Email is already exist Please try with another email Id",
                data: null
            })
        }
        if (password == "") {
            return res.status(200).json({
                code: 0,
                message: "password is required",
                data: null
            })
        }
        const hash = await bcrypt.genSalt(12)
        const newPassword = await bcrypt.hash(password, hash)
        const result = await userModel.create({
            userName, email, imageUrl: req.files.images[0].path, password: newPassword
        });
        if (!result) {
            return res.status(200).json({
                code: 0,
                message: "internal server error",
                data: null
            })
        }
        return res.json({
            code: 1,
            message: "user resister successfully",
            data: result
        })

    } catch (error) {
        return res.status(200).json({
            code: 0,
            message: error.message,
            stack: error.stack,
            data: null
        })
    }
}
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const exist = await userModel.findOne({ email })
        if (!exist) {
            return res.status(200).json({
                code: 0,
                message: "user not exist",
                data: null
            })
        }
        const verify = await bcrypt.compare(password, exist.password)
        if (!verify) {
            return res.status(200).json({
                code: 0,
                message: "password is invalid",
                data: null
            })
        }
        const token = await jwt.sign({ _id: exist._id }, process.env.JWTPASSWORD)
        if (!token) {
            return res.status(200).json({
                code: 0,
                message: "internal server error",
                data: null
            })
        }

        return res.json({
            code: 1,
            message: "user login successfully",
            data: {
                userName: exist.userName,
                imageUrl: exist.imageUrl,
                token,
                email: exist.email,
                _id: exist._id
            }
        })

    } catch (error) {
        return res.status(200).json({
            code: 0,
            message: error.message,
            stack: error.stack,
            data: null
        })
    }
}
exports.getUserList = async (req, res) => {
    try {

        const result = await userModel.find()
        return res.json({
            code: 1,
            message: "user list",
            data: result
        })

    } catch (error) {
        return res.status(200).json({
            code: 0,
            message: error.message,
            stack: error.stack,
            data: null
        })
    }
}