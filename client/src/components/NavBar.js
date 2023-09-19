import React, { useState } from 'react'
import { AppBar, Tab, Tabs, Box, Button, Toolbar, Typography } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../redux/store';

export default function NavBar() {
    //global state
    const isLogin = useSelector(state => state.isLogin);
    const dispatch = useDispatch();

    const navigate = useNavigate();
    console.log(isLogin);
    //state
    const [value, setValue] = useState(0);
    const handleChange = (event, val) => {
        setValue(val);
        console.log(val);
    }

    //logout
    const handleLogout = () => {
        try {
            dispatch(authActions.logout());
            alert("Logout Successfull");
            navigate("/login")
        }
        catch (error) {
            console.log(error);
        }
    }
    return (
        <Box>
            <AppBar sx={{ bgcolor: "#9c2caf" }} position='sticky'>
                <Toolbar>
                    <Typography variant='h4'>
                        Canvas Blog App
                    </Typography>
                    {isLogin && (<Box display={'flex'} marginLeft='auto'>
                        <Tabs textcolor="inherit" value={value} onChange={handleChange} >
                            <Tab label="Blogs" LinkComponent={Link} to="/blogs"></Tab>
                            <Tab label="My Blogs" LinkComponent={Link} to="/my-blogs"></Tab>
                            <Tab label="Create Blog" LinkComponent={Link} to="/create-blog"></Tab>
                        </Tabs>
                    </Box>)}
                    <Box display={'flex'} marginLeft='auto'>
                        {!isLogin && (<Button sx={{ margin: 1, color: "white" }} LinkComponent={Link} to="/login">Login</Button>)}
                        {isLogin && (<Button onClick={handleLogout} sx={{ margin: 1, color: "white" }} LinkComponent={Link} >Logout</Button>)}
                        {!isLogin && (<Button sx={{ margin: 1, color: "white" }} LinkComponent={Link} to="/signup">SignUp</Button>)}
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )

} 