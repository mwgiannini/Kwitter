import React from "react";
// // Need to make this a class that will recieve props.
// //we will store the right and middle elements in state
// // then we will generate the bar based on what was given
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import UserButton from './userButton';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import Container from '@mui/material/Container'
import KwitterTitle from "../logo/KwitterTitle.png"
import APIclient from "../../APIclient";
import { styled, alpha } from '@mui/material/styles';
import { setStorage } from '../../helper';
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import SearchIcon from '@mui/icons-material/Search';
import { Snackbar } from "@mui/material";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

export default function MenuAppBar() {
    const navigate = useNavigate();
    let text = ""
    const [alert, setAlert] = React.useState(false)


    let keyPress = (e : any) => {
        if(e.keyCode === 13){
            APIclient.searchUser(text).then(
                (res) => {
                    if (res.data.body[0] !== undefined){
                        setStorage('display user', res.data.body[0].username)
                        navigate('/userprofile')
                        window.location.reload()
                    }
                    else{
                        setAlert(true)
                    }
                }
            )
        }
     }

     const handleClose = (e?: React.SyntheticEvent | Event, reason?: string) => {
         if(reason === 'clickaway') return
         setAlert(false)
     }

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
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                        onKeyDown={keyPress}
                        onChange={(e) => {text = e.target.value}}
                        />
                    </Search>
                    <UserButton />
                </Toolbar>
            </AppBar>
            <Snackbar open={alert} autoHideDuration={2000} onClose={handleClose}>
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    user not found
                </Alert>
            </Snackbar>
        </Box>
    );
}