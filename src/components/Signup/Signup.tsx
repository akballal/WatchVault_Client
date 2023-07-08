import React, { useState } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";

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
              console.log(`${backendUrl}/signup`);
              console.log(username);
              console.log(password);
              const response = await fetch(`${backendUrl}/signup`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  username,
                  password,
                }),
              });
              console.log(response.status);
              console.log(response.statusText);
              console.log(response.body);

              if (response.status === 200) {
                navigate('/signupsuccessful');
              }
              else
              {
                setResult(await response.text());
                setShowDiv(true);
                console.log(response);
              }
            } catch (error) {
              console.error("Signup failed:", error);
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
