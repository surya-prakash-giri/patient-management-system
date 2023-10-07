import React from "react";
import { AppBar, Box, Button, Stack, Toolbar } from "@mui/material";
import "./Header.css";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Stack
            spacing={2}
            direction={"row"}
          >
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
    </Box>
  );
};
