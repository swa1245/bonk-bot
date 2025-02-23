const mongoose = require("mongoose");
mongoose.connect()

const UserSchema = new mongoose.Schema({
    name: String,
    password: String,
    privateKey: String,
    publicKey: String
})

const userModel =  mongoose.model("User", UserSchema)

module.exports = userModel