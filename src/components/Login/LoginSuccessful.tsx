import { Link, useNavigate } from "react-router-dom"


const LoginSuccessful = () =>
{
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
      };
    
      const loggedInUser = localStorage.getItem("user");
      if (loggedInUser) {
        
    return (
        <div>
        <h1>Logged In, Welcome to your zone!!</h1>
        <Link to="/adddata">Add Data</Link> &nbsp; <Link to={"/problemset/all/"}>Watch History</Link>
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