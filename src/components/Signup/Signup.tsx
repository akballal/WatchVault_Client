import React, { useState } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";

const backendUrl = "http://localhost:3000";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showDiv, setShowDiv] = useState(false);
  const [result, setResult] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const navigate = useNavigate();

  return (
    <div id="signup" className="flex-col">
      <h1>Signup</h1>
      <div className="signup-form">
        <div className="subform">
          <label htmlFor="email">Email: </label>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="text"
            required
            name="email"
            placeholder="Your Email"
            value={email}
          />
          {emailError && (
            <p
              className="error-message"
              style={{ textAlign: "center", margin: "10px" }}
            >
              Email cannot be empty.
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
              if (!email) {
                setEmailError(true);
                setPasswordError(false);
                return;
              } else if (!password) {
                setPasswordError(true);
                setEmailError(false);
                return;
              } else {
                setEmailError(false);
                setPasswordError(false);
              }
              setShowDiv(false);
              console.log(`${backendUrl}/signup`);
              console.log(email);
              console.log(password);
              const response = await fetch(`${backendUrl}/signup`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  email,
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
