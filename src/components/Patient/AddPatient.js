import {
  Box,
  Button,
  FormControl,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddPatient.css";
import Toast from "../utils/Toast";

export const AddPatient = () => {
  // constants
  const REACT_APP_BASE_URL =
    process.env.REACT_APP_BASE_URL || "http://localhost:8080/";
  const CLINICAL_URL =
    process.env.REACT_APP_PATIENT_BASE || "clinicals/patients";
  const PATIENT_URL = `${REACT_APP_BASE_URL}${CLINICAL_URL}`;

  // Forms data
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const navigate = useNavigate();

  const toastRef = useRef();
  const duration = 3000;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const requestData = {
      firstName,
      lastName,
      age,
    };

    try {
      const response = await axios.post(PATIENT_URL, requestData);
      console.log("Patient Added", response);
      toastRef.current.openToast();
      setTimeout(() => navigate("/", { replace: true }), duration);
    } catch (error) {
      console.error("Error adding patient: ", error);
    }
  };

  return (
    <>
      <Paper sx={{ padding: "32px" }}>
        <Box className="container">
          <Typography variant="h2" gutterBottom>
            Register Patient
          </Typography>
          <FormControl fullWidth>
            <TextField
              id="firstName"
              label="First Name"
              variant="outlined"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <br />
            <TextField
              id="lastName"
              label="Last Name"
              variant="outlined"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <br />
            <TextField
              id="age"
              label="Age"
              type="number"
              variant="outlined"
              value={age}
              onChange={(e) => setAge(e.target.value)}
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
      </Paper>
      <Toast
        ref={toastRef}
        severity="success"
        message="Patient Added Successfully!"
        duration={duration}
      ></Toast>
    </>
  );
};
