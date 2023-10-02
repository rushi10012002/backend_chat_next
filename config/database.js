const mongoose = require("mongoose");
const db = async () => {
    await mongoose.connect(process.env.DATABASE_URL).then(() => {
        console.log("Database connected");
    }).catch(() => {
        console.log("Database connection has failed");
    })
}
module.exports = db;