import { Button, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const token = localStorage.getItem("token");

import { BASE_URL } from '../config/apiConfig';


const Appbar = () => {
  //const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState(null);

  const init = async () => {
    try {
      console.log(token);
      const response = await axios.post(
        `${BASE_URL}/user/authenticate`,
        {},
        {
          headers: {
            token: token,
          },
        }
      );
      console.log(response);
      setUserEmail(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    init();
  }, []);

  if (userEmail) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 4,
        }}
      >
        <div>
          <Typography variant={"h6"}><b>WatchVault</b></Typography>
        </div>

        <div style={{ display: "flex" }}>
          <div>
            <b>{userEmail}</b>
          </div>
          <div style={{ marginRight: 10 }}>
            <Button
              size="small"
              variant="text"
              onClick={() => {
                localStorage.setItem("token", null);
                window.location = "/";
              }}
            >
              <b>Logout</b>
            </Button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 4,
        }}
      >
        <div>
          <Typography variant={"h6"}><b>WatchVault</b></Typography>
        </div>

        <div style={{ display: "flex" }}>
          <div style={{ marginRight: 10 }}>
            <Button
              size="small"
              variant="text"
              onClick={() => {
                window.location = "/signup";
                // navigate("/signup")
              }}
            >
              <b>Signup</b>
            </Button>
          </div>
          <div>
            <Button
              size="small"
              variant="text"
              onClick={() => {
                window.location = "/login";
                //navigate("/login")
              }}
            >
              <b>Login</b>
            </Button>
          </div>
        </div>
      </div>
    );
  }
};

export default Appbar;
