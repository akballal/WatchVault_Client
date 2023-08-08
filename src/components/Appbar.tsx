import { Button, Typography } from "@mui/material";
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
const token = localStorage.getItem("token");
const backendUrl = "http://localhost:3000";


function Appbar ()
{
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
            padding: 4
        }}>
            <div>
                <Typography variant={"h6"}>Movie Repo</Typography>
            </div>
    
            <div style={{display: "flex"}}>
                <div>
                    {userEmail}
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
                            navigate("/signup")
                        }}
                    >Signup</Button>
                </div>
                <div>
                    <Button
                        size="small" variant="text"
                        onClick={() => {
                            navigate("/signin")
                        }}
                    >Signin</Button>
                </div>
            </div>
        </div>
    }
}

export default Appbar