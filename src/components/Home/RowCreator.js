import React from "react";
import { Link } from "react-router-dom";

export const RowCreator = (props) => {
  const patient = props.item;
  console.log(patient);
  return (
    <>
      <tr>
        <td>{props.idx}</td>
        <td>{patient.firstName}</td>
        <td>{patient.lastName}</td>
        <td>{patient.age}</td>
        <td>
          <Link to={"/patientDetails/" + patient._id.toString()}>Add Data</Link>
        </td>
        <td>
          <Link to={"/analyze/" + patient._id.toString()}>Analyze</Link>
        </td>
      </tr>
    </>
  );
};
