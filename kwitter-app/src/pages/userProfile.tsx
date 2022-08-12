import { autocompleteClasses, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@mui/material";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStorage } from "../helper";
import APIclient from "../APIclient";
import UserCard from "../components/userCard";
import UserList from "../components/userList";
import KweetList from "../components/kweetList";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';


export default function UserProfile() {
    const [open, setOpen] = React.useState(true);
    const [tab, setTab] = React.useState('Posts');
    const [value, setValue] = React.useState(0);
    const [favorites, setFavorites] = React.useState<object[]>([])
    const [kweets, setKweets] = React.useState<object[]>([])
    const [rekweets, setRekweets] = React.useState<object[]>([])
    const navigate = useNavigate();

    const GetList = () => {
        APIclient.getFavorites(getStorage('user')!).then((res) => {
            if (res.status === 200) {
                Object.freeze(APIclient)
                setFavorites(res.data.body)
            } else {
            }
        })

        APIclient.getUserKweets(getStorage('user')!).then((res) => {
            if (res.status === 200) {
                Object.freeze(APIclient)
                setKweets(res.data.body)
            } else {
            }
        })

        APIclient.getRekweets(getStorage('user')!).then((res) => {
            if (res.status === 200) {
                Object.freeze(APIclient)
                setRekweets(res.data.body)
            } else {
            }
        })
    }

    useEffect(() => { GetList() }, [])

    const GetFavorites = () => {
        return (
            <KweetList list={favorites} />
        );
    };

    const GetKweets = () => {
        return (
            <KweetList list={kweets} />
        );
    };

    const GetRekweets = () => {
        return (
            <KweetList list={rekweets} />
        );
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
        <>
            <UserCard username={getStorage('user')} />
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
                    <Tab label="Kweets" {...a11yProps(0)} />
                    <Tab label="Rekweets" {...a11yProps(1)} />
                    <Tab label="Favorites" {...a11yProps(2)} />
                    <Tab label="Followers" {...a11yProps(3)} />
                    <Tab label="Following" {...a11yProps(4)} />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <GetKweets />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <GetRekweets />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <GetFavorites />
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <UserList type='follower' />
                </TabPanel>
                <TabPanel value={value} index={4}>
                    <UserList type='following' />
                </TabPanel>
            </Box>
        </>
    );

}
