import React, { useState } from "react";
import {Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import { Typography, Card, TextField, Button } from "@mui/material";
import { BASE_URL } from "../../config/apiConfig";


const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showDiv, setShowDiv] = useState(false);
  const [result, setResult] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const navigate = useNavigate();

  return (

    <div>
      <div style={{
        paddingTop: 150,
        marginBottom: 10,
        display: "flex",
        justifyContent: "center"
      }}>
        <Typography variant={"h6"}>
          Welcome to Movie-Repo. Sign up below
        </Typography>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card varint={"outlined"} style={{ width: 400, padding: 20 }} >
          <TextField
            required
            onChange={(e) => {
              setUsername(e.target.value)
            }}
            fullWidth={true}
            label="Username"
            variant="outlined"
          />
          <br /><br />
          {usernameError && (
            <p>
              username cannot be empty.
            </p>
          )}
          <TextField
            required
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            fullWidth={true}
            label="Password"
            variant="outlined"
            type={"password"}
          />
          {passwordError && (
            <p>Password cannot be empty.</p>
          )}
          <br /><br />

          <center>
          <Button
            size={"large"}
            variant="contained"
            disabled={!username || !password}
            onClick={async (e) => {
              try {
                if (!username) {
                  setUsernameError(true);
                  setPasswordError(false);
                  return;
                } else if (!password) {
                  setPasswordError(true);
                  setUsernameError(false);
                  return;
                } else {
                  setUsernameError(false);
                  setPasswordError(false);
                }
                setShowDiv(false);
                const response = await axios.post(`${BASE_URL}/user/signup`, {
                  username, password
                })
                 navigate('/signupsuccessful');
                
              } catch (error: any) {
                console.log(error)
                
                if (axios.isAxiosError(error)) {
                  // Axios error, check for network issues or server being down
                  if (!error.response) {
                    setResult("Network error or server is down. Sorry for inconvenience, We are working to make it up and running.");
                    setShowDiv(true);
                  } else {
                    // Handle other Axios errors if needed
                    setResult(error.response.data);
                    setShowDiv(true);
                  }
                }
                else{
                if(error.response.status === 409)
                {
                  setResult(error.response.data);
                  setShowDiv(true);
                }
              }
}
            }}
          > Signup</Button></center> 
          <br></br>
         <br></br>
        <div style={{
          display: 'flex',
          justifyContent: "center"
        }}>
          <Link to="/">Homepage</Link>
          
         </div>
         <div></div> 
          <div>
          {showDiv && (
        <div style={{ textAlign: "center", margin: "10px" }}>{result}</div>
      )}</div>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
