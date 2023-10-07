import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Box, Button, Typography } from "@mui/material";
import { PatientDetails } from "../Patient/PatientDetails";
import ClinicalReportTable from "./ClinicalReportTable";

export const AnalyzeData = () => {
  // constants
  const REACT_APP_BASE_URL =
    process.env.REACT_APP_BASE_URL || "http://localhost:8080/";
  const CLINICAL_URL =
    process.env.REACT_APP_PATIENT_BASE || "clinicals/patients";
  const PATIENT_URL = `${REACT_APP_BASE_URL}${CLINICAL_URL}`;

  const [data, setData] = useState([]);
  const { patientId } = useParams();
  const [isLoading, setLoading] = useState(true);
  const ANALYZE_URL = `${PATIENT_URL}/analyze/${patientId}`;
  const navigate = useNavigate();

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
    <Box>
      {!isLoading && <PatientDetails patient={data} />}
      <Typography variant="h2" gutterBottom>
        Clinical Report
      </Typography>
      {!isLoading ? <ClinicalReportTable items={data.clinicalData}/> : (
        <p>Loading clinical data...</p>
      )}
      <br />
      <Button variant="outlined" onClick={() => navigate(-1)}>Go Back</Button>
    </Box>
  );
};
