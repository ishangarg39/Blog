const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "username is required"]
    },
    email: {
        type: String,
        required: [true, "email is requires"]
    },
    password: {
        type: String,
        required: [true, "password is required"]
    },
    blogs: [{
        type: mongoose.Types.ObjectId,
        ref: "Blog",

    }]
},
    {
        timestamps: true
    });

const userModel = mongoose.model("Users", userSchema);
module.exports = userModel;