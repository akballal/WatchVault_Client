import React, { useEffect, useState } from "react";
import "/src/components/Signup/Signup.css";
import { Link, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";



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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Convert to seconds

      if (decodedToken.exp > currentTime) {
        navigate("/loginsuccessful");
      }
    }
  }, []);
  
  return (
    <div id="signup" className="flex-col">
      <h1>Login</h1>
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
              console.log(`${backendUrl}/login`);
              console.log(username);
              console.log(password);
              const response = await fetch(`${backendUrl}/login`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  username,
                  password,
                }),
              });

              if (response.status === 200) {
                // set the state of the user
                // store the user in localStorage
                const responseJson = await response.json();
                localStorage.setItem("token", responseJson.token);
                localStorage.setItem("User", responseJson.User);
                navigate("/loginsuccessful");
              } else {
                setResult(await response.text());
                setShowDiv(true);
                console.log(response);
              }
            } catch (error) {
              console.error("Login failed:", error);
            }
          }}
        >
          LOGIN
        </button>
        <br></br>
        <br></br>
        <div>
      <Link to="/">Homepage</Link>{' '}
      <Link to="/signup">Signup</Link>
    </div>
      </div>
      {showDiv && (
        <div style={{ textAlign: "center", margin: "10px" }}>{result}</div>
      )}
    </div>
  );
};

export default Login;

// neetcode1@gmail.com
