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
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
function GetUsers() {
  const [users, setusers] = useState([]);
  const [refresh,setrefresh]=useState(false)


useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch("https://fir-75f9a-default-rtdb.firebaseio.com/Users.json");
      const data = await response.json();
      setusers(Object.entries(data));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchData();
}, [refresh]);

const RemoveHandler =async(userId)=>{
 await fetch(`https://fir-75f9a-default-rtdb.firebaseio.com/Users/${userId}.json`, {
method:'DELETE'

}).then(response=>console.log(response))
setrefresh(prev => !prev)

}

  return (
    <GetUsersContainer>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell align="center">Last Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell > Options </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow>
                <TableCell component="th" scope="row">{user[1].FristName}</TableCell>
                <TableCell align="center">{user[1].lastName}</TableCell>
                <TableCell align="center">{user[1].email}</TableCell>
                <TableCell><DeleteIcon onClick={()=>{
                        RemoveHandler(user[0])
                }
           
            }/>
                 <BorderColorIcon className='BorderColorIcon'/></TableCell>
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
.BorderColorIcon{
    margin-left: 15%;
}

`