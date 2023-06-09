import { useState } from "react";
import Alert from "./components/Alert";
import Button from "./components/Button";
import ListGroups from "./components/ListGroups";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/Homepage/Homepage";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import AllProblems from "./components/AllProblems/AllProblems";
import SignupSuccessful from "./components/Signup/SignupSuccessful";
import LoginSuccessful from "./components/Login/LoginSuccessful";
import AddData from "./components/AddData/AddData";
import "./App.css";
function App() {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/problemset/all/" element={<AllProblems />} />
        <Route path="/signupsuccessful" element={<SignupSuccessful/>} />
        <Route path="/loginsuccessful" element={<LoginSuccessful/>} />
        <Route path="/adddata" element={<AddData/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
