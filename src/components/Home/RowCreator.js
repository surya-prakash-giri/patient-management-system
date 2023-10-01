import React from "react";
import { Link } from "react-router-dom";

export const RowCreator = (props) => {
  const patient = props.item;
  return (
    <>
      <tr>
        <td>{patient.id}</td>
        <td>{patient.firstName}</td>
        <td>{patient.lastName}</td>
        <td>{patient.age}</td>
        <td>
          <Link to={"/patientDetails/" + patient.id}>Add Data</Link>
        </td>
        <td>
          <Link to={"/analyze/" + patient.id}>Analyze</Link>
        </td>
      </tr>
    </>
  );
};
