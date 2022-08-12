import React, { useState, useEffect } from "react";
import APIclient from "../APIclient";
import { getStorage } from "../helper";
import UserCard from "./userCard";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



export default function UserList(props:any) {
    const [users, setUsers] = useState<object[]>([]);

    let params = {
        request: props.type,
        user: getStorage('user'),
    }

    const getUsers = () => {
        APIclient.getUsers(params).then((res) => {
            if (res.status === 200) {
                Object.freeze(APIclient)
                setUsers(res.data.body.result)
            } else {
            }
        })
    };
    useEffect(getUsers, []);

    const UserCell = (user: any) => {
        return (
            <TableCell>
                <UserCard username={user.user[props.type]} />
            </TableCell>
        );
    }

    return (
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableBody>
                            {users.map((user, index) => (
                                <TableRow>
                                    <UserCell 
                                        key={index}
                                        user={user}
                                    />
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
    );
}
