import React from "react";
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import APIclient from "../../APIclient";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';


export default function DeleteButton(props: any) {
    const [open, setOpen] = React.useState(false)
    function handleDelete() {
        let params = {
            username: props.username,
            post_time: props.post_time
        }
        APIclient.deleteKweet(params).then((res) => {
            if (res.status === 200) {
                Object.freeze(APIclient)
                setOpen(true)
                setTimeout(() =>{window.location.reload()}, 2000)
            } else {
            }
        })
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
        setOpen(false);
    };
    
    return (
        <>
            <IconButton onClick={handleDelete}>
                <DeleteOutlineIcon color="error" />
            </IconButton>
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Successfuly deleted!
                    You will be redirected in 2 seconds
                </Alert>
            </Snackbar>
        </>
    );
}