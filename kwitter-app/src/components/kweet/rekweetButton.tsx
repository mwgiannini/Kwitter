import * as React from 'react';
import { getStorage } from '../../helper'
import IconButton from '@mui/material/IconButton';
import RepeatOne from '@mui/icons-material/RepeatOne'
import Tooltip from '@mui/material/Tooltip';
import APIclient from '../../APIclient'

export default function RekweetButton(props : any) {
  const [rekweeted, setRekweeted] = React.useState<boolean>(false)

  React.useEffect(()=>{
    let user = getStorage('user')
    APIclient.getRekweets(user!).then(
      (res) => {
        if (res.data != null){
            if (res.data.body.some((e : any) => e.username === props.username &&
                                             e.post_time === props.post_time &&
                                    e.favorite_username === user))    
            setRekweeted(true)
        }
      }
    )
  },[props.username, props.post_time, props.favorite_username])
  
  return (
    <Tooltip title="Rekweet">
        <IconButton onClick={
              () => {
                  let params = {
                      username : props.username,
                      post_time : props.post_time,
                      favorite_username : getStorage("user")
                  }
                  
                  //APIclient.toggleRekweet(params)
                  setRekweeted(!rekweeted);
              }
          } aria-label="add to favorites">
          {rekweeted ? 
              <RepeatOne /> :
              <RepeatOne color='disabled'/>
          }
      </IconButton>
    </Tooltip>
    
  );
}