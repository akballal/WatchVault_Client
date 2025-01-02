import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../config/apiConfig";
import "./LoginSuccessful.css"; // Importing CSS file

const LoginSuccessful = () => {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.post(
          `${BASE_URL}/user/authenticate`,
          {},
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        if (response.status === 403) {
          navigate("/login?message=Session expired, please Login !!");
        }
      } catch (error) {
        console.error(error);
        if (error.response && error.response.status === 403) {
          navigate("/login?message=Session expired, please Login !!");
        } else {
          console.error("Unexpected error occurred.");
        }
      }
    })();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    window.location = "/login";
  };

  const loggedInUser = localStorage.getItem("token");

  if (loggedInUser) {
    return (
      <div className="container">
        <h1 className="header">Welcome to Your Zone!</h1>
        <Link to="/adddata" className="link-button">
          Add Data
        </Link>
        <Link to="/watchhistory" className="link-button">
          Watch History
        </Link>
      </div>
    );
  } else {
    return (
      <div className="container">
        <h1 className="header">Session Expired</h1>
        <Link to="/login" className="link-button">
          Login
        </Link>
      </div>
    );
  }
};

export default LoginSuccessful;