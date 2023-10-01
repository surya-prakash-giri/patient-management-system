import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RowCreator } from "./RowCreator";

export const Home = () => {
  // constants
  const BASE_URL = "http://localhost:8080/";
  const CLINICAL_URL = "clinicalservices/api/"
  const PATIENT_URL = `${BASE_URL}${CLINICAL_URL}patients/`;

  const [patientData, setPatientData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // Use an async function for cleaner code
    async function fetchData() {
      try {
        const response = await axios.get(PATIENT_URL);
        setPatientData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching patient data:", error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <div>
        <h2>Patients:</h2>
        <table align="center">
          <thead>
            <tr>
              <th>Id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {!isLoading ? (
              patientData.map((patient) => (
                <RowCreator key={patient.id} item={patient} />
              ))
            ) : (
              <tr>
                <td colSpan="6">Loading...</td>
              </tr>
            )}
          </tbody>
        </table>
        <br />
        <Link to="/addPatient">
          <font size="5">Register Patient</font>
        </Link>
      </div>
    </>
  );
};
