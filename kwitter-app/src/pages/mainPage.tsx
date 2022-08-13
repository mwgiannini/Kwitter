import React from "react";
import Timeline from '../components/timeline';
import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Drawer from '@mui/material/Drawer';
import TextField from '@mui/material/TextField';
import { getStorage } from '../helper';
import UserCard from "../components/userCard";
import Button from '@mui/material/Button';
import NewKweetForm from "../components/newKweetForm";



function MainPage() {
    const [open, setOpen] = React.useState(false)

    const StyledFab = styled(Fab)({
        position: 'absolute',
        zIndex: 1,
        top: -30,
        left: 0,
        right: 0,
        margin: '0 auto',
    });

    function toggleOpen() {
        setOpen(!open)
    }

    function PostPanel() {

        return (
            <div>
                <Drawer
                    anchor='bottom'
                    open={open}
                    onClose={toggleOpen}
                >
                    <Box>
                        <UserCard username={getStorage('user')} />
                        <Container>
                            <NewKweetForm />
                           
                            <Button variant="contained" sx={{ margin: '10px' }} onClick={toggleOpen}>cancel</Button>
                        </Container>
                    </Box>

                </Drawer>
            </div>
        );
    }

    return (
        <>
            <Timeline />
            <Container>
                <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
                    <Toolbar>
                        <StyledFab color="secondary" aria-label="add">
                            <IconButton color="inherit" onClick={toggleOpen}>
                                <AddIcon />
                            </IconButton>
                        </StyledFab>
                        <Box sx={{ flexGrow: 1 }} />
                    </Toolbar>
                </AppBar>
            </Container>
            <PostPanel />
        </>
    );
}
export default MainPage;