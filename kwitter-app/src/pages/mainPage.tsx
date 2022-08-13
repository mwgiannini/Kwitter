import React from "react";
import Timeline from '../components/timeline';
import { Container } from "@mui/material";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Drawer from '@mui/material/Drawer';
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
            <Toolbar sx={{ top: 'auto', bottom: 0, left: 0, right: 0, position: "fixed" }}>
                <StyledFab color="secondary" aria-label="add">
                    <IconButton color="inherit" onClick={toggleOpen}>
                        <AddIcon />
                    </IconButton>
                </StyledFab>
                <Box sx={{ flexGrow: 1 }} />
            </Toolbar>
            <PostPanel />
        </>
    );
}
export default MainPage;