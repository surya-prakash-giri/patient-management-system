import React from "react";
import { Routes, Route } from "react-router-dom";

import { Home } from "./components/Home/Home";
import { CollectClinicals } from "./components/Clinicals/CollectClinicals";
import { AddPatient } from "./components/Patient/AddPatient";
import { AnalyzeData } from "./components/Reports/AnalyzeData";
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/patientDetails/:patientId"
          element={<CollectClinicals />}
        />
        <Route path="/addPatient" element={<AddPatient />} />
        <Route path="/analyze/:patientId" element={<AnalyzeData />} />
      </Routes>
    </div>
  );
}

export default App;
