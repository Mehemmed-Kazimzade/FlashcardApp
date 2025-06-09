import { Button, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function ResponsiveButton({ onClick, text }) {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Button className="startButton"  variant="contained" size={isSmall ? "small" : "large"} onClick={onClick}>
        {text}
    </Button>
  );
}