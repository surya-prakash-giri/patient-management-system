import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function RecordTable(props) {
  const patients = props.items;
  const id = props.id;
  const removePatient = props.removePatient;
  return (
    <TableContainer component={Paper} key={id}>
      <Table sx={{ minWidth: 650 }} aria-label="Patient Data">
        <TableHead>
          <TableRow>
            <StyledTableCell key={id + 'id'}>Id</StyledTableCell>
            <StyledTableCell key={id + 'fName'} align="right">First Name</StyledTableCell>
            <StyledTableCell key={id + 'lName'} align="right">Last Name</StyledTableCell>
            <StyledTableCell key={id + 'age'} align="right">Age</StyledTableCell>
            <StyledTableCell key={id + 'act_btn'} align="center" colSpan={3}>
              Action Buttons
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patients.map((row, idx) => (
            <StyledTableRow
              key={row.Id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <StyledTableCell scope="row" key={row.Id + 'Id'}>{idx + 1}</StyledTableCell>
              <StyledTableCell align="right" key={row.Id + 'fName'}>{row.firstName}</StyledTableCell>
              <StyledTableCell align="right" key={row.Id + 'lName'}>{row.lastName}</StyledTableCell>
              <StyledTableCell align="right" key={row.Id + 'age'}>{row.age}</StyledTableCell>
              <StyledTableCell align="right" key={row.Id + 'adddata'}>
                <Link to={"/patientDetails/" + row._id.toString()}>
                  Add Data
                </Link>
              </StyledTableCell>
              <StyledTableCell align="right" key={row.Id + 'analyze'}>
                <Link to={"/analyze/" + row._id.toString()}>Analyze</Link>
              </StyledTableCell>
              <StyledTableCell key={row.Id + 'remove'}>
                <IconButton
                  size="large"
                  color="inherit"
                  aria-label="Remove"
                  onClick={() => removePatient(row._id)}
                >
                  <CancelIcon />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
