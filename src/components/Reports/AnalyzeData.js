import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { RowCreator } from "./RowCreator";

export const AnalyzeData = () => {
  // constants
  const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:8080/";
  const CLINICAL_URL = process.env.REACT_APP_PATIENT_BASE || "clinicals/patients";
  const PATIENT_URL = `${REACT_APP_BASE_URL}${CLINICAL_URL}`;

  const [data, setData] = useState([]);
  const { patientId } = useParams();
  const [isLoading, setLoading] = useState(true);
  const ANALYZE_URL = `${PATIENT_URL}/analyze/${patientId}`;

  useEffect(() => {
    axios
      .get(ANALYZE_URL)
      .then((res) => {
        setData(res.data.patient);
        setLoading(false);
        console.log("Got Analyze data successfully.", res.data);
      })
      .catch((error) => {
        console.error("Error fetching patient data: ", error);
        setLoading(false);
      });
  }, [ANALYZE_URL]);
  
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
            <RowCreator key={eachEntry._id.toString()} item={eachEntry} />
          ))
        ) : (
          <p>Loading clinical data...</p>
        )}
        <Link to={"/"}>Go Back</Link>
      </div>
    </>
  );
};
