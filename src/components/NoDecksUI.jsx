import { Typography, Stack } from "@mui/material";
import NightsStayIcon from '@mui/icons-material/NightsStay';
import BuildIcon from '@mui/icons-material/Build';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from "react-router";

export default function NoDecksUI() {
    return <>
        <Stack spacing={3}>
            <Typography variant="h4">You have no decks. <NightsStayIcon /> </Typography>
            <Link to="/decks/">
                <Typography variant="h6" color="info" fontWeight={"bold"}> Start by building decks. <BuildIcon /> </Typography>
            </Link>
            <Link to="/readyDecks/">
                <Typography variant="h6" color="info" fontWeight={"bold"}> Or practice our own ready decks. <VisibilityIcon /> </Typography>
            </Link>
        </Stack>
    </>
}