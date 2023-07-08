import React, { useState } from "react";
import "/src/components/Signup/Signup.css";
import { useNavigate } from "react-router-dom";
import jwt from "jsonwebtoken";

const backendUrl = "http://localhost:3000";
const AddData = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [watchedon, setWatchedon] = useState("");
  const [rating, setRating] = useState("");
  const [type, setType] = useState("");
  const [showDiv, setShowDiv] = useState(false);
  const [result, setResult] = useState("");
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
    if (!values.name) {
      errors.name = "Movie/Series name cannot be empty!!";
    }
    if (!values.description) {
      errors.description = "Movie/Series description cannot be empty!!";
    }
    if (!values.watchedon) {
      errors.watchedon = "Date cannot be empty!!";
    }
    if (!values.rating) {
      errors.rating = "Rating cannot be empty!!";
    }
    if (!values.type) {
      errors.type = "Please select if its a movie or series";
    }
    return errors;
  };

  return (
    <div id="signup" className="flex-col">
      <h1>Add Data</h1>
      <div className="signup-form">
        <div className="subform">
          <label htmlFor="name">Name: </label>
          <input
            // onChange={(e) => {
            //   setName(e.target.value);
            // }}
            type="text"
            required
            name="name"
            placeholder="Movie/Series Name"
            onChange={handleChange}
            value={formValues.name}
          />
        </div>
        <p style={{ textAlign: "center", margin: "10px", color: "red" }}>
          {" "}
          {formErrors.name}{" "}
        </p>

        <div className="subform">
          <label htmlFor="description">Description: </label>
          <input
            onChange={handleChange}
            type="text"
            required
            name="description"
            placeholder="Movie/Series description"
            value={formValues.description}
          />
        </div>
        <p style={{ textAlign: "center", margin: "10px", color: "red" }}>
          {" "}
          {formErrors.description}{" "}
        </p>
        <div className="subform">
          <label htmlFor="watchedon">Watched on: </label>
          <input
            onChange={handleChange}
            type="Date"
            required
            name="watchedon"
            placeholder="Movie/Series description"
            value={formValues.watchedon}
          />
        </div>
        <p style={{ textAlign: "center", margin: "10px", color: "red" }}>
          {" "}
          {formErrors.watchedon}{" "}
        </p>
        <div className="subform">
          <label htmlFor="rating">Rating: </label>
          <select
            onChange={handleChange}
            value={rating}
            required
            name="rating"
            id="rating"
          >
            <option value="">Select a rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <p style={{ textAlign: "center", margin: "10px", color: "red" }}>
          {" "}
          {formErrors.rating}{" "}
        </p>
        <div className="subform">
          <label htmlFor="type">Type: </label>
          <div>
            <label>
              <input
                type="radio"
                value="Movie"
                checked={type === "Movie"}
                onChange={handleChange}
                required
                name="type"
              />
              Movie
            </label>
            <label>
              <input
                type="radio"
                value="Series"
                checked={type === "Series"}
                onChange={handleChange}
                required
                name="type"
              />
              Series
            </label>
          </div>
          <p style={{ textAlign: "center", margin: "10px", color: "red" }}>
            {" "}
            {formErrors.type}{" "}
          </p>
        </div>

        <button
          type="submit"
          id="test"
          onClick={async (e) => {
            try {
              e.preventDefault();
              const fieldErrors = validate(formValues);
              const user = localStorage.getItem("User");
              const token = localStorage.getItem("token");
              if (Object.keys(fieldErrors).length !== 0) {
                setFormErrors(fieldErrors);
                return;
              } else {
                const { name, description, watchedon, rating, type } =
                  formValues;
                console.log(formValues);
                const response = await fetch(`${backendUrl}/adddata`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    "authorization":token
                  },
                  body: JSON.stringify({
                    name,
                    description,
                    watchedon,
                    rating,
                    type
                  }),
                });

                if (response.status === 200) {
                  setResult(await response.text());
                  setFormValues(initialValues);
                  setShowDiv(true);
                } else {
                  setResult(await response.text());
                  setShowDiv(true);
                  console.log(response);
                }
              }
            } catch (error) {
              console.error("Signup failed:", error);
            }
          }}
        >
          Add Data
        </button>
      </div>
      {showDiv && (
        <div style={{ textAlign: "center", margin: "10px" }}>{result}</div>
      )}
    </div>
  );
};

export default AddData;

// neetcode1@gmail.com
