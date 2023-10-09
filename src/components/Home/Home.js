import axios from "axios";
import React, { useEffect, useId, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Paper, Typography } from "@mui/material";
import RecordTable from "./RecordTable";
import Loader from "../Progress/Loader";

export const Home = () => {
  // constants
  const REACT_APP_BASE_URL =
    process.env.REACT_APP_BASE_URL || "http://localhost:8080/";
  const CLINICAL_URL =
    process.env.REACT_APP_PATIENT_BASE || "clinicals/patients";
  const PATIENT_URL = `${REACT_APP_BASE_URL}${CLINICAL_URL}`;

  const [patientData, setPatientData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [reload, doReload] = useState(false);
  const id = useId();

  useEffect(() => {
    // Use an async function for cleaner code
    async function fetchData() {
      try {
        const { data } = await axios.get(PATIENT_URL);
        setPatientData(data.patients);
        console.log(data.patients);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching patient data:", error);
        setLoading(false);
      }
    }
    fetchData();
  }, [PATIENT_URL, reload]);

  const removePatient = async(patientId) => {
    try {
      const { data } = await axios.delete(`${PATIENT_URL}/${patientId}`);
      doReload(true);
      console.log('Deleted Data', data);
    } catch (error) {
      console.error("Error fetching patient data:", error);
      setLoading(false);
    }
  }

  return (
    <Paper sx={{padding: '32px'}}>
      <Box sx={{ width: "100%", maxWidth: 'lg' }}>
        <Typography variant="h2" gutterBottom>
          Patients
        </Typography>
        {!isLoading ? <RecordTable key={id} id={id} items={patientData} removePatient={removePatient}/> : <Loader />}
        <br />
        <Link to="/addPatient">
          <Button variant="contained" size="large">
            Register Patient
          </Button>
        </Link>
      </Box>
    </Paper>
  );
};
