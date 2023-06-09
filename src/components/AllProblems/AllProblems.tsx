import React, { useEffect, useState } from "react";
import "./AllProblems.css";
const backendUrl = "http://localhost:3000";

const AllProblemsPage = () => {
  const [problems, setProblems] = useState([]);

  const init = async () => {
    const response = await fetch(`${backendUrl}/alldata`, {
      method: "GET",
    });

    const json = await response.json();
    console.log(json.problems)
    setProblems(json.problems);
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
          </tr>

          {problems.map((prob, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{prob.name}</td>
              <td>{prob.description}</td>
              <td>{prob.watchedon}</td>
              <td>{prob.rating}</td>
              <td>{prob.type}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllProblemsPage;
