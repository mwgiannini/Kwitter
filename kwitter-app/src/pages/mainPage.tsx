import React from "react";
import Timeline from '../components/timeline';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import { Typography } from "@mui/material";
import APIclient from "../APIclient";


function MainPage() {
    const [auth, setAuth] = React.useState(true);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAuth(event.target.checked);
    };
    let data = {username:'frank', password:'123456'};
    APIclient.login(data).then((res) => {
        console.log(res)
        Object.freeze(APIclient)
    })

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

            <Timeline/>
        </>
    );
}
export default MainPage;