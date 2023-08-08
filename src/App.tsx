import { useState } from "react";
import Alert from "./components/Alert";
import Button from "./components/Button";
import ListGroups from "./components/ListGroups";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/Homepage/Homepage";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import WatchHistory from "./components/WatchHistory/WatchHistory";
import SignupSuccessful from "./components/Signup/SignupSuccessful";
import LoginSuccessful from "./components/Login/LoginSuccessful";
import AddData from "./components/AddData/AddData";
import UpdateData from "./components/UpdateData/UpdateData";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'


import "./App.css";
import Appbar from "./components/Appbar";
function App({ children }) {
  return (
    <div style={{width: "100vw",
            height: "100vh",
            backgroundColor: "#eeeeee"}}
        >
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {children}
      <Appbar />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/watchhistory" element={<WatchHistory />} />
        <Route path="/signupsuccessful" element={<SignupSuccessful/>} />
        <Route path="/loginsuccessful" element={<LoginSuccessful/>} />
        <Route path="/adddata" element={<AddData/>} />
        <Route path="/updatedata" element={<UpdateData/>} />
      </Routes>
    </BrowserRouter>
    </LocalizationProvider>
    </div>
    
  );
}

export default App;
