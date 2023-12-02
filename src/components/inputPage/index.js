import * as React from "react";
import { useState } from "react";
import {Link} from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

function InputFireBase() {
    const [FristName , setFirstName] = useState('')
    const [lastName , setlastName] = useState('')
    const [email , setemail] = useState('')

    function  SubmitFireBase (event){
      
      event.preventDefault();

        const datas ={
            FristName,
            lastName,
            email
        }
        fetch('https://fir-75f9a-default-rtdb.firebaseio.com/Users.json ', {
            method :'POST',
            body:JSON.stringify(datas)
        }).then(response=>console.log(response))
    }

    
  return (
    <IputItems  onSubmit={SubmitFireBase}>
      <Box sx={{ width: 500, maxWidth: "100%" }}>
        <TextField
          fullWidth
          label="FristName"
          id="fullWidth"
          className="Input"
          value={FristName}
          onChange={(event)=>setFirstName(event.target.value)}
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
          onChange={(event)=>setlastName(event.target.value)}
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
        onChange={(event)=>setemail(event.target.value)}
        />
        

      </Box>

      <Button 
  type="submit"
  variant="contained" 
      endIcon={<SendIcon />}
      >
        Send it to me
      </Button>

      <Link to="/UsersInDB">
  <Button variant="outlined" size="medium" className="ShowDB">
    show DB 
  </Button>
</Link>
    </IputItems>
  );
}

export default InputFireBase;

const IputItems = styled.form`
margin-top: 20%;

  .Input {
  
    margin-bottom: 10%;
  }
  .ShowDB{
    margin-left: 14.5rem;

  }
`;
