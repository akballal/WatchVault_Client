import React, { useState } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

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
    <div id="signup" className="flex-col">
      <h1>Signup</h1>
      <div className="signup-form">
        <div className="subform">
          <label htmlFor="username">username: </label>
          <input
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            type="text"
            required
            name="username"
            placeholder="Your username"
            value={username}
          />
          {usernameError && (
            <p
              className="error-message"
              style={{ textAlign: "center", margin: "10px" }}
            >
              username cannot be empty.
            </p>
          )}
        </div>

        <div className="subform">
          <label htmlFor="password">Password: </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            placeholder="Your Password"
            value={password}
          />
          {passwordError && (
            <p
              className="error-message"
              style={{ textAlign: "center", margin: "10px" }}
            >
              Password cannot be empty.
            </p>
          )}
        </div>
        <button
          type="submit"
          id="test"
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
                username,password
              })

              if (response.status === 200) {
                navigate('/signupsuccessful');
              }
              else
              {
                setResult(await response.data);
                setShowDiv(true);
              }
            } catch(error){
                        console.log(error)
                        return(<h1>Some error occured, please check console logs for more details</h1>)
              
            }
          }}
        >
          SIGNUP
        </button>
      </div>
      {showDiv && (
        <div style={{ textAlign: "center", margin: "10px" }}>{result}</div>
      )}
    </div>
  );
};

export default Signup;

// neetcode1@gmail.com
