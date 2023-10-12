import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Button,
  TextField,
  Box,
  Typography,
  Paper,
  FormLabel,
} from "@mui/material";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./CollectClinicals.css";
import { PatientDetails } from "../Patient/PatientDetails";
import Toast from "../utils/Toast";

export const CollectClinicals = () => {
  const { patientId } = useParams();
  // constants
  const REACT_APP_BASE_URL =
    process.env.REACT_APP_BASE_URL || "http://localhost:8080/";
  const CLINICAL_URL =
    process.env.REACT_APP_PATIENT_BASE || "clinicals/patients";
  const PATIENT_URL = `${REACT_APP_BASE_URL}${CLINICAL_URL}/${patientId}`;

  const [patientData, setPatientData] = useState({});
  const [componentName, setComponentName] = useState("");
  const [componentValue, setComponentValue] = useState("");
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();

  const toastRef = useRef();
  const duration = 3000;
  const severity = "success";
  const message = `Added Clinical Data to the Patient ${patientId} Successfully!`;

  useEffect(() => {
    axios.get(PATIENT_URL).then((res) => {
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
        toastRef.current.openToast();
        setTimeout(() => navigate("/", { replace: true }), duration);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <Paper sx={{ padding: "32px" }}>
        <Box>
          {!isLoading && <PatientDetails patient={patientData} />}
          <Box
            sx={{
              padding: "16px",
              marginTop: "6px",
              bgcolor: "#F3F6F9",
              borderRadius: "8px",
            }}
          >
            <FormLabel>
              <Typography variant="h6">Patient's Clinical Data</Typography>
            </FormLabel>
            <br />
            <FormControl fullWidth>
              <InputLabel id="clinicalEntryType">
                Clinical Entry Type:
              </InputLabel>
              <Select
                labelId="clinicalEntryType"
                id="clinicalType"
                value={componentName}
                label="Clinical Entry Type"
                onChange={(e) => setComponentName(e.target.value)}
              >
                <MenuItem value="bp">Blood Pressure(Sys/Dys)</MenuItem>
                <MenuItem value="hw">Height/Weight</MenuItem>
                <MenuItem value="heartrate">Heart Rate</MenuItem>
              </Select>
              <br />
              <TextField
                id="componentVal"
                label="Value"
                variant="outlined"
                onChange={(e) => setComponentValue(e.target.value)}
              />
              <br />
              <Stack className="center" direction="row" spacing={2}>
                <Button variant="contained" onClick={handleSubmit.bind(this)}>
                  Confirm
                </Button>
                <Button variant="outlined" onClick={() => navigate(-1)}>
                  Cancel
                </Button>
              </Stack>
            </FormControl>
          </Box>
        </Box>
      </Paper>
      <Toast
        ref={toastRef}
        severity={severity}
        message={message}
        duration={duration}
      ></Toast>
    </>
  );
};
