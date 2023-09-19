import axios from 'axios';
import React, { useEffect, useState } from 'react'
import BlogCard from '../components/BlogCard';

export default function Blogs() {
    const [blogs, setBlogs] = useState([]);

    //get Blogs
    const getAllBlogs = async () => {
        try {
            const { data } = await axios.get('/api/blogs/all-blogs')
            console.log(data);
            if (data?.success) {
                setBlogs(data?.blogs);
                console.log(data);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllBlogs();
    }, [])
    return (

        <div>

            {blogs && blogs.map((blog => (
                <BlogCard
                    id={blog?._id}
                    isUser={localStorage.getItem('userId') === blog?.user?._id}
                    key={blog?._id}
                    title={blog?.title}
                    description={blog?.description}
                    image={blog?.image}
                    username={blog?.user.username}
                    time={blog?.createdAt}
                />
            )))}

        </div>
    )
}
