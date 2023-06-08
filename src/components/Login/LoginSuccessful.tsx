import { Link, useNavigate } from "react-router-dom"


const LoginSuccessful = () =>
{
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
      };

    return (
        <div>
        <h1>Logged In, Welcome to your zone!!</h1>
        <Link to="/adddata">Add Data</Link>
        <br></br>
        <br></br>
        <button onClick={handleLogout}>logout</button>
        </div>
    )
}

export default LoginSuccessful