import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom"

const SignupSuccessful = () =>
{
    const location = useLocation();
    const data = location.state && location.state.data;
    return (
        <div>
        <h1>Signed up successfully !!</h1>
        <Link to="/login">Login Now</Link> 
        </div>
    )
}

export default SignupSuccessful