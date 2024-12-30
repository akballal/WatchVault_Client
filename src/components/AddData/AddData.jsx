import React, { useState } from "react";
import "/src/components/Signup/Signup.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {
  Button,
  Card,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Rating,
  TextField,
  Typography,
} from "@mui/material";

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import tz from 'dayjs/plugin/timezone';
import { DateTimePicker } from "@mui/x-date-pickers";
import { BASE_URL } from "../../config/apiConfig";

dayjs.extend(utc);
dayjs.extend(tz);





const AddData = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [watchedon, setWatchedon] = useState(null);
  const [rating, setRating] = useState(null);
  const [type, setType] = useState("");
  const [showDiv, setShowDiv] = useState(false);
  const [result, setResult] = useState("");
  const [photo, setPhoto] = useState(null);
  const [trailer, setTrailer] = useState(null);
  
  const initialValues = {
    name: "",
    description: "",
    watchedon: "",
    rating: '',
    type: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(initialValues);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const decodeUser = () => {
    try {
      const loggedInUser = localStorage.getItem("token");
      console.log(loggedInUser);
    } catch (e) {
      console.error(e);
    }
  };

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
    if (!rating) {
      errors.rating = "Rating cannot be empty!!";
    }
    if (!type) {
      errors.type = "Please select if it's a movie or series";
    }
    return errors;
  };

  
  
  return (
    <>
      <div style={{
        paddingTop: 90,
        marginBottom: 10,
        display: "flex",
        justifyContent: "center"
      }}>
        <Typography variant="h6">
          Add Data
        </Typography>
      </div>

      <div style={{ display: "flex", justifyContent: "center" ,paddingBlock:10}}>
        <Card variant="outlined" style={{ width: 400, padding: 20 }}>
          <TextField
            onChange={(e) => setName(e.target.value)}
            fullWidth={true}
            label="Name*"
            name="name"
            variant="outlined"
            value={name}
          />
          <p style={{ textAlign: "center", margin: "10px", color: "red" }}>
            {formErrors.name}
          </p>

          <TextField
            onChange={(e) => setDescription(e.target.value)}
            fullWidth={true}
            name="description"
            label="Description*"
            variant="outlined"
            value={description}
          />
          <p style={{ textAlign: "center", margin: "10px", color: "red" }}>
            {formErrors.description}
          </p>

          <DateTimePicker
          label="Watched On*"
          timezone="Asia/Kolkata"
          ampm={false}
          disableFuture
          onChange={(newValue) => {
            
             const date = newValue.$d
             const localDate = dayjs(date).format("YYYY-MM-DD HH:mm:ss")
             console.log(date);
             console.log(localDate);
           //const date = dayjs(newValue.$d);
    
    // Convert local date to UTC date without offset
    //const utcDate = date.utc().format("YYYY-MM-DD HH:mm:ss");

            setWatchedon(localDate)
          }}
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

         <label
              htmlFor="photoInput"
              className="cursor-pointer block text-gray-600 font-bold"
            >
              Upload Banner
            </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files[0])}
            style={{ margin: "10px 0" }}
          /> 

<TextField
            onChange={(e) => setTrailer(e.target.value)}
            fullWidth={true}
            name="trailer"
            label="Trailer link"
            variant="outlined"
            value={trailer}
            style={{marginBottom:"10px"}}

          />
          <br></br>

          <center>
          <Button
            size="large"
            variant="contained"
            disabled={!name || !description || !watchedon || !rating || !type}
            onClick={async (e) => {
              try {
                console.log("Watched On => ", watchedon)
                e.preventDefault();
                const fieldErrors = validate(formValues);
                const token = localStorage.getItem("token");
                if (Object.keys(fieldErrors).length !== 0) {
                  setFormErrors(fieldErrors);
                  console.log(formErrors)
                  console.log(rating)
                  return;
                } else {

                  const formData = new FormData();
                  formData.append("name", name);
                  formData.append("description", description);
                  formData.append("watchedon", watchedon);
                  formData.append("rating", rating);
                  formData.append("type", type);
                  formData.append("photo", photo);
                  formData.append("trailer", trailer);

                  console.log(trailer);

                  const response = await axios.post(
                    `${BASE_URL}/data/adddata`,
                    formData,
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                      },
                    }
                  );

                  if (response.status === 200) {
                    // setFormErrors(fieldErrors);
                    // setResult(response.data);
                    // setShowDiv(true);
                    navigate(
                      "/watchhistory"
                    );
                  } else if (response.status === 403) {
                    navigate("/login?message=Session expired, please Login !!");
                  } else {
                    setResult(await response.data);
                    setShowDiv(true);
                    console.log(response);
                  }
                }
              } catch (error) {
                console.log(error)
                if (error.response.status === 403) {
                  if(error.code === "ERR_BAD_REQUEST")
                  {
                    setResult("Bad Request, Please check console logs for more details")
                    setShowDiv(true)
                  }
                  else
                  {
                  navigate("/login?message=Session expired, please Login !!");
                  }
                } else {
                  console.log(error);
                  return (
                    <h1>
                      Some error occurred, please check console logs for more details
                    </h1>
                  );
                }
              }
            }}
          >
            Add Data
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
};

export default AddData;
