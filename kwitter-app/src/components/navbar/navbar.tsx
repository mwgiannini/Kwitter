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
import Container from '@mui/material/Container'
import KwitterTitle from "../logo/KwitterTitle.png"
import { useNavigate } from "react-router-dom";

export default function MenuAppBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color='primary'>
                <Toolbar>
                    <IconButton href="/">
                        <HomeIcon fontSize="large"/>
                    </IconButton>
                    <Container >
                        <img src={KwitterTitle} alt='kwitter title'
                            style={{maxHeight: "50px", margin: 0, borderRadius: '5px'}}/>
                    </Container>
                    <UserButton />
                </Toolbar>
            </AppBar>
        </Box>
    );
}