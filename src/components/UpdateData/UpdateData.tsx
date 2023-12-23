import React, { useState, useEffect } from "react";
import "/src/components/Signup/Signup.css";
import { useLocation, useNavigate } from "react-router-dom";
import jwt from "jsonwebtoken";
import axios from "axios";
import {
  Button,
  Card,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, DateTimePicker, DesktopDateTimePicker } from "@mui/x-date-pickers";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import tz from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(tz);

const backendUrl = "http://localhost:8080";
const UpdateData = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [watchedon, setWatchedon] = useState<string | null>(null);
  const [rating, setRating] = useState<number | null>(null);
  const [type, setType] = useState("");
  const [showDiv, setShowDiv] = useState(false);
  const [result, setResult] = useState("");
  const [photo, setPhoto] = useState(null);
  const initialValues = {
    name: "",
    description: "",
    watchedon: "",
    rating: "",
    type: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(initialValues);

  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  const token = localStorage.getItem("token");

  const init = async () => {
    try {
      const currentData = await axios.get(`${backendUrl}/data/getdatabyid`, {
        headers: {
          id,
          Authorization: `Bearer ${token}`,
        },
      });

     const date = currentData.data.watchedon
     console.log(currentData.data)
     console.log(date)
     const localDate = dayjs(date).format("YYYY-MM-DD HH:mm:ss")
     console.log(localDate)
     console.log(typeof(localDate))
     const localDateObject = dayjs(localDate)

     
      setName(currentData.data.name);
      setDescription(currentData.data.description);
      setWatchedon(localDateObject);
      setType(currentData.data.type);
      setRating(currentData.data.rating);
      setPhoto(currentData.data.photo);
    } catch (error) {
      console.log(error)
      if (error.response.status === 403) {
        navigate("/login?message=Session expired, please Login !!");
      } else {
        console.log(error);
        // Handle the error or navigate here without returning JSX
      }
    }
  };

  useEffect(() => {
    init();
  }, []);

  const validate = (values) => {
    const errors = {};
    if (!name) {
      errors.name = "Movie/Series name cannot be empty!!";
    }
    if (!description) {
      errors.description = "Movie/Series description cannot be empty!!";
    }
    if (!watchedon) {
      errors.watchedon = "Date cannot be empty!!";
    }
    if (rating === null || !rating) {
      errors.rating = "Rating cannot be empty!!";
    }
    if (!type) {
      errors.type = "Please select if its a movie or series";
    }
    return errors;
  };

  return (
    <>
      <div
        style={{
          paddingTop: 90,
          marginBottom: 10,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6">Update Data</Typography>
      </div>

      <div
        style={{ display: "flex", justifyContent: "center", paddingBlock: 10 }}
      >
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

          <DateTimePicker
          label="Watched On"
          timezone="Asia/Kolkata"
          ampm={false}
          disableFuture
          onChange={(newValue) => {
            console.log(newValue)
            const date = newValue.$d
            const localDate = dayjs(date).format("YYYY-MM-DD HH:mm:ss")
            console.log(localDate)
            const localDateObject = dayjs(localDate)
            setWatchedon(localDateObject)
          }}
          value={watchedon}
          />
          <p style={{ textAlign: "center", margin: "10px", color: "red" }}>
            {formErrors.watchedon}
          </p>

          <FormControl>
            <div style={{ display: "flex", alignItems: "center" }}>
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

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            {/* <p>Rating:</p>&nbsp;&nbsp; */}
            <Rating
              name="rating"
              size="large"
              precision={0.5}
              onChange={(event) => setRating(event.target.value)}
              value={rating}
            />
          </div>
          <center>
          <div>
          {photo ? (
    <img
      src={`data:image/png;base64,${photo}`}
      alt="Watched Photo"
      style={{ width: "300px", height: "150px", marginBottom: "10px" }}
    />
  ) : (
    <img
                      src="src\assets\default_Image.jpg" // Assuming data.photo contains the direct photo URL
                      alt="Watched Photo"
                      style={{ width: "300px", height: "150px", marginBottom: "10px" }}
                    />
  )}
          </div></center>
          <p style={{ textAlign: "center", margin: "10px", color: "red" }}>
            {formErrors.rating}
          </p>
          <br></br>

          <center>
            <Button
              size="large"
              variant="contained"
              disabled={!name || !description || !watchedon || !rating || !type}
              onClick={async (e) => {
                try {
                  e.preventDefault();
                  const fieldErrors = validate(formValues);
                  console.log(id)
                  const user = localStorage.getItem("User");
                  console.log(user)
                  if (Object.keys(fieldErrors).length !== 0) {
                    setFormErrors(fieldErrors);
                    console.log("formerrors -> ", formErrors);
                    return;
                  } else {

                    console.log(watchedon)
                    const date = watchedon.$d
                    const watchedon_date = dayjs(date).format("YYYY-MM-DD HH:mm:ss")
                    console.log(watchedon_date)
                    const response = await axios.put(
                      `${backendUrl}/data/updatedata`,
                      {
                        dataid:id,
                        name,
                        description,
                        watchedon:watchedon_date,
                        rating,
                        type,
                        username:user,
                      },
                      {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      }
                    );

                    if (response.status === 200) {
                      //setResult(await response.data);
                      //setShowDiv(true);
                      navigate(
                        "/watchhistory"
                      );
                    } else if (response.status === 403) {
                      navigate(
                        "/login?message=Session expired, please Login !!"
                      );
                    } else {
                      setResult(await response.data);
                      setShowDiv(true);
                      console.log(response);
                    }
                  }
                } catch (error) {
                  if (error.response.status === 403) {
                    navigate("/login?message=Session expired, please Login !!");
                  } else {
                    console.log(error);
                    return (
                      <h1>
                        Some error occured, please check console logs for more
                        details
                      </h1>
                    );
                  }
                }
              }}
            >
              Update Data
            </Button>
          </center>

          {showDiv && (
            <div style={{ textAlign: "center", margin: "10px" }}>{result}</div>
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
