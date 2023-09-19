import { Box, Button, InputLabel, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

export default function BlogDetails() {
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();
    const [blog, setBlog] = useState();
    const [input, setInput] = useState({});
    const id = useParams().id;

    const handleChange = (event) => {
        setInput((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`/api/blogs/update-blog/${id}`, {
                title: input.title,
                description: input.description,
                image: input.image,
                user: userId
            })
            console.log(data)
            if (data.success) {
                alert("Blog Updated Successfully");
                console.log("sucess")
                navigate("/my-blogs");
            }
        }
        catch (error) {
            console.log(error);
        }
        //console.log(input);
    }
    const getBlogDetails = async () => {
        try {
            const { data } = await axios.get(`/api/blogs/get-blog/${id}`);
            if (data?.success) {
                setBlog(data?.blog);
                setInput({
                    title: data?.blog.title,
                    description: data?.blog.description,
                    image: data?.blog.image
                })
                console.log("blog");
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getBlogDetails();

    }, [id])

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Box width={"50%"}
                    border={3}
                    borderRadius={10}
                    padding={3}
                    margin="auto"
                    boxShadow={"10px 10px 20px #ccc"}
                    display="flex"
                    flexDirection={"column"}
                    marginTop="30px">

                    <Typography variant='h2'
                        textAlign={"center"}
                        fontWeight={"bold"}
                        padding={3}
                        color={"gray"}> Update a Post</Typography>

                    <InputLabel sx={{ mb: 1, mt: 2, fontSize: '24px', fontWeight: "bold" }}>Title</InputLabel>
                    <TextField required name='title' value={input.title} onChange={handleChange} margin='normal' variant='outlined' ></TextField>

                    <InputLabel sx={{ mb: 1, mt: 2, fontSize: '24px', fontWeight: "bold" }}>Description</InputLabel>
                    <TextField required name='description' value={input.description} onChange={handleChange} margin='normal' variant='outlined' ></TextField>

                    <InputLabel sx={{ mb: 1, mt: 2, fontSize: '24px', fontWeight: "bold" }}>Image Url</InputLabel>
                    <TextField required name='image' value={input.image} onChange={handleChange} margin='normal' variant='outlined' ></TextField>

                    <Button type='submit'
                        variant='contained'
                        sx={{ borderRadius: 3, marginTop: "3px", bgcolor: '#9c2caf' }}>Update</Button>
                </Box>
            </form>
        </div>
    )
}
