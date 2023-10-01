import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { RowCreator } from "../Home/RowCreator";

export const AnalyzeData = () => {
  // constants
  const BASE_URL = "http://localhost:8080/";
  const CLINICAL_URL = "clinicalservices/api/"
  const PATIENT_URL = `${BASE_URL}${CLINICAL_URL}patients`;

  const [data, setData] = useState([]);
  const { patientId } = useParams();
  const [isLoading, setLoading] = useState(true);
  const ANALYZE_URL = `${PATIENT_URL}/analyze/${patientId}`;

  useEffect(() => {
    axios
      .get(ANALYZE_URL)
      .then((res) => {
        setData(res.data);
        setLoading(false);
        console.log("Got Analyze data successfully.");
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
