import React, { useState } from "react";
import "/src/components/Signup/Signup.css";
import { useNavigate } from "react-router-dom";

const backendUrl = "http://localhost:3000";
const AddData = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [watchedon, setWatchedon] = useState("");
  const [rating, setRating] = useState("");
  const [type, setType] = useState("");
  const [showDiv, setShowDiv] = useState(false);
  const [result, setResult] = useState("");

  const navigate = useNavigate();

  return (
    <div id="signup" className="flex-col">
      <h1>Add Data</h1>
      <div className="signup-form">
        <div className="subform">
          <label htmlFor="name">Name: </label>
          <input
            onChange={(e) => {
              setName(e.target.value);
            }}
            type="text"
            required
            name="name"
            placeholder="Movie/Series Name"
          />
        </div>

        <div className="subform">
          <label htmlFor="description">Description: </label>
          <input
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            type="text"
            required
            name="description"
            placeholder="Movie/Series description"
          />
        </div>

        <div className="subform">
          <label htmlFor="watchedon">Watched on: </label>
          <input
            onChange={(e) => {
              setWatchedon(e.target.value);
            }}
            type="Date"
            required
            name="watchedon"
            placeholder="Movie/Series description"
          />
        </div>

        <div className="subform">
          <label htmlFor="rating">Rating: </label>
          <select
            onChange={(e) => {
              setRating(e.target.value);
            }}
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

        <div className="subform">
      <label htmlFor="type">Type: </label>
      <div>
        <label>
          <input
            type="radio"
            value="Movie"
            checked={type === 'Movie'}
            onChange={(e) => {
                setType(e.target.value);
              }}
            required
            name="type"
          />
          Movie
        </label>
        <label>
          <input
            type="radio"
            value="Series"
            checked={type === 'Series'}
            onChange={(e) => {
                setType(e.target.value);
              }}
            required
            name="type"
          />
          Series
        </label>
      </div>
    </div>

        <button
          type="submit"
          id="test"
          onClick={async (e) => {
            try {
                const response = await fetch(`${backendUrl}/adddata`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  name,description,watchedon,rating,type
                }),
              });

              if (response.status === 200) {
                setResult(await response.text());
                setShowDiv(true);
                
              } else {
                setResult(await response.text());
                setShowDiv(true);
                console.log(response);
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
