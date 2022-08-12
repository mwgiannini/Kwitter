import React, { useState, useEffect, useImperativeHandle } from "react";
import APIclient from "../APIclient";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import ButtonGroup from '@mui/material/ButtonGroup';
import { getStorage } from "../helper";


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
                {user.user[props.type]}
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
