import ProfilePicture from './profilePicture';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';

export default function UserCard(props : any) {
    return (
        <List sx={{ width: '100%', maxWidth: 300, bgcolor: 'background.paper' }}>
            <ListItem sx={{padding:0}}>
                <ListItemAvatar>
                    <ProfilePicture username={props.username}/>
                </ListItemAvatar>
                <Typography>{props.username}</Typography>
            </ListItem>
        </List>
    )
}