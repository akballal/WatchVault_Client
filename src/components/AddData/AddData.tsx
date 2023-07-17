import React, { useState } from "react";
import "/src/components/Signup/Signup.css";
import { useNavigate } from "react-router-dom";
import jwt from "jsonwebtoken";
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
import {  DesktopDateTimePicker } from "@mui/x-date-pickers";



const backendUrl = "http://localhost:3000";

const AddData = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [watchedon, setWatchedon] = useState(null);
  const [rating, setRating] = useState<number | null>(null);
  const [type, setType] = useState("");
  const [showDiv, setShowDiv] = useState(false);
  const [result, setResult] = useState("");
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
                const token = localStorage.getItem("token");
                if (Object.keys(fieldErrors).length !== 0) {
                  setFormErrors(fieldErrors);
                  console.log(formErrors)
                  console.log(rating)
                  return;
                } else {
                  const response = await axios.post(
                    `${backendUrl}/adddata`,
                    {
                      name,
                      description,
                      watchedon,
                      rating,
                      type,
                    },
                    {
                      headers: {
                        authorization: token,
                      },
                    }
                  );

                  if (response.status === 200) {
                    setResult(response.data);
                    setShowDiv(true);
                  } else if (response.status === 403) {
                    navigate("/login?message=Session expired, please Login !!");
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
