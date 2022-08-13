import UserCard from '../userCard';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Kweet from './kweet'

export default function Rekweet(props : any) {
    return (
        <Card  elevation={6}>
            <CardHeader
                avatar={
                    <UserCard username={props.rekweet_username} sx={{padding:0}}/>
                }
                action={
                <IconButton aria-label="settings">
                    <MoreVertIcon />
                </IconButton>
                }
            />
            <CardContent sx={{minWidth:1000}}>
                <Kweet username={props.username} 
                    post_time={props.post_time}
                    message={props.message}/>
            </CardContent>
            <CardActions disableSpacing>
                <Typography variant="caption" color="text.secondary" sx={{paddingLeft:'10px'}}>
                    {props.rekweet_time}
                </Typography>
            </CardActions>
        </Card>
    )
}