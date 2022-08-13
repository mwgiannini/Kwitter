import ProfilePicture from './profilePicture';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { useNavigate } from 'react-router-dom';
import { setStorage } from '../helper';

export default function UserCard(props : any) {
    const navigate = useNavigate();

    function redirect() {
        setStorage('display user', props.username)
        navigate('/userprofile')
        window.location.reload()
    }

    return (
        <List sx={{ padding: '5px', width: '100%', maxWidth: 300, bgcolor: 'background.paper' }}>
            <ListItemButton onClick={redirect} sx={{padding:'5px', borderRadius: '2px'}}>
                <ListItemAvatar>
                    <ProfilePicture username={props.username}/>
                </ListItemAvatar>
                <Typography>{props.username}</Typography>
            </ListItemButton>
        </List>
    )
}