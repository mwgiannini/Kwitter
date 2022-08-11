import React from "react";
import Timeline from '../components/timeline';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import { Typography } from "@mui/material";
import APIclient from "../APIclient";
import * as helper from "../helper"
import Login from "../components/login"
import { useNavigate } from "react-router-dom";


function MainPage() {
    const navigate = useNavigate();

    if (JSON.parse(helper.getStorage('loggedIn')!) != true) {
        navigate('/login')
    }


    return (
        <>
            <Timeline/>
        </>
    );
}
export default MainPage;