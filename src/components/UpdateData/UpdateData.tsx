import React, { useState, useEffect, useRef } from "react";
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
import {
  DatePicker,
  DateTimePicker,
  DesktopDateTimePicker,
} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import tz from "dayjs/plugin/timezone";
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
  const [trailer, setTrailer] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const fileInputRef = useRef(null);

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

      const date = currentData.data.watchedon;
      console.log(currentData.data);
      console.log(date);
      const localDate = dayjs(date).format("YYYY-MM-DD HH:mm:ss");
      console.log(localDate);
      console.log(typeof localDate);
      const localDateObject = dayjs(localDate);

      setName(currentData.data.name);
      setDescription(currentData.data.description);
      setWatchedon(localDateObject);
      setType(currentData.data.type);
      setRating(currentData.data.rating);
      setPhoto(currentData.data.photo);
      setTrailer(currentData.data.trailer);
    } catch (error) {
      console.log(error);
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

  const handleDeletePhoto = async () => {
    try {
      // Make an API call to delete the photo
      const response = await axios.delete(
        `${backendUrl}/data/deletephoto/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        // Photo deleted successfully, update state or show a message
        setPhoto(null);
      } else if (response.status === 403) {
        navigate("/login?message=Session expired, please Login !!");
      } else {
        console.log(response);
        // Handle other cases if needed
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 403) {
        navigate("/login?message=Session expired, please Login !!");
      } else {
        // Handle other errors
      }
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
          paddingTop: 20,
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
              console.log(newValue);
              const date = newValue.$d;
              const localDate = dayjs(date).format("YYYY-MM-DD HH:mm:ss");
              console.log(localDate);
              const localDateObject = dayjs(localDate);
              setWatchedon(localDateObject);
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
          <p style={{ textAlign: "center", margin: "10px", color: "red" }}>
            {formErrors.rating}
          </p>
          <center>
            <div>
              {photo && !selectedPhoto && (
                <img
                  src={`data:image/png;base64,${photo}`}
                  alt="Watched Photo"
                  style={{
                    width: "300px",
                    height: "150px",
                    marginBottom: "20px",
                  }}
                />
              )}
            </div>
            <div>
              {selectedPhoto && (
                <img
                  src={URL.createObjectURL(selectedPhoto)}
                  alt="Watched Photo"
                  style={{
                    width: "300px",
                    height: "150px",
                    marginBottom: "20px",
                  }}
                />
              )}
            </div>
            {photo && !selectedPhoto && (
              <Button
                style={{ marginBottom: "10px" }}
                size="small"
                variant="outlined"
                // color="secondary"
                onClick={() => {
                  setPhoto(null);
                }}
              >
                Remove Banner
              </Button>
            )}
            {selectedPhoto && (
              <Button
                style={{ marginBottom: "10px" }}
                size="small"
                variant="outlined"
                // color="secondary"
                onClick={() => {
                  setSelectedPhoto(null);
                  fileInputRef.current.value = ''; // Reset the file input
                }}
              >
                Clear Selection
              </Button>
            )}

            <input
             ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedPhoto(e.target.files[0])}
              style={{ marginBottom: "20px" }}
            />

            
          </center>

          <div>
            <TextField
              onChange={(e) => setTrailer(e.target.value)}
              fullWidth={true}
              label="Traier Link"
              name="trailer"
              variant="outlined"
              value={trailer}
            />
          </div>

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
                  console.log(id);
                  const user = localStorage.getItem("User");
                  console.log(user);
                  if (Object.keys(fieldErrors).length !== 0) {
                    setFormErrors(fieldErrors);
                    console.log("formerrors -> ", formErrors);
                    return;
                  } else {
                    console.log(watchedon);
                    const date = watchedon.$d;
                    const watchedon_date = dayjs(date).format(
                      "YYYY-MM-DD HH:mm:ss"
                    );
                    console.log(watchedon_date);
                    const formData = new FormData();
                    formData.append("dataid", id);
                    formData.append("name", name);
                    formData.append("description", description);
                    formData.append("watchedon", watchedon_date);
                    formData.append("rating", rating);
                    formData.append("type", type);
                    formData.append("trailer", trailer);
                    formData.append("username", user);
                    if (selectedPhoto) {
                      formData.append("photo", selectedPhoto);
                    }

                    const response = await axios.put(
                      `${backendUrl}/data/updatedata`,
                      formData,
                      {
                        headers: {
                          Authorization: `Bearer ${token}`,
                          "Content-Type": "multipart/form-data",
                        },
                      }
                    );

                    if (response.status === 200) {
                      //setResult(await response.data);
                      //setShowDiv(true);
                      navigate("/watchhistory");
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
                  console.log(error);
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
};
export default UpdateData;
