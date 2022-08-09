import React from "react";
import Kweet from '../components/kweet';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import { Typography } from "@mui/material";


function MainPage() {
    const [auth, setAuth] = React.useState(true);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAuth(event.target.checked);
    };

    return (
        <>
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
            {auth ?
                <Typography variant="h1" >logged in</Typography>
                :
                <Typography variant='h1'>Not logged in</Typography>
            }

            <Kweet/> 
        </>
    );
}
export default MainPage;