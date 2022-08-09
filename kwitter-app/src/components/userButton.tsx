import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
// import styles from './UserButton.module.css';

import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';


export default function UserButton(props: any) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const navigate = useNavigate();
    const handleProfileMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleProfileMenuClose = () => {
        setAnchorEl(null);
    };


    function login() {
        navigate('/login', { replace: false })
    }

    function logout() {
        navigate('/', { replace: true })
    }
    return (
        <Box>
            {props.loggedIn === true ? (
                <>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleProfileMenu}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleProfileMenuClose}
                    >

                        <div>
                            <MenuItem onClick={logout}>Log out</MenuItem>
                        </div>
                    </Menu>
                </>
            ) : (
                <IconButton
                    size="large"
                    onClick={login}
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>

            )}


        </Box>
    );
}