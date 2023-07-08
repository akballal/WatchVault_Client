import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./WatchHistory.css";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
const backendUrl = "http://localhost:3000";

const WatchHistory = () => {
  const navigate = useNavigate();
  const [allData, setallData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const token = localStorage.getItem("token");
  
  const init = async () => {
    const response = await fetch(`${backendUrl}/alldata`, {
      method: "GET",
      headers: {
        "authorization":token
      },
    });

    const json = await response.json();
    console.log("json problems => " + json.problems);
    setallData(json.problems);
    console.log("json => " + json);
    console.log(response.status)
    if (response.status === 403) {
      navigate("/login"); // Redirect to login page
      return;
    }
  };

  useEffect(() => {
    init();
    }, [navigate]);

  const handleUpdate = (id: any) => {
    console.log("Update data with id:", id);
    navigate("/updatedata", { state: { id: id } });
  };

  const handleDelete = async (id: any) => {
    console.log("Delete data with id:", id);
    try {
      const response = await fetch(`${backendUrl}/deleterecord`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "authorization":token
        },
        body: JSON.stringify({
          id,
        }),
      });
      if (response.status !== 200) 
      {
        console.log(response);
      }
      else
      {
        setallData(prevData => prevData.filter(data => data._id !== id));
      }
    } catch (error) {
      console.error("Error in deleting record: ", error);
    }
  };

  const handleFilters = async () => {
    console.log(startDate)
    console.log(endDate)
    const response = await fetch(`${backendUrl}/filterdata`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization":token
      },
      body: JSON.stringify({
        filterType : 'daterange', startDate, endDate
      }),
    });
    const json = await response.json();
    console.log("json problems => " + json.problems);
    setallData(json.problems);
    console.log("json => " + json);
  };

  if(allData.length ===  0)
  {
    return(
      <div>
         <table>
        <tbody>
          <tr>
          <label>
          <input
            onChange={(e)=> {setStartDate(e.target.value)}}
            type="Date"
            required
            placeholder="Movie/Series description"
          /></label>  
           <label><input
            onChange={(e)=> {setEndDate(e.target.value)}}
            type="Date"
            required
            placeholder="Movie/Series description"
          /></label>
          <button onClick={handleFilters}>Apply Filters</button>
          </tr>
          <tr>
            <th>Sr.No</th>
            <th>Name</th>
            <th>Description</th>
            <th>Watched On</th>
            <th>Rating</th>
            <th>Type</th>
          </tr>
          <tr>
          <Link to="/adddata">Add Data</Link> 
          </tr>
          </tbody></table>
      </div>
      
    )
  }
  
  return (
    
    <div id="allproblems">
      <table>
        <tbody>
          <tr>
          <label>
          <input
            onChange={(e)=> {setStartDate(e.target.value)}}
            type="Date"
            required
            placeholder="Movie/Series description"
          /></label>  
           <label><input
            onChange={(e)=> {setEndDate(e.target.value)}}
            type="Date"
            required
            placeholder="Movie/Series description"
          /></label>
          <button onClick={handleFilters}>Apply Filters</button>
          </tr>
          <tr>
            <th>Sr.No</th>
            <th>Name</th>
            <th>Description</th>
            <th>Watched On</th>
            <th>Rating</th>
            <th>Type</th>
          </tr>

          {allData.map((data, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{data.name}</td>
              <td>{data.description}</td>
              <td>{data.watchedon}</td>
              <td>{data.rating}</td>
              <td>{data.type}</td>
              <td>
                <button onClick={() => handleUpdate(data._id)}>Update</button>
                <button onClick={() => handleDelete(data._id)}>Delete</button>
              </td>
            </tr>
          ))}
          <tr><Link to="/adddata">Add new entry</Link></tr>
        </tbody>
      </table>
    </div>
  );
          }

export default WatchHistory;
