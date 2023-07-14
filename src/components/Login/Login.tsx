import React, { useEffect, useState } from "react";
import "/src/components/Signup/Signup.css";
import { Link, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from 'axios'
import { Button, Card, TextField, Typography } from "@mui/material";



const backendUrl = "http://localhost:3000";
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
        const response = await axios.get(`${backendUrl}/authenticate`, {
          headers: {
            authorization: localStorage.getItem("token")
          }
        });
  
        if (response.status === 200) {
          navigate("/loginsuccessful");
        }
      } catch(error){

                  console.log(error)
                  return(<h1>Some error occured, please check console logs for more details</h1>)

      }
    })();
  }, []);
  



  // return (
  //   <div id="signup" className="flex-col">
  //     <h2>{message}</h2>
  //     <h1>Login</h1>
  //     <div className="signup-form">
  //       <div className="subform">
  //         <label htmlFor="username">username: </label>
  //         <input
  //           onChange={(e) => {
  //             setUsername(e.target.value);
  //           }}
  //           type="text"
  //           required
  //           name="username"
  //           placeholder="Your username"
  //           value={username}
  //         />
  //         {usernameError && (
  //           <p
  //             className="error-message"
  //             style={{ textAlign: "center", margin: "10px" }}
  //           >
  //             username cannot be empty.
  //           </p>
  //         )}
  //       </div>

  //       <div className="subform">
  //         <label htmlFor="password">Password: </label>
  //         <input
  //           onChange={(e) => setPassword(e.target.value)}
  //           type="password"
  //           name="password"
  //           placeholder="Your Password"
  //           value={password}
  //         />
  //         {passwordError && (
  //           <p
  //             className="error-message"
  //             style={{ textAlign: "center", margin: "10px" }}
  //           >
  //             Password cannot be empty.
  //           </p>
  //         )}
  //       </div>
  //       <button
  //         type="submit"
  //         id="test"
  //         onClick={async (e) => {
  //           try {
  //             if (!username) {
  //               setUsernameError(true);
  //               setPasswordError(false);
  //               return;
  //             } else if (!password) {
  //               setPasswordError(true);
  //               setUsernameError(false);
  //               return;
  //             } else {
  //               setUsernameError(false);
  //               setPasswordError(false);
  //             }
  //             setShowDiv(false);
  //             console.log(`${backendUrl}/login`);
  //             const response = await axios.post(`${backendUrl}/login`,
  //             {
  //               username,password
  //             })
  //             if (response.status === 200) {
  //               // set the state of the user
  //               // store the user in localStorage
  //               localStorage.setItem("token", response.data.token);
  //               navigate("/loginsuccessful");
  //             } else {
  //               setResult(response.data);
  //               setShowDiv(true);
  //             }
  //           } catch (error) {
  //             console.error("Login failed:", error);
  //           }
  //         }}
  //       >
  //         LOGIN
  //       </button>
  //       <br></br>
  //       <br></br>
  //       <div>
  //         <Link to="/">Homepage</Link>{' '}
  //         <Link to="/signup">Signup</Link>
  //       </div>
  //     </div>
  //     {showDiv && (
  //       <div style={{ textAlign: "center", margin: "10px" }}>{result}</div>
  //     )}
  //   </div>
  // );

  return (

    <div>
      <div style={{
        paddingTop: 150,
        marginBottom: 10,
        display: "flex",
        justifyContent: "center"
      }}>
        <Typography variant={"h6"}>
          Welcome to Movie-Repo. Sign in below
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
                          console.log(`${backendUrl}/login`);
                          const response = await axios.post(`${backendUrl}/login`,
                          {
                            username,password
                          })
                          if (response.status === 200) {
                            localStorage.setItem("token", response.data.token);
                            navigate("/loginsuccessful");
                          } else {
                            setResult(response.data);
                            setShowDiv(true);
                          }
                        } catch (error) {
                          console.error("Login failed:", error);
                          setResult(error.response.data);
                          setShowDiv(true);
                        }
            }}
          > Login</Button>
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
