import { useTheme } from "@mui/material/styles";
import { Button, useMediaQuery } from "@mui/material";

export default function ResponsiveFlashcardButton({onClick, text, startIcon, id = ""}) {
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Button id={id} onClick={onClick} variant="contained"
                startIcon={startIcon} size={isSmall ? "small" : "large"}>
            {text}
        </Button>
    )
}