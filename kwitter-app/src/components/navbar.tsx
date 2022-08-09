import React from "react";
// // Need to make this a class that will recieve props.
// //we will store the right and middle elements in state
// // then we will generate the bar based on what was given
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import UserButton from './userButton';


export default function MenuAppBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" >
                <Toolbar>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        sx={{ flexGrow: 1 }}
                    >
                        Kwitter
                    </Typography>
                    <UserButton/>

                </Toolbar>
            </AppBar>
        </Box>
    );
}