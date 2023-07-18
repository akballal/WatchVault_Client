import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./WatchHistory.css";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField } from '@mui/material';

const backendUrl = "http://localhost:3000";

const WatchHistory = () => {
  const navigate = useNavigate();
  const [allData, setAllData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [emptyStartDate, setEmptyStartDate] = useState(false);
  const [emptyEndDate, setEmptyEndDate] = useState(false);
  const token = localStorage.getItem("token");

  const init = async () => {
    try {
      const response = await axios.get(`${backendUrl}/alldata`, {
        headers: {
          authorization: token
        }
      });
      console.log('JSON object:', response.data.problems);
      setAllData(response.data.problems);
      console.log('status code:', response.status);
      if (response.status === 401) {
        return (<h1>Unauthorized</h1>);
      }
      if (response.status === 403) {
        navigate("/login?message=Session expired, please Login !!"); // Redirect to login page
        return;
      }
    } catch (error) {
      if (error.response.status === 403) {
        navigate("/login?message=Session expired, please Login !!");
      } else {
        console.log(error);
        return (<h1>Some error occurred, please check console logs for more details</h1>);
      }
    }
  };

  useEffect(() => {
    init();
  }, [navigate]);

  const handleUpdate = (id) => {
    console.log("Update data with id:", id);
    navigate("/updatedata", { state: { id: id } });
  };

  const handleDelete = async (id) => {
    console.log("Delete data with id:", id);
    try {
      const response = await axios.delete(`${backendUrl}/deleterecord`, {
        headers: {
          authorization: token,
          id
        }
      });
      if (response.status === 403) {
        navigate("/login?message=Session expired, please Login !!");
      } else {
        setAllData(prevData => prevData.filter(data => data._id !== id));
      }
    } catch (error) {
      if (error.response.status === 403) {
        navigate("/login?message=Session expired, please Login !!");
      } else {
        console.log(error);
        return (<h1>Some error occurred, please check console logs for more details</h1>);
      }
    }
  };

  const handleFilters = async () => {
    console.log(startDate);
    console.log(endDate);
    if (startDate === null) {
      setEmptyStartDate(true);
      setEmptyEndDate(false);
      return;
    }
    if (endDate === null) {
      setEmptyEndDate(true);
      setEmptyStartDate(false);
      return;
    }
    setEmptyStartDate(false);
    setEmptyEndDate(false);
    try {
      const response = await axios.post(`${backendUrl}/filterdata`, {
        filterType: 'daterange',
        startDate,
        endDate
      }, {
        headers: {
          authorization: token
        }
      });
      setAllData(response.data.problems);
    } catch (error) {
      if (error.response.status === 403) {
        navigate("/login?message=Session expired, please Login !!");
      } else {
        console.log(error);
        return (<h1>Some error occurred, please check console logs for more details</h1>);
      }
    }
  };

  const clearFilters = async () => {
    setStartDate(null);
    setEndDate(null);
    try {
      const response = await axios.get(`${backendUrl}/alldata`, {
        headers: {
          authorization: token
        }
      });
      setAllData(response.data.problems);
    } catch (error) {
      if (error.response.status === 403) {
        navigate("/login?message=Session expired, please Login !!");
      } else {
        console.log(error);
        return (<h1>Some error occurred, please check console logs for more details</h1>);
      }
    }
  };

  if (allData.length === 0) {
    return (
      <div>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                  <TextField
                    onChange={(e) => { setStartDate(e.target.value) }}
                    type="date"
                    required
                    placeholder="Start Date"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    onChange={(e) => { setEndDate(e.target.value) }}
                    type="date"
                    required
                    placeholder="End Date"
                  />
                </TableCell>
                <TableCell>
                  <Button variant="contained" onClick={handleFilters}>Apply Filters</Button>
                </TableCell>
                <TableCell>
                  <Button variant="contained" onClick={clearFilters}>Clear Filters</Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={6}>
                  <Link to="/adddata">Add Data</Link>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }

  return (
    <div id="allproblems">
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <TextField
                  onChange={(e) => { setStartDate(e.target.value) }}
                  type="date"
                  required
                  placeholder="Start Date"
                />
              </TableCell>
              <TableCell>
                <TextField
                  onChange={(e) => { setEndDate(e.target.value) }}
                  type="date"
                  required
                  placeholder="End Date"
                />
              </TableCell>
              <TableCell>
                <Button variant="contained" onClick={handleFilters}>Apply Filters</Button>
              </TableCell>
              <TableCell>
                <Button variant="contained" onClick={clearFilters}>Clear Filters</Button>
              </TableCell>
            </TableRow>
            {emptyStartDate && (
              <TableRow>
                <TableCell colSpan={6}>
                  <p className="error-message" style={{ textAlign: "center", margin: "10px" }}>
                    Please provide a start date.
                  </p>
                </TableCell>
              </TableRow>
            )}
            {emptyEndDate && (
              <TableRow>
                <TableCell colSpan={6}>
                  <p className="error-message" style={{ textAlign: "center", margin: "10px" }}>
                    Please provide an end date.
                  </p>
                </TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell>Sr.No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Watched On</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
            {allData.map((data, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{data.name}</TableCell>
                <TableCell>{data.description}</TableCell>
                <TableCell>{data.watchedon}</TableCell>
                <TableCell>{data.rating}</TableCell>
                <TableCell>{data.type}</TableCell>
                <TableCell>
                  <Button variant="contained" onClick={() => handleUpdate(data._id)}>Update</Button>
                  <Button variant="contained" onClick={() => handleDelete(data._id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={6}>
                <Link to="/adddata">Add new entry</Link>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default WatchHistory;
