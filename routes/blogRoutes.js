const express = require("express");
const { getAllBlogs, getBlog, createBlog, updateBlog, deleteBlog, userGetBlog } = require("../controllers/blogControllers");
const router = express.Router();

router.get("/all-blogs", getAllBlogs);
router.get("/get-blog/:id", getBlog);
router.get("/user-blog/:id", userGetBlog);

router.post("/create-blog", createBlog);
router.put("/update-blog/:id", updateBlog);
router.delete("/delete-blog/:id", deleteBlog);
module.exports = router;
