import * as React from 'react';
import { getStorage } from '../../helper'

import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';

import APIclient from '../../APIclient'

export default function FavoriteButton(props : any) {
  const [favorited, setFavorited] = React.useState<boolean>(false)

  React.useEffect(()=>{
    let user = getStorage('user')
    APIclient.getFavorites(user!).then(
      (res) => {
        if (res.data != null){
            console.log(res.data.body)
            if (res.data.body.some((e : any) => e.username === props.username &&
                                             e.post_time === props.post_time &&
                                    e.favorite_username === user))    
            setFavorited(true)
        }
      }
    )
  },[props.username, props.post_time, props.favorite_username])
  
  return (
    <IconButton onClick={
            () => {
                let params = {
                    username : props.username,
                    post_time : props.post_time,
                    favorite_username : getStorage("user")
                }
                
                APIclient.toggleFavorite(params)
                setFavorited(!favorited);
            }
        } aria-label="add to favorites">
        {favorited ? 
            <FavoriteIcon color = 'error'/> :
            <FavoriteIcon/>
        }
    </IconButton>
  );
}