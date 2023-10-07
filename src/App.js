import React from "react";
import { Routes, Route } from "react-router-dom";
import { Box, Container } from "@mui/material";

import { Header } from "./components/Header/Header";
import { Home } from "./components/Home/Home";
import { CollectClinicals } from "./components/Clinicals/CollectClinicals";
import { AddPatient } from "./components/Patient/AddPatient";
import { AnalyzeData } from "./components/Reports/AnalyzeData";
import "./App.css";

function App() {
  return (
    <Container maxWidth="sm">
      <Box className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/patientDetails/:patientId"
            element={<CollectClinicals />}
          />
          <Route path="/addPatient" element={<AddPatient />} />
          <Route path="/analyze/:patientId" element={<AnalyzeData />} />
        </Routes>
      </Box>
    </Container>
  );
}

export default App;
