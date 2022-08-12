import ProfilePicture from './profilePicture';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';

export default function UserCard(props : any) {
    return (
        <List sx={{ width: '100%', maxWidth: 300, bgcolor: 'background.paper' }}>
            <ListItemButton sx={{padding:'5px', borderRadius: '2px'}}>
                <ListItemAvatar>
                    <ProfilePicture username={props.username}/>
                </ListItemAvatar>
                <Typography>{props.username}</Typography>
            </ListItemButton>
        </List>
    )
}