import React, { useState } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
export default function SignUp() {
    const navigate = useNavigate()
    const [input, setInput] = useState({
        username: "",
        email: "",
        password: ""
    }
    )
    const handleChange = (event) => {
        setInput((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/user/signup', {
                username: input.username,
                email: input.email,
                password: input.password
            })
            console.log(data)
            if (data.success) {
                alert("User Registered Successfully");
                console.log("sucess")
                navigate("/login");
            }
        }
        catch (error) {
            console.log(error);
        }
        //console.log(input);
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Box maxWidth={450}
                    display='flex'
                    flexDirection={"column"}
                    alignItems={'center'}
                    justifyContent={"center"}
                    margin={"auto"}
                    marginTop={5}
                    boxShadow={"10px 10px 20px #ccc"}
                    padding={3}
                    borderRadius={5}

                >
                    <Typography variant='h4'
                        padding={3}
                        textTransform={'uppercase'}
                        textAlign={"center"}>SignUp</Typography>
                    <TextField placeholder='Username'
                        name='username'
                        value={input.username}
                        required
                        onChange={(e) => { handleChange(e) }}
                        margin='normal'
                        type='text' />
                    <TextField placeholder='email'
                        name='email'
                        value={input.email}
                        required
                        onChange={(e) => { handleChange(e) }}
                        margin='normal'
                        type='email' />
                    <TextField placeholder='password'
                        name='password'
                        value={input.password}
                        required
                        onChange={(e) => { handleChange(e) }}
                        margin='normal'
                        type='password' />
                    <Button type='submit'
                        variant='contained'
                        sx={{ borderRadius: 3, marginTop: "3px", bgcolor: '#9c2caf' }}>Submit</Button>
                    <Button
                        onClick={() => { navigate("/login") }}
                        sx={{ color: "#9c2caf" }}>Already Registered? Please Login</Button>
                </Box>
            </form>
        </div>
    )
}
