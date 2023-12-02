import styled from "styled-components";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import Button from "@mui/material/Button";

function GetUsers() {
  const [users, setusers] = useState([]);
  console.log(users, "users");
  useEffect(async() => {
   await fetch("https://fir-75f9a-default-rtdb.firebaseio.com/Users.json")
      .then((response) => response.json())
      .then((data) => setusers(Object.entries(data)));
  }, []);

  return (
    <GetUsersContainer>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell align="center">Last Name</TableCell>
              <TableCell align="center">Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow>
                <TableCell component="th" scope="row">{user[1].FristName}</TableCell>
                <TableCell align="center">{user[1].lastName}</TableCell>
                <TableCell align="center">{user[1].email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Link to="/MainPage">
  <Button variant="outlined" size="medium" className="BackMainPage">
Back to Main Page
  </Button>
</Link>
    </GetUsersContainer>
  );
}

export default GetUsers;

const GetUsersContainer = styled.div`
.BackMainPage{

    margin-top: 5%;
}

`