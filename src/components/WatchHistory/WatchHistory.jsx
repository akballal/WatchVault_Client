import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./WatchHistory.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  TableSortLabel,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlinedIcon from "@mui/icons-material/Delete";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import dayjs from "dayjs";
import { BASE_URL } from "../../config/apiConfig";



const WatchHistory = () => {
  const navigate = useNavigate();
  const [allData, setAllData] = useState([]);

  const [emptyStartDate, setEmptyStartDate] = useState(false);
  const [emptyEndDate, setEmptyEndDate] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [rangevalue, setRangevalue] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const init = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/data/getalldata`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);
      console.log("JSON object:", response.data);
      // Parse and format dates with local timezone
      const formattedData = response.data.map(item => ({
        ...item,
        watchedon: dayjs(item.watchedon).tz(dayjs.tz.guess()).format('YYYY-MM-DD HH:mm:ss'),
      }));


      setAllData(formattedData);
      setLoading(false);
      console.log("status code:", response.status);
      if (response.status === 401) {
        return <h1>Unauthorized</h1>;
      }
      if (response.status === 403) {
        navigate("/login?message=Session expired, please Login !!"); // Redirect to login page
        return;
      }
    } catch (error) {
      setLoading(false);
      console.log(error)
      if (error.response.status === 403) {
        navigate("/login?message=Session expired, please Login !!");
      }
      if (axios.isAxiosError(error)) {
        // Axios error, check for network issues or server being down
        if (!error.response) {
          return (
            <h1>
              Network error or server is down. Sorry for inconvenience, We are
              working to make it up and running.
            </h1>
          );
        }
      } else if (error.response.status === 403) {
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
      const response = await axios.delete(`${BASE_URL}/data/deletedata`, {
        headers: {
          id,
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      if (response.status === 403) {
        navigate("/login?message=Session expired, please Login !!");
      } else {
        // console.log("Deleting data with id:", id);
        // console.log("All Data:", allData.map((data) => data.dataid));
        //console.log(sortedData)
        setAllData((sortedData) =>
          sortedData.filter((data) => data.dataid !== id)
        );
        //console.log(sortedData)
        // window.location.reload();
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
  };

  const handleFilters = async () => {
    // console.log(startDate);
    // console.log(endDate);
    console.log(rangevalue);
    console.log(dayjs(rangevalue[0].$d).format("YYYY-MM-DD"));
    console.log(dayjs(rangevalue[1].$d).format("YYYY-MM-DD"));

    const startDate = dayjs(rangevalue[0].$d).format("YYYY-MM-DD");
    const endDate = dayjs(rangevalue[1].$d).format("YYYY-MM-DD");

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
    const startDateObject = dayjs(startDate);
    const endDateObject = dayjs(endDate);

    try {
      const response = await axios.get(`${BASE_URL}/data/filterdata`, {
        headers: {
          Authorization: `Bearer ${token}`,
          startDateObject,
          endDateObject,
        },
      });
      console.log(response);
      setAllData(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Axios error, check for network issues or server being down
        if (!error.response) {
          return (
            <h1>
              Network error or server is down. Sorry for inconvenience, We are
              working to make it up and running.
            </h1>
          );
        }
      } else if (error.response.status === 403) {
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
  };

  const clearFilters = async () => {
    setRangevalue(null);
    try {
      const response = await axios.get(`${BASE_URL}/data/getalldata`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      console.log("JSON object:", response.data);
      setAllData(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Axios error, check for network issues or server being down
        if (!error.response) {
          return (
            <h1>
              Network error or server is down. Sorry for inconvenience, We are
              working to make it up and running.
            </h1>
          );
        }
      } else if (error.response.status === 403) {
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
  };

  const handleSort = (field) => {
    if (field === sortBy) {
      // Toggle the sort order
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // Set the new sort field and default sort order to ascending
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const sortedData = () => {
    if (sortBy) {
      return allData.sort((a, b) => {
        if (a[sortBy] < b[sortBy]) {
          return sortOrder === "asc" ? -1 : 1;
        }
        if (a[sortBy] > b[sortBy]) {
          return sortOrder === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return allData;
  };
  if (loading) {
    return <>

      Loading ....
    </>
  }

  if (sortedData().length === 0) {
    if (rangevalue === null) {
      return (
        <div
          style={{
            paddingTop: 90,
            marginBottom: 10,
            display: "flex",
            flexDirection: "column", // To make items stack vertically
            alignItems: "center", // To horizontally center items
            textAlign: "center", // To center text within Typography
          }}
        >
          <h1 className="header">Nothing added yet!! Start adding your watch history</h1>
          {/* Add a blank line using margin or padding */}
          <div style={{ margin: "5px 0" }}></div>
          <Link to="/adddata" className="link-button">
          Add Data
        </Link>

          
        </div>
      );
    }
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "flex-start", marginTop: "16px" }}>
          <div style={{ marginRight: "8px" }}>
            <DateRangePicker
              disableFuture
              localeText={{ start: "Start-Date", end: "End-Date" }}
              autoFocus={undefined}
              onChange={(newValue) => {
                console.log(newValue);
                setRangevalue(newValue);
              }}
              size="small"
            />
          </div>
          <Button
            variant="contained"
            size="small"
            style={{ whiteSpace: "nowrap", marginRight: "8px" }}
            onClick={handleFilters}
          >
            Apply Filters
          </Button>
          <Button
            variant="contained"
            size="small"
            style={{ whiteSpace: "nowrap" }}
            onClick={clearFilters}
          >
            Clear Filters
          </Button>
        </div>
        <div
          style={{
            paddingTop: 90,
            marginBottom: 10,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography variant="h6">
            Seems you didn't watch any movie or series in provided time-range,
            did you?
          </Typography>
        </div>
      </div>
    );
  }

  return (
    <div id="allproblems">
      <TableContainer component={Paper}>
        {/* <Table>
          <TableBody>
            <TableRow >
              <TableCell>
                <div>
                  <DateRangePicker
                    disableFuture
                    localeText={{ start: "Start-Date", end: "End-Date" }}
                    autoFocus={undefined}
                    onChange={(newValue) => {
                      console.log(newValue);
                      setRangevalue(newValue);
                    }}
                    size="small"
                  />
                </div>
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  size="small"
                  style={{ whiteSpace: "nowrap" }}
                  onClick={handleFilters}
                >
                  Apply Filters
                </Button>
              </TableCell>
              <TableCell >
                <Button
                  variant="contained"
                  size="small"
                  style={{ whiteSpace: "nowrap" }}
                  onClick={clearFilters}
                >
                  Clear Filters
                </Button>
              </TableCell>
            </TableRow>
            </TableBody>
            </Table> */}
        <div style={{ display: "flex", justifyContent: "flex-start", marginTop: "16px" }}>
          <div style={{ marginRight: "8px" }}>
            <DateRangePicker
              disableFuture
              localeText={{ start: "Start-Date", end: "End-Date" }}
              autoFocus={undefined}
              onChange={(newValue) => {
                console.log(newValue);
                setRangevalue(newValue);
              }}
              size="small"
            />
          </div>
          <Button
            variant="contained"
            size="small"
            style={{ whiteSpace: "nowrap", marginRight: "8px" }}
            onClick={handleFilters}
          >
            Apply Filters
          </Button>
          <Button
            variant="contained"
            size="small"
            style={{ whiteSpace: "nowrap" }}
            onClick={clearFilters}
          >
            Clear Filters
          </Button>
        </div>

        {/* Error message for empty start date */}
        {emptyStartDate && (
          <div style={{ borderBottom: "2px solid #ddd", textAlign: "center", margin: "10px 0" }}>
            <p className="error-message" style={{ color: "red" }}>
              Please provide a start date.
            </p>
          </div>
        )}

        {/* Error message for empty end date */}
        {emptyEndDate && (
          <div style={{ borderBottom: "2px solid #ddd", textAlign: "center", margin: "10px 0" }}>
            <p className="error-message" style={{ color: "red" }}>
              Please provide an end date.
            </p>
          </div>
        )}







        <Table>
          <TableBody>
            <TableRow style={{ borderBottom: "2px solid #ddd" }}>
            </TableRow>
            <TableRow>
              <TableCell style={{ borderRight: '1px solid #ddd' }}>
                <Button size="small" variant="text">
                  Sr.No
                </Button>
              </TableCell>
              <TableCell style={{ borderRight: '1px solid #ddd' }}>
                <Button size="small" variant="text">
                  Banner
                </Button>
              </TableCell>
              <TableCell style={{ borderRight: '1px solid #ddd' }}>
                <Button
                  size="small"
                  variant="text"
                  onClick={() => handleSort("name")}
                >
                  <TableSortLabel
                    active={sortBy === "name"}
                    direction={sortOrder}
                  >
                    Name
                  </TableSortLabel>
                </Button>
              </TableCell>
              <TableCell style={{ borderRight: '1px solid #ddd' }}>
                <Button
                  size="small"
                  variant="text"
                  onClick={() => handleSort("description")}
                >
                  <TableSortLabel
                    active={sortBy === "description"}
                    direction={sortOrder}
                  >
                    Description
                  </TableSortLabel>
                </Button>
              </TableCell>
              <TableCell style={{ borderRight: '1px solid #ddd' }}>
                <Button
                  size="small"
                  variant="text"
                  onClick={() => handleSort("watchedon")}
                >
                  <TableSortLabel
                    active={sortBy === "watchedon"}
                    direction={sortOrder}
                  >
                    Watched On
                  </TableSortLabel>
                </Button>
              </TableCell>
              <TableCell style={{ borderRight: '1px solid #ddd' }}>
                <Button
                  size="small"
                  variant="text"
                  onClick={() => handleSort("rating")}
                >
                  <TableSortLabel
                    active={sortBy === "rating"}
                    direction={sortOrder}
                  >
                    Rating
                  </TableSortLabel>
                </Button>
              </TableCell>
              <TableCell style={{ borderRight: '1px solid #ddd' }}>
                <Button
                  size="small"
                  variant="text"
                  onClick={() => handleSort("type")}
                >
                  <TableSortLabel
                    active={sortBy === "type"}
                    direction={sortOrder}
                  >
                    Type
                  </TableSortLabel>
                </Button>
              </TableCell>
              <TableCell style={{ borderRight: '1px solid #ddd' }}>
                <Button size="small" variant="text">
                  Trailer
                </Button>
              </TableCell>
              <TableCell style={{ borderRight: '1px solid #ddd' }}>
                <Button size="small" variant="text">
                  Actions
                </Button>
              </TableCell>
            </TableRow>
            {sortedData().map((data, index) => (
              <TableRow key={index}>
                <TableCell style={{ borderRight: '1px solid #ddd' }}>{index + 1}</TableCell>
                <TableCell style={{ borderRight: '1px solid #ddd' }}>
                  {data.photo ? (
                    <img
                      src={`data:image/png;base64,${data.photo}`}
                      alt="Watched Photo"
                      style={{
                        width: "120px",
                        height: "100px",
                        marginBottom: "10px",
                      }}
                    />
                  ) : (
                    <p>No Banner added</p>
                  )}
                </TableCell>
                <TableCell style={{ borderRight: '1px solid #ddd' }}>{data.name}</TableCell>
                <TableCell style={{ borderRight: '1px solid #ddd' }}>{data.description}</TableCell>
                <TableCell style={{ borderRight: '1px solid #ddd' }}>{data.watchedon}</TableCell>
                <TableCell style={{ borderRight: '1px solid #ddd' }}>{data.rating}</TableCell>
                <TableCell style={{ borderRight: '1px solid #ddd' }}>{data.type}</TableCell>
                <TableCell style={{ borderRight: '1px solid #ddd' }}>
                  {data.trailer ? (
                    <a
                      href={data.trailer}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Watch Trailer
                    </a>
                  ) : (
                    <p>No Trailer added</p>
                  )}
                </TableCell>

                <TableCell style={{ borderRight: '1px solid #ddd' }}>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => handleUpdate(data.dataid)}
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => handleDelete(data.dataid)}
                  >
                    <DeleteOutlinedIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "16px" }}>

        <Link to="/adddata">
          Add new entry
        </Link></div>

    </div>
  );
};

export default WatchHistory;
