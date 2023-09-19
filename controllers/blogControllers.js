const mongoose = require("mongoose");
const blogModel = require("../models/blogModels");
const userModel = require("../models/userModels");

//@desc get all blogs
//@route GET /all-blogs
//@access public
exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await blogModel.find({}).populate("user");
        if (!blogs) {
            return res.status(200).send({
                success: false,
                msg: "No Blogs Found"
            })
        }
        return res.status(200).send({
            success: true,
            msg: "Blog List",
            blogCount: blogs.length,
            blogs
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            msg: "Error in Handling Blogs",
            error
        })
    }
}


//@desc get one blog
//@route GET /get-blog
//@access public
exports.getBlog = async (req, res) => {
    try {
        const id = req.params.id;
        const blog = await blogModel.findById(id);
        if (!blog) {
            return res.status(404).send({
                success: false,
                msg: "Blog does not exist"
            })
        }
        return res.status(200).send({
            success: true,
            msg: "Blog found",
            blog
        })
    }
    catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            msg: "Error in getting blog",
            error
        })
    }
}

//@desc create blog
//@route POST /create-blog/:id
//@access public
exports.createBlog = async (req, res) => {
    try {
        const { title, description, image, user } = req.body;

        //validation of data
        if (!title || !description || !image) {
            return res.status(400).send({
                success: false,
                msg: "All fields are required"
            })
        }
        const existingUser = await userModel.findById(user);
        //validation 
        if (!existingUser) {
            return res.status(404).send({
                success: false,
                msg: "Cannot find User"
            })
        }
        const newBlog = new blogModel({ title, description, image, user });
        const session = await mongoose.startSession();
        session.startTransaction();
        await newBlog.save({ session });
        existingUser.blogs.push(newBlog);
        await existingUser.save({ session });
        await session.commitTransaction();
        await newBlog.save();
        return res.status(201).send({
            success: true,
            msg: "Blog Content",
            newBlog
        })
    }
    catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            msg: "Error in creating blog",
            error
        })
    }

}

//@desc update blog
//@route PUT /update-blog/:id
//@access public 
exports.updateBlog = async (req, res) => {
    try {
        const id = req.params.id;
        const { title, description, image } = req.body;
        const blog = await blogModel.findByIdAndUpdate(
            id,
            { ...req.body },
            { new: true });
        return res.status(200).send({
            success: true,
            msg: "Blog Updated",
            blog
        })
    }
    catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            msg: "Error in Updating blog",
            error
        })
    }

}

//@desc delete blog
//@route DELETE /delete-blog/:id
//@access public
exports.deleteBlog = async (req, res) => {
    try {
        const id = req.params.id;
        const blog = await blogModel.findByIdAndDelete(id).populate("user");
        await blog.user.blogs.pull(blog);
        await blog.user.save();

        if (!blog) {
            return res.status(404).send({
                success: false,
                msg: "Blog does not exist"
            })
        }
        return res.status(200).send({
            success: true,
            msg: "Blog deleted successfully",
            blog

        })
    }
    catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            msg: "Error in deleting blog",
            error
        })
    }

}


//@desc get user blogs from user id
//@route GET /user-blog/:id
//@access public
exports.userGetBlog = async (req, res) => {
    try {
        const userBlog = await userModel.findById(req.params.id).populate("blogs");
        if (!userBlog) {
            return res.status(404).send({
                success: false,
                msg: "user not found"
            });
        }
        return res.status(200).send({
            success: true,
            msg: "Blog Found",
            userBlog
        })

    }
    catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            msg: "Error in user blog",
            error
        })
    }
}