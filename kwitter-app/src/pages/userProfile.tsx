import { autocompleteClasses, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@mui/material";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStorage } from "../helper";
import APIclient from "../APIclient";
import UserList from "../components/userList";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';


export default function UserProfile() {
    const [open, setOpen] = React.useState(true);
    const [tab, setTab] = React.useState('Posts');
    const [value, setValue] = React.useState(0);
    const navigate = useNavigate();

    const CloseUserProfile = () => {
        navigate('/', { replace: true });
    };


    interface TabPanelProps {
        children?: React.ReactNode;
        index: number;
        value: number;
    }

    function TabPanel(props: TabPanelProps) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`vertical-tabpanel-${index}`}
                aria-labelledby={`vertical-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    function a11yProps(index: number) {
        return {
            id: `vertical-tab-${index}`,
            'aria-controls': `vertical-tabpanel-${index}`,
        };
    }

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };


    return (
        <Container>
            <Card sx={{ marginLeft:'100px', marginRight:'100px' }}>
                <CardHeader
                    avatar={
                        <Avatar
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnAkz1qxG3c2s0xyDbqGvwo9LwNyitI4i6Tw&usqp=CAU" 
                        >
                            R
                        </Avatar>
                    }
                    title="Shrimp and Chorizo Paella"
                />
                <Box
                    sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
                >
                    <Tabs
                        orientation="vertical"
                        value={value}
                        onChange={handleChange}
                        aria-label="Vertical tabs example"
                        sx={{ borderRight: 1, borderColor: 'divider' }}
                    >
                        <Tab label="Posts" {...a11yProps(0)} />
                        <Tab label="Favorites" {...a11yProps(1)} />
                        <Tab label="Followers" {...a11yProps(2)} />
                        <Tab label="Following" {...a11yProps(3)} />
                    </Tabs>
                    <TabPanel value={value} index={0}>
                        Item One
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        Item Two
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                       <UserList type='follower'/>
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <UserList type='following'/>
                    </TabPanel>
                </Box>
                <Button onClick={CloseUserProfile} variant='outlined'>Back</Button>
            </Card>
        </Container>
    );

}
