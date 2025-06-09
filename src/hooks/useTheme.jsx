import { createTheme } from "@mui/material";


const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: "#00897b",
      },
      secondary: {
        main: "#fdd835",
      },
      background: {
        default: mode === "dark" ? "#121212" : "#f5f5f5",   // page bg
        paper: mode === "dark" ? "#1e1e1e" : "#ffffff",     // card bg
      },
      text: {
        primary: mode === "dark" ? "#ffffff" : "#000000",
        secondary: mode === "dark" ? "#bbbbbb" : "#555555",
      },
    },
    shape: {
      borderRadius: 12,
    },
    typography: {
      fontFamily: "'Inter', sans-serif",
    },
  });

export default getTheme;
