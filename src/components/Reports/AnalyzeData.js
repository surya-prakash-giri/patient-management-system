import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { RowCreator } from "../Home/RowCreator";

export const AnalyzeData = () => {
  const [data, setData] = useState([]);
  const { patientId } = useParams();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        "http://localhost:8080/clinicalservices/api/patients/analyze/" +
          patientId
      )
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching patient data: ", error);
        setLoading(false);
      });
  }, [patientId]); // Include patientId as a dependency
  return (
    <>
      <div>
        <h2>Patient Details:</h2>
        First Name: {data.firstName}
        <br />
        Last Name: {data.lastName}
        <br />
        Age: {data.age}
        <h2>Clinical Report:</h2>
        {!isLoading ? (
          data.clinicalData.map((eachEntry) => (
            <RowCreator key={eachEntry.id} item={eachEntry} />
          ))
        ) : (
          <p>Loading clinical data...</p>
        )}
        <Link to={"/"}>Go Back</Link>
      </div>
    </>
  );
};
