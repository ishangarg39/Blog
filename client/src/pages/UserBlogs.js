import axios from 'axios';
import { get } from 'mongoose';
import React, { useEffect, useState } from 'react'
import BlogCard from "../components/BlogCard"
function UserBlogs() {
    const [blogs, setBlogs] = useState([]);

    //get user Blogs
    const getUserBlogs = async () => {
        try {
            const userId = localStorage.getItem('userId');
            const { data } = await axios.get(`/api/blogs/user-blog/${userId}`);
            if (data?.success) {
                setBlogs(data?.userBlog?.blogs);
                console.log(blogs);
            }
        }

        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUserBlogs();
    }, [])
    console.log(blogs);
    return (
        <div>
            {blogs && blogs.length > 0 ? (blogs.map((blog => (
                <BlogCard
                    id={blog._id}
                    isUser={true}
                    key={blog._id}
                    title={blog.title}
                    description={blog.description}
                    image={blog.image}
                    username={blog.user.username}
                    time={blog.createdAt}
                />)
            ))) : (<h1>Please Write Blogs</h1>)}
        </div>
    )
}

export default UserBlogs
