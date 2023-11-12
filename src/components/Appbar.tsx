import { Button, Typography } from "@mui/material";
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
const token = localStorage.getItem("token");
const backendUrl = "http://localhost:8080";


const Appbar = () =>
{
    //const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState(null);
    
    const init = async () => {
        try {
            console.log(token)
            const response = await axios.post(
                `${backendUrl}/user/authenticate`,
                {},
                {
                  headers: {
                    token: token
                  }
                }
              );
              console.log(response)
          setUserEmail(response.data)
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
            padding: 4
        }}>
            <div>
                <Typography variant={"h6"}>Movie Repo</Typography>
            </div>
    
            <div style={{display: "flex"}}>
                <div style={{marginRight: 10}}>
                    <Button
                        size="small" variant="text"
                        onClick={() => {
                            window.location = "/signup";
                           // navigate("/signup")
                        }}
                    >Signup</Button>
                </div>
                <div>
                    <Button
                        size="small" variant="text" 
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