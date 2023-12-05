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
  const [Title, setTitle] = useState("");
  const [Date, setDate] = useState("");
  const [Status, setStatus] = useState("");
  const [useridentication, setuseridentication] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://fir-75f9a-default-rtdb.firebaseio.com/Users.json"
        );
        const data = await response.json();
  
        if (data && typeof data === 'object') {
          // More than one user
          setusers(Object.entries(data));
        } else if (Array.isArray(data) && data.length === 1) {
          // Only one user
          setusers([data]);
        } else {
          // Empty or unexpected data
          setusers([]);
        }
  
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [refresh]);
  
  const RemoveHandler = async (userId) => {
    try {
      const response = await fetch(
        `https://fir-75f9a-default-rtdb.firebaseio.com/Users/${userId}.json`,
        {
          method: "DELETE",
        }
      );
  
      if (response.ok) {
        console.log("User deleted successfully");
  
        // Use a callback function with setrefresh to ensure correct order of state updates
        setrefresh((prev) => !prev, () => {
          // This code will run after the state has been updated
          console.log("Refreshed");
        });
      } else {
        console.error(`Failed to delete user. Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  
  
  const EditHandler = async () => {
    console.log(useridentication, "useridentication");

    const datas = {
        Title,
      Date,
      Status,
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
              <TableCell>Title</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell> Options </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow>
                <TableCell component="th" scope="row">
                  {user[1].Title}
                </TableCell>
                <TableCell align="center">{user[1].Date}</TableCell>
                <TableCell align="center">{user[1].Status}</TableCell>
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
            Yoho you want to edit infos !
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <IputItems>
              <Box sx={{ width: 500, maxWidth: "100%" }}>
                <TextField
                  fullWidth
                  label={Title}
                  id="fullWidth"
                  className="Input"
                  value={Title}
                  onChange={(event) => setTitle(event.target.value)}
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
                  label="Date"
                  id="fullWidth"
                  className="Input"
                  value={Date}
                  onChange={(event) => setDate(event.target.value)}
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
                  label="Status"
                  id="fullWidth"
                  className="Input"
                  value={Status}
                  onChange={(event) => setStatus(event.target.value)}
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
