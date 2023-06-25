import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./WatchHistory.css";
const backendUrl = "http://localhost:3000";

const WatchHistory = () => {
  const navigate = useNavigate();
  const [allData, setallData] = useState([]);
  
  const init = async () => {
    const response = await fetch(`${backendUrl}/alldata`, {
      method: "GET",
    });

    const json = await response.json();
    console.log(json.problems);
    setallData(json.problems);
    console.log(json);
  };

  useEffect(() => {
    init();
  }, []);

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

  return (
    <div id="allproblems">
      <table>
        <tbody>
          <tr>
            <th>Sr.No</th>
            <th>Name</th>
            <th>Description</th>
            <th>Watched On</th>
            <th>Rating</th>
            <th>Type</th>
            <th>User</th>
            <th>ID</th>
          </tr>

          {allData.map((data, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{data.name}</td>
              <td>{data.description}</td>
              <td>{data.watchedon}</td>
              <td>{data.rating}</td>
              <td>{data.type}</td>
              <td>{data.user}</td>
              <td>{data._id}</td>
              <td>
                <button onClick={() => handleUpdate(data._id)}>Update</button>
                <button onClick={() => handleDelete(data._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WatchHistory;
