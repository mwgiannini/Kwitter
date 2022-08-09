import React, { useState, useEffect } from "react";
// // Need to make this a class that will recieve props.
// //we will store the right and middle elements in state
// // then we will generate the bar based on what was given
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import UserButton from './userButton';
import MainMenu from './menu';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';


export default function MenuAppBar() {
    const [auth, setAuth] = React.useState(true);

    // const isLoggedIn = APIfunc.getStorage("isLoggedIn")
    // function CheckAdmin () {
    //     APIfunc.isAdmin().then(res => {setIsAdmin(res)});
    // }


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={auth}
              onChange={handleChange}
              aria-label="login switch"
            />
          }
          label={auth ? 'Logout' : 'Login'}
        />
      </FormGroup>
            <AppBar position="static" >
                <Toolbar>
                    {auth===true ?  (
                        <div>
                            <MainMenu />
                        </div>
                    ): (<></>)}
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{ flexGrow: 1 }}
                    >
                        Kwitter
                    </Typography>
                    <UserButton loggedIn={auth}/>

                </Toolbar>
            </AppBar>
        </Box>
    );
}