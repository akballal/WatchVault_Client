import React, { useEffect, useState } from "react";
import "/src/components/Signup/Signup.css";
import { Link, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from 'axios'
import { Button, Card, TextField, Typography } from "@mui/material";
import { BASE_URL } from "../../config/apiConfig";



const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showDiv, setShowDiv] = useState(false);
  const [result, setResult] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const message = params.get('message');
  

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.post(
          `${BASE_URL}/user/authenticate`,
          {},
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        );
  
        if (response.status === 200) {
          navigate("/loginsuccessful");
        }
      } catch(error){

                  console.log(error)
                  return(<h1>Some error occured, please check console logs for more details</h1>)

      }
    })();
  }, []);
  
  return (

    <div>
      <div style={{
        paddingTop: 150,
        marginBottom: 10,
        display: "flex",
        justifyContent: "center"
      }}>
        <Typography variant={"h6"}>
          {message}
        </Typography>
        
        {!message && <Typography variant={"h6"}>
          Welcome to WatchVault. Sign in below
        </Typography>}
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
                          console.log(`${BASE_URL}/user/login`);
                          const response = await axios.post(`${BASE_URL}/user/login`,
                          {
                            username,password
                          },
                          {
                            headers: {
                              withCredentials: true
                            }
                          })
                          if (response.status === 200) {
                            console.log(response);
                            console.log(response.data);
                            localStorage.setItem("token", response.data);
                            window.location = "/loginsuccessful";
                           // navigate("/loginsuccessful");
                          } else {
                            setResult(response.data);
                            setShowDiv(true);
                          }
                        } catch (error) {
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
                          console.error("Login failed:", error);
                          console.log(error)
                          setResult(error.response.data);
                          setShowDiv(true);
                          }
                        }
            }}
          > Login</Button></center>
          <br></br>
         <br></br>
        <div style={{
          display: 'flex',
          justifyContent: "space-between"
        }}>
          <Link to="/">Homepage</Link>
          <Link to="/signup">Signup</Link>
         </div>
         <div>
          {showDiv && (
        <div style={{ textAlign: "center", margin: "10px" }}>{result}</div>
      )}</div>
        </Card>
      </div>
    </div>
  );

};

export default Login;
