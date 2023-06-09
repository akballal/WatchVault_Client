import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to my app 'Movie Repo'.</h1>
      <p> Here you can save all your movie/series watch history.</p>
      <Link to="/signup">Signup</Link> &nbsp; <Link to="/login">Login</Link>
    </div>
  );
};

export default HomePage;
