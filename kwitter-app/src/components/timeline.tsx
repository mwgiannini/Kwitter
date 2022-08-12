import * as React from 'react';
import * as helper from '../helper'

import APIClient from '../APIclient'
import KweetList from './kweetList';

export default function Timeline() {
  const [timeline, setTimeline] = React.useState<Array<Object>>([])

  React.useEffect(()=>{
    let user = helper.getStorage('user')
    APIClient.getTimeline(user!).then(
      (res) => {
        if (res.data != null){
          setTimeline(res.data.body[0])
        }
      }
    )
  },[])
  
  return (
    <KweetList list={timeline}/>
  );
}