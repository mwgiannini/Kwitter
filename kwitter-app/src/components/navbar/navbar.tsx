import React from "react";
// // Need to make this a class that will recieve props.
// //we will store the right and middle elements in state
// // then we will generate the bar based on what was given
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import UserButton from './userButton';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';


export default function MenuAppBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color='primary'>
                <Toolbar>
                    <IconButton href="/">
                        <HomeIcon fontSize="large"/>
                    </IconButton>
                    <Typography
                        variant="button"
                        component="a"
                        href="/"
                        sx={{ flexGrow: 1, textDecoration: 'none', fontSize: '50px', color: '#005ea6' }}
                    >
                        Kwitter
                    </Typography>
                    <UserButton />
                </Toolbar>
            </AppBar>
        </Box>
    );
}