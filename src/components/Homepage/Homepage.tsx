import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
    <div style={{
      paddingTop: 150,
      marginBottom: 10,
      display: "flex",
      justifyContent: "center"
    }}>
      <Typography variant={"h6"}>
        Welcome to Movie-Repo, Here you can save all your movie/series watch history.
      </Typography>
    </div>
    <div style={{
      display: "flex",
      justifyContent: "center"
    }}>
      <Link to="/signup">Signup</Link> &nbsp; <Link to="/login">Login</Link>
    </div>
  </div>
      
    
  );
};

export default HomePage;
