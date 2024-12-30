import { Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import backgroundImage from '/src/assets/bg-image.jpg';
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../config/apiConfig";



const HomePage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.post(
          `${BASE_URL}/user/authenticate`,
          {},
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        );
  
        if (response.status === 200) {
          navigate("/loginsuccessful");
        }
      } catch(error){

                  console.log(error)
                  return(<h1>Some error occured, please check console logs for more details</h1>)

      }
    })();
  }, []);

  
  return (
    <div>
    <div style={{
      paddingTop: 150,
      marginBottom: 10,
      display: "flex",
      justifyContent: "center"
    }}>
      <Typography variant={"h6"}>
        Welcome to WatchVault, Here you can save all your movie/series watch history.
      </Typography>
    </div>
    <div style={{
      display: "flex",
      justifyContent: "center"
    }}>
      {/* <Link to="/signup">Signup</Link> &nbsp; <Link to="/login">Login</Link> */}
    </div>
  </div>
      
    
  );
};

export default HomePage;
