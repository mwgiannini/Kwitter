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
import * as helper from '../helper'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';



function Login(props: any) {
    const [alertMessage, setAlertMessage] = useState("")
    const [signedUp, setSignedUp] = useState(false)
    const [open, setOpen] = useState(true);
    const [loggingIn, setLoggingIn] = useState(true);
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

        let params = {
            username: values.username,
            password: values.password
        };

        if (loggingIn) {
            APIclient.login(params).then((res) => {
                if (res.data.status === 200) {
                    if (res.data.body.loggedIn === true){
                        Object.freeze(APIclient)
                        helper.setStorage('loggedIn', true)
                        helper.setStorage('user', params.username)
                        navigate('/')
                    }
                    else {
                        updateAlert(res.data.body.message)
                    }
                }
                else{
                    updateAlert('Network Error')
                }
            });
        } else {
            APIclient.signUp(params).then((res) => {
                if (res.data.status === 200) {
                    setSignedUp(true)
                    updateAlert("")
                    setLoggingIn(true)
                } else {
                    updateAlert(res.data.body.message)
                }
            });
            setValues({
                username: '',
                password: '',
                showPassword: false,
            });
            navigate('/login', { replace: true })
        }
    }


    const updateAlert = (err: string) => {
        setAlertMessage(err)
    }

    function FormTitle() {
        if (loggingIn) {
            return (
                <>
                    <DialogContentText>
                        Log in to continue to the site.
                    </DialogContentText>
                </>
            );
        }

        return (
            <>
                <DialogContentText>
                    Sign up using your username address.
                </DialogContentText>
            </>
        );
    }

    function SubmitButton() {
        if (loggingIn) {
            return (
                <>
                    <Button type='submit'>Sign In</Button>
                </>
            );
        }

        return (
            <>
                <Button type='submit'>Sign Up</Button>
            </>
        );
    }

    function ToggleForm() {
        if (loggingIn) {
            return (
                <>
                    <DialogTitle>
                        <Typography align='left' variant="h3" component="div" gutterBottom>New Here?</Typography>
                        <Typography align='left' variant="overline" component="div" gutterBottom> Sign up for an account.</Typography>
                    </DialogTitle>
                    <Button onClick={flipLoggingIn}>Sign Up</Button>
                </>
            );
        }

        return (
            <>
                <DialogTitle>
                    <Typography align='left' variant="h3" component="div" gutterBottom>Have An Account?</Typography>
                    <Typography align='left' variant="overline" component="div" gutterBottom> Log in to continue to the site.</Typography>
                </DialogTitle>
                <Button onClick={flipLoggingIn}>Sign In</Button>
            </>
        );
    }

    const flipLoggingIn = () => {
        setLoggingIn(!loggingIn);
    }

    return (
        <Dialog open={open} fullWidth={true} maxWidth='md'>
            <DialogContent>
                <Grid container>
                    <Grid item xs={6}>
                        <DialogTitle>
                            <Typography variant="h2" component="div" gutterBottom>Welcome to Kwitter</Typography>
                        </DialogTitle>
                        <form onSubmit={handlePost}>
                            <FormTitle />
                            {alertMessage !== "" ?
                                <Alert severity="error">{alertMessage}</Alert>
                                : <></>
                            }
                            {signedUp === true ?
                                <Alert severity="success">Sign up was successful, continue to log in</Alert>
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
                                <SubmitButton />
                            </FormControl>
                        </form>
                    </Grid>
                    <Grid item xs={6} container direction="column" sx={{ backgroundColor: "#ffec9c" }}>
                        <Grid item xs={3}><Box></Box></Grid>
                        <Grid item xs={4} textAlign="center">
                            <ToggleForm />
                        </Grid>
                        <Grid item xs={4}>
                            <Box></Box>
                        </Grid>
                    </Grid>
                </Grid>
            </DialogContent>

        </Dialog>
    );

}


export default Login;