import { Link, useNavigate } from "react-router-dom"
import { useEffect } from "react";
import jwtDecode from "jwt-decode";
const backendUrl = "http://localhost:8080";
import axios from 'axios'

const LoginSuccessful = () =>
{
  const navigate = useNavigate();

      useEffect(() => {
        (async () => {
          try {
            const response = await axios.post(
              `${backendUrl}/user/authenticate`,
              {},
              {
                headers: {
                  token: localStorage.getItem("token")
                }
              }
            );
            console.log(response.status)
            if (response.status === 403) {
              navigate("/login?message=Session expired, please Login !!")
            }
          } catch (error) {
            console.log(error)
            console.log(error.response.status)
            if(error.response.status === 403)
            {
              navigate("/login?message=Session expired, please Login !!")
            }
            else
            {
              console.log(error)
              return(<h1>Some error occured, please check console logs for more details</h1>)
            }
          }
        })();
      }, []);
    
    const handleLogout = () => {
        localStorage.clear();
        window.location = "/login";
        //navigate('/login');
      };
    
      const loggedInUser = localStorage.getItem("token");
      if (loggedInUser) {
        
    return (
        <div style={{ marginTop: "50px" }}>
          <center>
        <h1>Welcome to your zone!!</h1>
        <Link to="/adddata">Add Data</Link> &nbsp; <Link to={"/watchhistory"}>Watch History</Link>
        <br></br>
        <br></br>
        {/* <button onClick={handleLogout}>logout</button> */}
        </center>
        </div>
    )
}
else{
    return(
        <>
        <h1>Session expired, please login</h1>
        
        <Link to='/login'>Login</Link>
        </>
    )
}
}

export default LoginSuccessful