import * as React from 'react';
import Paper from '@mui/material/Paper';
import Kweet from './kweet'
import APIClient from '../APIclient'
import { Console } from 'console';

export default function Timeline() {

  const [timeline, setTimeline] = React.useState<Array<Object>>([])

  React.useEffect(()=>{ 
    APIClient.getTimeline('tut_the_gut').then(
      (res) => {
        console.log(res)
        setTimeline(res.data.data[0])
      }
    )
  },[])

  return (
      <Paper sx={{
        marginLeft: 'auto',
        marginRight: 'auto'
      }}
      >
      
      {timeline.map((val:any, index:number)=>{
        return(
          <Kweet message={val.message} 
                  username={val.username} 
                  post_time={val.post_time}/>
        )
      })}

      </Paper>
  );
}