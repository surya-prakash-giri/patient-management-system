import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function ClinicalReportTable(props) {
  const clinicalReports = props.items;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="Patient Data">
        <TableHead>
          <TableRow>
            <StyledTableCell>Id</StyledTableCell>
            <StyledTableCell align="right">Component Name</StyledTableCell>
            <StyledTableCell align="right">Component Value</StyledTableCell>
            <StyledTableCell align="right">Measured DateTime</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clinicalReports.map((row, idx) => (
            <StyledTableRow
              key={row.Id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <StyledTableCell scope="row">{idx + 1}</StyledTableCell>
              <StyledTableCell align="right">{row.componentName}</StyledTableCell>
              <StyledTableCell align="right">{row.componentValue}</StyledTableCell>
              <StyledTableCell align="right">{row.measuredDateTime}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
