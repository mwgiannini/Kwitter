import UserCard from '../userCard';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteButton from './favoriteButton';
import RekweetButton from './rekweetButton'
import { getStorage } from '../../helper';
import DeleteButton from './deleteButton';

export default function Kweet(props : any) {
    
    return (
        <Card>
            <CardHeader
                avatar={
                    <UserCard username={props.username} sx={{padding:0}}/>
                }
                action={
                <IconButton aria-label="settings">
                    <MoreVertIcon />
                </IconButton>
                }
            />
            <CardContent sx={{minWidth:1000}}>
                <Typography variant="body2" color="text.secondary">
                    {props.message}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <FavoriteButton username={props.username} post_time={props.post_time}/>
                <RekweetButton username={props.username} post_time={props.post_time}/>
                {getStorage('user')==props.username? 
                <DeleteButton username={props.username} post_time={props.post_time}/>
                :
                <></>}
                <Typography variant="caption" color="text.secondary" sx={{paddingLeft:'10px'}}>
                    {props.post_time}
                </Typography>
            </CardActions>
        </Card>
    )
}