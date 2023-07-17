import React, { useState, useEffect } from "react";
import "/src/components/Signup/Signup.css";
import { useLocation, useNavigate,  } from "react-router-dom";
import jwt from 'jsonwebtoken';
import axios from 'axios'
import { Button, Card, FormControl, FormControlLabel, Radio, RadioGroup, Rating, TextField, Typography } from "@mui/material";
import { DatePicker, DesktopDateTimePicker } from "@mui/x-date-pickers";

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/en'; // Replace 'en' with the appropriate locale

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('en'); // Replace 'en' with the appropriate locale


const backendUrl = "http://localhost:3000";
const UpdateData = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [watchedon, setWatchedon] = useState(null);
  const [rating, setRating] = useState<number | null>(null);
  const [type, setType] = useState("");
  const [showDiv, setShowDiv] = useState(false);
  const [result, setResult] = useState("");
  const initialValues = {name:"", description:"", watchedon:"", rating:"", type:""};
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(initialValues);

  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  const token = localStorage.getItem("token");


  const init = async () => {
    try {
      const currentData =  await axios.get(`${backendUrl}/getrecord`,
      {
        headers: {
          id,
        authorization : localStorage.getItem("token")
        }
      })
        setName(currentData.data.result.name);
        setDescription(currentData.data.result.description);
        //setWatchedon(currentData.data.result.watchedon);
        setType(currentData.data.result.type);
        setRating(currentData.data.result.rating);
    } catch (error) {
      if(error.response.status === 403)
      {
        navigate("/login?message=Session expired, please Login !!")
      }
      else
      {
        console.log(error)
        return(<h1>Some error occured, please check console logs for more details</h1>)
      }
    }
  };

  useEffect(() => {
      init();
  }, []);

  const handleChange = (e) =>
  {
    const {name, value} = e.target;
    setFormValues({...formValues, [name]:value})
  }

  const decodeUser = () =>
  {
    try{
    const loggedInUser = localStorage.getItem("token");
    console.log(loggedInUser)
    }
    catch(e)
    {
      console.error(e)
    }
  }
  
  const validate = (values) =>
  {
    const errors = {};
    if(!name)
    {
      errors.name = "Movie/Series name cannot be empty!!"
    }
    if(!description)
    {
      errors.description = "Movie/Series description cannot be empty!!"
    }
    if(!watchedon)
    {
      errors.watchedon = "Date cannot be empty!!"
    }
    if(rating === null || !rating)
    {
      errors.rating = "Rating cannot be empty!!"
    }
    if(!type)
    {
      errors.type = "Please select if its a movie or series"
    }
    return errors;
  }

  return (
    <>
      <div style={{
        paddingTop: 90,
        marginBottom: 10,
        display: "flex",
        justifyContent: "center"
      }}>
        <Typography variant="h6">
          Update Data
        </Typography>
      </div>

      <div style={{ display: "flex", justifyContent: "center" ,paddingBlock:10}}>
        <Card variant="outlined" style={{ width: 400, padding: 20 }}>
          <TextField
            required
            onChange={(e) => setName(e.target.value)}
            fullWidth={true}
            label="Name"
            name="name"
            variant="outlined"
            value={name}
          />
          <p style={{ textAlign: "center", margin: "10px", color: "red" }}>
            {formErrors.name}
          </p>

          <TextField
            required
            onChange={(e) => setDescription(e.target.value)}
            fullWidth={true}
            name="description"
            label="Description"
            variant="outlined"
            value={description}
          />
          <p style={{ textAlign: "center", margin: "10px", color: "red" }}>
            {formErrors.description}
          </p>

          <DesktopDateTimePicker
            timezone="Asia/Kolkata"
            label="Watched on"
            onChange={(newValue) => setWatchedon(newValue)}
            value={watchedon}
          />
          <p style={{ textAlign: "center", margin: "10px", color: "red" }}>
            {formErrors.watchedon}
          </p>

          <FormControl>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {/* <FormLabel id="demo-row-radio-buttons-group-label">Type :</FormLabel>&nbsp;&nbsp; */}
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="type"
              onChange={(event) => setType(event.target.value)}
              value={type}
            >
              <FormControlLabel
                name="type"
                value="Movie"
                control={<Radio />}
                label="Movie"
              />
              <FormControlLabel
                name="type"
                value="Series"
                control={<Radio />}
                label="Series"
              />
            </RadioGroup>
            </div>
          </FormControl>
          <p style={{ textAlign: "center", margin: "10px", color: "red" }}>
            {formErrors.type}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent:"flex-start"}}>
          {/* <p>Rating:</p>&nbsp;&nbsp; */}
            <Rating
              name="rating"
              size="large"
              precision={0.5}
              onChange={(event) => setRating(event.target.value)}
              value={rating}
            />
          </div>
          <p style={{ textAlign: "center", margin: "10px", color: "red" }}>
            {formErrors.rating}
          </p>
          <br></br>

          <center>
          <Button
            size="large"
            variant="contained"
            onClick={async (e) => {
                        try {
                            e.preventDefault();
                            const fieldErrors = validate(formValues);
                            const user = localStorage.getItem("User");
                            if(Object.keys(fieldErrors).length !== 0) 
                            {
                            setFormErrors(fieldErrors);
                            console.log("formerrors -> ", formErrors)
                            return;
                            }
                            else{
                          const response = await axios.put(`${backendUrl}/updaterecord`,
                          {
                            id,name,description,watchedon,rating,type,user
                          },
                          {
                            headers: {
                              authorization: token
                            }
                          })
            
                          if (response.status === 200) {
                            setResult(await response.data);
                            setShowDiv(true);
                            
                          } else if(response.status === 403) {
                            navigate("/login?message=Session expired, please Login !!")
                          }
                          else {
                            setResult(await response.data);
                            setShowDiv(true);
                            console.log(response);
                          }
                        }} catch (error) {
                          if(error.response.status === 403)
                          {
                            navigate("/login?message=Session expired, please Login !!")
                          }
                          else
                          {
                            console.log(error)
                            return(<h1>Some error occured, please check console logs for more details</h1>)
                          }
                        }
                      }}
          >
            Update Data
          </Button></center>

          {showDiv && (
            <div style={{ textAlign: "center", margin: "10px" }}>
              {result}
            </div>
          )}
        </Card>
      </div>
    </>
  );
  // return (
  //   <div id="signup" className="flex-col">
  //     <h1>Update Data</h1>
  //     <div className="signup-form">
  //       <div className="subform">
  //         <label htmlFor="name">Name: </label>
  //         <input
  //           // onChange={(e) => {
  //           //   setName(e.target.value);
  //           // }}
  //           type="text"
  //           required
  //           name="name"
  //           placeholder="Movie/Series Name"
  //           onChange={handleChange}
  //           value={formValues.name}
  //         />
  //       </div>
  //       <p style={{ textAlign: "center", margin: "10px", color:"red"}}> {formErrors.name} </p>

  //       <div className="subform">
  //         <label htmlFor="description">Description: </label>
  //         <input
  //           onChange={handleChange}
  //           type="text"
  //           required
  //           name="description"
  //           placeholder="Movie/Series description"
  //           value={formValues.description}
  //         />
  //       </div>
  //       <p style={{ textAlign: "center", margin: "10px", color:"red" }}> {formErrors.description} </p>
  //       <div className="subform">
  //         <label htmlFor="watchedon">Watched on: </label>
  //         <input
  //           onChange={handleChange}
  //           type="Date"
  //           required
  //           name="watchedon"
  //           placeholder="Movie/Series description"
  //           value={formValues.watchedon}
  //         />
  //       </div>
  //       <p style={{ textAlign: "center", margin: "10px", color:"red" }}> {formErrors.watchedon} </p>
  //       <div className="subform">
  //         <label htmlFor="rating">Rating: </label>
  //         <select
  //           onChange={handleChange}
  //           value={rating}
  //           required
  //           name="rating"
  //           id="rating"
  //         >
  //           <option value="">Select a rating</option>
  //           <option value="1">1</option>
  //           <option value="2">2</option>
  //           <option value="3">3</option>
  //           <option value="4">4</option>
  //           <option value="5">5</option>
  //         </select>
  //       </div>
  //       <p style={{ textAlign: "center", margin: "10px", color:"red" }}> {formErrors.rating} </p>
  //       <div className="subform">
  //     <label htmlFor="type">Type: </label>
  //     <div>
  //       <label>
  //         <input
  //           type="radio"
  //           value="Movie"
  //           checked={type === 'Movie'}
  //           onChange={handleChange}
  //           required
  //           name="type"
  //         />
  //         Movie
  //       </label>
  //       <label>
  //         <input
  //           type="radio"
  //           value="Series"
  //           checked={type === 'Series'}
  //           onChange={handleChange}
  //           required
  //           name="type"
  //         />
  //         Series
  //       </label>
  //     </div>
  //     <p style={{ textAlign: "center", margin: "10px", color:"red" }}> {formErrors.type} </p>
  //   </div>

  //       <button
  //         type="submit"
  //         id="test"
  //         onClick={async (e) => {
  //           try {
  //               e.preventDefault();
  //               const fieldErrors = validate(formValues);
  //               const user = localStorage.getItem("User");
  //               if(Object.keys(fieldErrors).length !== 0) 
  //               {
  //               setFormErrors(fieldErrors);
  //               return;
  //               }
  //               else{
  //                 const {name, description, watchedon, rating, type} = formValues
  //                 console.log(formValues)
                  
  //             const response = await axios.put(`${backendUrl}/updaterecord`,
  //             {
  //               id,name,description,watchedon,rating,type,user
  //             },
  //             {
  //               headers: {
  //                 authorization: token
  //               }
  //             })

  //             if (response.status === 200) {
  //               setResult(await response.data);
  //               setShowDiv(true);
                
  //             } else if(response.status === 403) {
  //               navigate("/login?message=Session expired, please Login !!")
  //             }
  //             else {
  //               setResult(await response.data);
  //               setShowDiv(true);
  //               console.log(response);
  //             }
  //           }} catch (error) {
  //             if(error.response.status === 403)
  //             {
  //               navigate("/login?message=Session expired, please Login !!")
  //             }
  //             else
  //             {
  //               console.log(error)
  //               return(<h1>Some error occured, please check console logs for more details</h1>)
  //             }
  //           }
  //         }}
  //       >
  //         Update Data
  //       </button>
  //     </div>
  //     {showDiv && (
  //       <div style={{ textAlign: "center", margin: "10px" }}>{result}</div>
  //     )}
  //   </div>
  // );
};

export default UpdateData;

// neetcode1@gmail.com
