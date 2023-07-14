import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { Typography, Card, TextField, Button } from "@mui/material";

const backendUrl = "http://localhost:3000";
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
        <Card varint={"outlined"} style={{ width: 400, padding: 20 }}>
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

          <Button
            size={"large"}
            variant="contained"
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
                const response = await axios.post(`${backendUrl}/signup`, {
                  username, password
                })

                if (response.status === 200) {
                  navigate('/signupsuccessful');
                }
                else {
                  console.log("here..")
                  setResult(response.data);
                  setShowDiv(true);
                }
              } catch (error) {
                console.log(error.response.data)
                setResult(error.response.data);
                  setShowDiv(true);

              }
            }}
          > Signup</Button>
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
