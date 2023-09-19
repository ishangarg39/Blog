const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "title is required"]
    },
    description: {
        type: String,
        required: [true, "description is requires"]
    },
    image: {
        type: String,
        required: [true, "image is required"]
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "Users",
        required: [true, "user id is required"]
    }
},
    {
        timestamps: true
    });

const blogModel = mongoose.model("Blog", blogSchema);
module.exports = blogModel;