import React, { useEffect, useState } from 'react';
import APIclient from '../APIclient';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid/Grid';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Typography from '@mui/material/Typography/Typography';
import { Alert, Card } from '@mui/material';
import Logo from "./logo/Logo.png"
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import * as helper from '../helper'



function Login(props: any) {
    const [alertMessage, setAlertMessage] = useState("")
    const [signedUp, setSignedUp] = useState(false)
    const navigate = useNavigate();

    interface State {
        username: string;
        password: string;
        showPassword: boolean;
    }


    const [values, setValues] = useState<State>({
        username: '',
        password: '',
        showPassword: false,
    });

    //===============================

    const handleChange =
        (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setValues({ ...values, [prop]: event.target.value });
        };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };


    var handlePost = (e: any) => {
        e.preventDefault();

        let data = {
            username: values.username,
            password: values.password
        };


        console.log(data)

    APIclient.login(data).then((res) => {
        console.log(res.data)
        if (res.data.status === 200) {
            if (res.data.info.loggedIn === true) {
            Object.freeze(APIclient)
            helper.setStorage('loggedIn', true)
            navigate('/')
            }
            else updateAlert(res.data.info.message)
        }
        else updateAlert('Network Error')
    })

        // APIclient.login(data).then((res) => {
        //     helper.setStorage("res", res)

        //     if (res.status === 200) {
        //         Object.freeze(APIclient) // DONT REMOVE - WILL BERAK ALL API REQUEST
        //         // navigate('/')
        //     }
        //     else {
        //         // updateAlert(res.response.data.message)
        //     }

        // });
    }

    const updateAlert = (err: string) => {
        setAlertMessage(err)
        console.log(err)
    }



    return (
        <Container maxWidth="sm">
            <Grid container>
                <Grid item xs={6}>
                    <DialogTitle>
                        <Typography variant="h2" component="div" gutterBottom>Welcome to Kwitter</Typography>
                    </DialogTitle>
                    <form onSubmit={handlePost}>
                        Log in to continue to the site.
                        {alertMessage !== "" ?
                            <Alert severity="error">{alertMessage}</Alert>
                            : <></>
                        }
                        {signedUp === true ?
                            <Alert severity="success">Sign up successfully, please log in</Alert>
                            : <></>
                        }
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="username"
                                type="text"
                                variant="standard"
                                onChange={handleChange('username')}
                                value={values.username}
                            />
                        </FormControl>
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                            <Input
                                id="standard-adornment-password"
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                onChange={handleChange('password')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                            <Button type='submit'>Sign In</Button>
                        </FormControl>
                    </form>
                </Grid>
                <Grid item xs={6} container direction="column" sx={{ backgroundColor: "#f8f5da" }}>
                    <Grid item xs={3}><Box></Box></Grid>
                    <Grid item xs={4} textAlign="center">
                    </Grid>
                    <Grid item xs={4}>
                        <img src={Logo} alt='kwitter logo'
                            style={{ maxWidth: "100%", margin: "30px 0" }} />
                    </Grid>
                </Grid>
            </Grid>

        </Container>
    );

}


export default Login;