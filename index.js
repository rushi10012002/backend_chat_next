const express = require('express')
const app = express()

const path = require('path')
const cors = require("cors")
const dotenv = require("dotenv")
const user = require("./route/user")
const chat = require("./route/chat")
const db = require('./config/database')
const socket = require('socket.io')
dotenv.config({
    path: "./config/.env"
})
const port = process.env.PORT;
app.use("/api/v1/Upload", express.static(path.join(__dirname, "Upload")))
app.use(cors())
app.use(express.json())
db()
app.use('/api/v1/user', user)
app.use('/api/v1/chat', chat)

const server = app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
const io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        Credential: true
    }
})
global.onlineUser = new Map()
io.on("connection", (socket) => {
    global.chatSocket = socket
    console.log(socket.id);
    socket.on("add-user", (userId) => {
        console.log(userId);
        onlineUser.set(userId, socket.id)
    });

    socket.on("send-message", (data) => {
        console.log(data);
        const sendSocket = onlineUser.get(data.receiver);
        if (sendSocket) {
            socket.to(sendSocket).emit("receive-message", data)
        }
    })
})

// socket.local.emit("online-user", onlineUser);

// const valuesArray = Array.from(onlineUser.values());

// const valuesObject = Object.fromEntries(valuesArray.map(value => [value, value]));
// console.log(valuesObject);