import * as React from 'react';
import UserCard from './userCard';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Container } from '@mui/system';
import TextField from '@mui/material/TextField';
import { getStorage } from '../helper';
import { useNavigate } from 'react-router-dom';
import APIclient from '../APIclient';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';


export default function NewKweetForm() {
    const navigate = useNavigate()
    const [alert, setAlert] = React.useState('')
    const [success, setSuccess] = React.useState(false)
    const [fail, setFail] = React.useState(false)
    const [open,setOpen] =React.useState(true)
    let post = "'"

    function closePanel() {
        setOpen(false)
    }

    function updateAlert(message: string) {
        setAlert(message)
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFail(false)
        post = event.target.value
    }

    function handlePost(e: any) {
        e.preventDefault();
        let params = {}

            params = {
                username: getStorage('user'),
                message: post
            };
        // }

        APIclient.postKweet(params).then((res) => {
            if (res.data.status === 200) {
                Object.freeze(APIclient)
                setTimeout(() => {  window.location.reload() }, 2000);
                setSuccess(true)
            }
            else {
                setFail(true)
                updateAlert(res.data.body.message)
            }
        });
    }

    const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
        props,
        ref,
    ) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setFail(false);
    };

    return (
        <>
        
            <TextField
                label="New Post"
                multiline
                fullWidth
                rows={4}
                placeholder="Please don't SQL inject us >_<"
                variant="filled"
                onChange={handleChange} />
            <Button variant="contained" sx={{ margin: '10px' }} onClick={handlePost}>submit</Button>
            <Snackbar open={success} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Successfuly posted a kweet!
                    You will be redirected in 2 seconds
                </Alert>
            </Snackbar>
            <Snackbar open={fail} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                    {alert}
                </Alert>
            </Snackbar>
        </>
    );
}