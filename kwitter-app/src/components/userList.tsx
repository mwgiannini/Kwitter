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


export default function UserList() {
    const [users, setUsers] = useState([]);

    // const getUsers = () => {
    //     APIclient.getRegUsers().then((res) => {
    //         if (res.status === 200) {
    //             Object.freeze(APIclient)
    //             let reg_users = res.data.info
    //             setUsers(reg_users);
    //             setFilterUsers(reg_users);
    //         } else {
    //         }
    //     })
    // };
    useEffect(getUsers, []);

    return (
        <div style={{padding:"50px"}}>
            <Container maxWidth="md">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableBody>
                            {users.map((user, index) => (
                                // <UserRow
                                //     key={user['UserID']}
                                //     user={user}
                                // />
                                <TableRow>
                                    <TableCell>
                                        hellp
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </div>
    );
}
