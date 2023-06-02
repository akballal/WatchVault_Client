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
import "./App.css";
function App() {
  // React learning:
  // let items = ["Red", "Yellow", "Pink", "Orange"];
  // let bs = [
  //   "Primary",
  //   "Secondary",
  //   "Success",
  //   "Danger",
  //   "Warning",
  //   "Info",
  //   "Light",
  //   "Dark",
  // ];
  // let bt_obj = [
  //   {
  //     name: "Primary",
  //     classname: "btn btn-primary",
  //   },
  //   {
  //     name: "Secondary",
  //     classname: "btn btn-secondary",
  //   },
  //   {
  //     name: "Success",
  //     classname: "btn btn-success",
  //   },
  // ];
  // function handleButtonclick() {}
  // let [visible, setvisibility] = useState(true);
  // let [children, setChildren] = useState("Initial Value");
  // function handleAlert() {
  //   setvisibility(true);
  //   setChildren("changing alert message");
  // }
  // return (
  //   <div>
  //     {visible && (
  //       <Alert children={children} OnClose={() => setvisibility(false)} />
  //     )}
  //     <ListGroups
  //       items={items}
  //       heading="Colors"
  //       onSelectItem={(item) => console.log(item)}
  //     />
  //     <Button onClick={handleAlert} Buttons={bt_obj} />
  //   </div>
  // );

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/problemset/all/" element={<AllProblems />} />
        {/* <Route path="/problems/:pid/" element={<ProblemsPage />} />
        <Route path="*" element={<div>404 Not Found</div>} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
