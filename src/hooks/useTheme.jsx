import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00897b",
    },
    secondary: {
      main: "#fdd835",
    },
    background: {
      default: "#f5f5f5",
    }
  },
  shape: {
    borderRadius: 12,
  },
});

export default theme;
