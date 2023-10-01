import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export const AddPatient = () => {
    // constants
    const BASE_URL = "http://localhost:8080/";
    const CLINICAL_URL = "clinicalservices/api/"
    const PATIENT_URL = `${BASE_URL}${CLINICAL_URL}patients`;

    // Forms data
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState(0);

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
        } catch (error) {
            console.error("Error adding patient: ", error);
        }
    };

    return (
        <>
        <div className="container">
            <h2>Create Patient:</h2>
            <form onSubmit={handleSubmit}>
            First Name:
            <input
                type="text"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                align="left"
            />
            Last Name:
            <input
                type="text"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                align="left"
            />
            Age:
            <input
                type="text"
                name="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                align="left"
            />
            <button type="submit">Confirm</button>
            </form>
            <Link to={"/"}>Go Back</Link>
        </div>
        </>
    );
};
