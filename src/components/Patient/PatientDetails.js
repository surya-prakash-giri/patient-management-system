import { Box, Grid, Typography } from '@mui/material'

export const PatientDetails = (props) => {
  const patientData = props.patient;
  return (
    <Box>
        <Typography variant="h2" gutterBottom>
          Patients Details
        </Typography>

        <Grid container rowSpacing={1} direction="row">
          <Grid item xs="12">
            <Typography variant="h6" component={"span"}>
              First Name:&nbsp;
            </Typography>
            <Typography variant="h6" component={"span"}>
              {patientData.firstName}
            </Typography>
          </Grid>
          <Grid item xs="12">
            <Typography variant="h6" component={"span"}>
              Last Name:&nbsp;
            </Typography>
            <Typography variant="h6" component={"span"}>
              {patientData.lastName}
            </Typography>
          </Grid>
          <Grid item xs="12">
            <Typography variant="h6" component={"span"}>
              Age:&nbsp;
            </Typography>
            <Typography variant="h6" component={"span"}>
              {patientData.age}
            </Typography>
          </Grid>
        </Grid>
      </Box>
  )
}
