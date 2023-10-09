import React from "react";
import {
  AppBar,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import MedicationLiquidIcon from "@mui/icons-material/MedicationLiquid";
import "./Header.css";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  return (
    <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="logo"
          >
            <MedicationLiquidIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>PATIENT MANAGEMENT SYSTEM (PMS) </Typography>
          <Stack spacing={2} direction={"row"}>
            <Button
              color="inherit"
              onClick={() => navigate("/", { replace: true })}
            >
              Home
            </Button>
            <Button
              color="inherit"
              onClick={() => navigate("/addPatient", { replace: true })}
            >
              Add Patient
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
  );
};
