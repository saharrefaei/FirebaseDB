import * as React from "react";
import { useState } from "react";
import {Link} from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

function InputFireBase() {
    const [Title , setTitle] = useState('')
    const [Date , setDate] = useState('')
    const [Status , setStatus] = useState('')

    function  SubmitFireBase (event){
      
      event.preventDefault();

        const datas ={
          Title,
          Date,
          Status
        }
        fetch('https://fir-75f9a-default-rtdb.firebaseio.com/Users.json ', {
            method :'POST',
            body:JSON.stringify(datas)
        }).then(response=>console.log(response))
    }

    
  return (
    <IputItems  onSubmit={SubmitFireBase}>
      <h1 className='status'>welcome To your TODO LIST</h1>
      <Box sx={{ width: 500, maxWidth: "100%" }}>
        <TextField
          fullWidth
          label="Title"
          id="fullWidth"
          className="Input"
          value={Title}
          onChange={(event)=>setTitle(event.target.value)}
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
          onChange={(event)=>setDate(event.target.value)}
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
        onChange={(event)=>setStatus(event.target.value)}
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

margin-top: 10%;
.status{
  align-items: center;
  justify-content: center;
  display: flex;
  margin-bottom: 10%;

}
  .Input {
  
    margin-bottom: 10%;
  }
  .ShowDB{
    margin-left: 14.5rem;

  }
`;
