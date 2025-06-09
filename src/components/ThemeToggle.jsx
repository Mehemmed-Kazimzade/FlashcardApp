import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import IconButton from "@mui/material/IconButton";

export default function ThemeToggle({ toggleMode, mode }) {
  return (
    <IconButton onClick={toggleMode} color="inherit">
      {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
    </IconButton>
  );
}