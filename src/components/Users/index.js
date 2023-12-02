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
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function GetUsers() {
  const [users, setusers] = useState([]);
  const [refresh, setrefresh] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [FristName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [useridentication, setuseridentication] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://fir-75f9a-default-rtdb.firebaseio.com/Users.json"
        );
        const data = await response.json();
        setusers(Object.entries(data));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [refresh]);

  const RemoveHandler = async (userId) => {
    await fetch(
      `https://fir-75f9a-default-rtdb.firebaseio.com/Users/${userId}.json`,
      {
        method: "DELETE",
      }
    ).then((response) => console.log(response));
    setrefresh((prev) => !prev);
  };

  const EditHandler = async () => {
    console.log(useridentication, "useridentication");

    const datas = {
      FristName,
      lastName,
      email,
    };
    await fetch(
      `https://fir-75f9a-default-rtdb.firebaseio.com/Users/${useridentication}.json`,
      {
        method: "PUT",
        body: JSON.stringify(datas),
      }
    ).then((response) => console.log(response));

    setrefresh((prev) => !prev);
  };

  return (
    <GetUsersContainer>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell align="center">Last Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell> Options </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow>
                <TableCell component="th" scope="row">
                  {user[1].FristName}
                </TableCell>
                <TableCell align="center">{user[1].lastName}</TableCell>
                <TableCell align="center">{user[1].email}</TableCell>
                <TableCell>
                  <DeleteIcon
                    onClick={() => {
                      RemoveHandler(user[0]);
                    }}
                  />
                  <BorderColorIcon
                    className="BorderColorIcon"
                    onClick={() => {
                      handleOpen();
                      setuseridentication(user[0]);
                    }}
                  />
                </TableCell>
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

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <IputItems>
              <Box sx={{ width: 500, maxWidth: "100%" }}>
                <TextField
                  fullWidth
                  label="FristName"
                  id="fullWidth"
                  className="Input"
                  value={FristName}
                  onChange={(event) => setFirstName(event.target.value)}
                />
              </Box>
              <Box
                sx={{
                  width: 500,
                  maxWidth: "100%",
                }}
              >
                <TextField
                  fullWidth
                  label="LasteName"
                  id="fullWidth"
                  className="Input"
                  value={lastName}
                  onChange={(event) => setlastName(event.target.value)}
                />
              </Box>
              <Box
                sx={{
                  width: 500,
                  maxWidth: "100%",
                }}
              >
                <TextField
                  fullWidth
                  label="Email"
                  id="fullWidth"
                  className="Input"
                  value={email}
                  onChange={(event) => setemail(event.target.value)}
                />
              </Box>
            </IputItems>
          </Typography>

          <Button
            variant="outlined"
            size="medium"
            className="BackMainPage"
            onClick={() => { 
                 EditHandler()
                handleClose()}
          
            }
          >
            edit
          </Button>
        </Box>
      </Modal>
    </GetUsersContainer>
  );
}

export default GetUsers;

const GetUsersContainer = styled.div`
  .BackMainPage {
    margin-top: 5%;
  }
  .BorderColorIcon {
    margin-left: 15%;
  }
`;
const IputItems = styled.form`
  .Input {
    margin-bottom: 5%;
  }
`;
