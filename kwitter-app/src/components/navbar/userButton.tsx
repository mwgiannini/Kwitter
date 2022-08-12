import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { getStorage, setStorage } from '../../helper';
import Avatar from '@mui/material/Avatar';


export default function UserButton(props: any) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const navigate = useNavigate();
    const handleProfileMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleProfileMenuClose = () => {
        setAnchorEl(null);
    };

    function userProfile() {
        navigate('/userprofile', { replace: true })
    }

    function logout() {
        setStorage('loggedIn', false);
        window.location.reload();
    }

    return (
        <Box>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleProfileMenu}
                color="inherit"
            >
                <AccountCircle fontSize='large'/>
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
                    <MenuItem onClick={userProfile}>
                        <Avatar 
                            alt="Profile Picture" 
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnAkz1qxG3c2s0xyDbqGvwo9LwNyitI4i6Tw&usqp=CAU" 
                            sx={{marginRight :'10px'}}
                            />
                        {getStorage('user')}
                    </MenuItem>
                    <MenuItem onClick={logout}>Log out</MenuItem>
                </div>
            </Menu>
        </Box>
    );
}