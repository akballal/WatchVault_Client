import { Link, useNavigate } from "react-router-dom"
import { useEffect } from "react";
import jwtDecode from "jwt-decode";

const LoginSuccessful = () =>
{
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
          const decodedToken = jwtDecode(token);
          const currentTime = Date.now() / 1000; // Convert to seconds
    
          if (decodedToken.exp < currentTime) {
            navigate("/login");
          }
        }
      }, []);
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
      };
    
      const loggedInUser = localStorage.getItem("token");
      if (loggedInUser) {
        
    return (
        <div>
        <h1>Logged In, Welcome to your zone!!</h1>
        <Link to="/adddata">Add Data</Link> &nbsp; <Link to={"/watchhistory"}>Watch History</Link>
        <br></br>
        <br></br>
        <button onClick={handleLogout}>logout</button>
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