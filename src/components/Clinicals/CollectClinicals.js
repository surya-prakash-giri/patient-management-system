import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const CollectClinicals = () => {
  const { patientId } = useParams();
  // constants
  const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:8080/";;
  const CLINICAL_URL = process.env.REACT_APP_PATIENT_BASE || "clinicals/patients";
  const PATIENT_URL = `${REACT_APP_BASE_URL}${CLINICAL_URL}/${patientId}`;

  const [patientData, setPatientData] = useState({});
  const [componentName, setComponentName] = useState("");
  const [componentValue, setComponentValue] = useState("");
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(PATIENT_URL)
      .then((res) => {
        setPatientData(res.data.patient);
        setLoading(false);
      });
  }, [PATIENT_URL]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const requestData = {
      patientId: patientId,
      componentName: componentName,
      componentValue: componentValue,
    };
    axios
      .post(`${REACT_APP_BASE_URL}${CLINICAL_URL}/AddData`, requestData)
      .then((res) => {
        console.log("Patient data updated successfully", res);
        navigate('/', { replace: true })
      })
      .catch((err) => {
        console.error(err);
      });
  };
  
  return (
    <>
      <div>
        <h2>Patient Details:</h2>
        First Name: {!isLoading ? patientData.firstName : ""}
        <br />
        Last Name: {!isLoading ? patientData.lastName : ""}
        <br />
        Age: {!isLoading ? patientData.age : 0}
        <h2>Patient Clinical Data:</h2>
        <form>
          Clinical Entry Type:
          <select onChange={(e) => setComponentName(e.target.value)}>
            <option>Select One</option>
            <option value="bp">Blood Pressure(Sys/Dys)</option>
            <option value="hw">Height/Weight</option>
            <option value="heartrate">Heart Rate</option>
          </select>
          <br />
          Value:
          <input
            type="text"
            name="componentValue"
            onChange={(e) => setComponentValue(e.target.value)}
          />
          <br />
          <button onClick={handleSubmit.bind(this)}>Confirm</button>
        </form>
      </div>
    </>
  );
};
