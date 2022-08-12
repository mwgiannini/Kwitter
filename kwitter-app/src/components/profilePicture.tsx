import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import APIClient from '../APIclient'
import * as helper from '../helper'

export default function ProfilePicture(username : any) {
    const [url, setUrl] = React.useState<string>('')

    React.useEffect(() => {APIClient.getProfilePicture(username.username).then((res) => {
        setUrl(res.data.body[0].profile_pic)
    })}, [username.username])

    return (
        <Avatar alt="Profile Picture" src={url}/>
    )
}