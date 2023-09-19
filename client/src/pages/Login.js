import React, { useState } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authActions } from '../redux/store';
export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [input, setInput] = useState({
        email: "",
        password: ""
    }
    )
    //Submit Button Disable functionality
    const [buttonStatus, setButtonStatus] = useState(false);
    const handleChange = (event) => {
        setInput((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))

    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setButtonStatus(true);
        try {
            const { data } = await axios.post('/api/user/login', {
                email: input.email,
                password: input.password
            })
            console.log(data)
            if (data.success) {
                localStorage.setItem("userId", data?.userFound._id);
                dispatch(authActions.login());
                alert("User Login Successfully");
                console.log("sucess")
                navigate("/");
            }
        }
        catch (error) {
            console.log(error);
            setButtonStatus(false);
        }
        //console.log(input);
    }
    return (
        <div>
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
                            textAlign={"center"}>Login</Typography>

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
                            disabled={buttonStatus}
                            sx={{ borderRadius: 3, marginTop: "3px", bgcolor: '#9c2caf' }}>Submit</Button>
                        <Button
                            onClick={() => { navigate("/signup") }}
                            sx={{ color: "#9c2caf" }}>Not Registered? Please SignUp</Button>
                    </Box>
                </form>
            </div>
        </div>
    )
}
