import React, { useEffect, useState } from "react";
import "./AllProblems.css";
const backendUrl = "http://localhost:3000";

const AllProblemsPage = () => {
  const [problems, setProblems] = useState([]);

  const init = async () => {
    const response = await fetch(`${backendUrl}/questions`, {
      method: "GET",
    });

    const json = await response.json();
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
            <th>Title</th>
            <th>Difficulty</th>
          </tr>

          {problems.map((prob, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{prob.title}</td>
              <td className={`${prob.difficulty}`}>{prob.difficulty}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllProblemsPage;
