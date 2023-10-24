import { Button, Typography } from "@mui/material";
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
const token = localStorage.getItem("token");
const backendUrl = "http://localhost:3000";


const Appbar = () =>
{
    //const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState(null);
    
    const init = async () => {
        try {
            const response = await axios.get(`${backendUrl}/authenticate`, {
                headers: {
                  authorization: token
                }
              });
          setUserEmail(response.data.username)
        } catch (error) {
          console.log(error)
        }
      };
    
      useEffect(() => {
        init();
      }, []);
    
      if (userEmail) {
        return <div style={{
            display: "flex",
            justifyContent: "space-between",
            padding: 4,
            color: "red"
        }}>
            <div>
                <Typography variant={"h6"}>Movie Repo</Typography>
            </div>
    
            <div style={{display: "flex"}}>
                <div>
                    <b>{userEmail}</b>
                </div>
                <div style={{marginRight: 10}}>
                    <Button
                        size="small" variant="text"
                        onClick={() => {
                            localStorage.setItem("token", null);
                            window.location = "/";
                        }}
                    >Logout</Button>
                </div>
            </div>
        </div>
    } else {
        return <div style={{
            display: "flex",
            justifyContent: "space-between",
            padding: 4,
            color: "white"
        }}>
            <div>
                <Typography variant={"h6"}>Movie Repo</Typography>
            </div>
    
            <div style={{display: "flex"}}>
                <div style={{marginRight: 10}}>
                    <Button
                        size="small" variant="text" style={{ color: 'white' }}
                        onClick={() => {
                            window.location = "/signup";
                           // navigate("/signup")
                        }}
                    >Signup</Button>
                </div>
                <div>
                    <Button
                        size="small" variant="text" style={{ color: 'white' }}
                        onClick={() => {
                            window.location = "/login";
                            //navigate("/login")
                        }}
                    >Login</Button>
                </div>
            </div>
        </div>
    }
}

export default Appbar