import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import APIClient from '../APIclient'
import * as helper from '../helper'

export default function ProfilePicture(props : any) {
    const [url, setUrl] = React.useState<string>('')

    React.useEffect(() => {APIClient.getProfilePicture(props.username).then((res) => {
        setUrl(res.data.body[0].profile_pic)
    })}, [props.username])

    return (
        <Avatar alt="Profile Picture" src={url}/>
    )
}