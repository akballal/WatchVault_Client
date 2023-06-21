import React, { useEffect, useState } from "react";
import "./WatchHistory.css";
const backendUrl = "http://localhost:3000";

const WatchHistory = () => {
  const [allData, setallData] = useState([]);

  const init = async () => {
    const response = await fetch(`${backendUrl}/alldata`, {
      method: "GET",
    });

    const json = await response.json();
    console.log(json.problems)
    setallData(json.problems);
    console.log(json);
  };

  useEffect(() => {
    init();
  }, []);

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
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WatchHistory;
