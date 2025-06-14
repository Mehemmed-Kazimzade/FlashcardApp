import { Button, Stack } from "@mui/material";
import { useQuiz } from "../hooks/QuizContext";
import { useNavigate } from "react-router";
import importDeckToLocalStorage from "../utils/importDeckToLocalStorage";

export default function Restart() {
    const {dispatch, timeDispatch, deck, unimported} = useQuiz();
    const navigate = useNavigate();

    const handleClick = () => {
        timeDispatch({type: "RESET_TIME"});
        dispatch({type: "RESET_QUIZ"});
        navigate("/");
    }

    const handleImport = () => {
        importDeckToLocalStorage(deck);
    }

    return <>
        <Stack spacing={1.4} mt={2}>
            {unimported && <Button variant="outlined" sx={{ mt: 3, mb: 1 }} onClick={handleImport}> Import this Deck </Button>}
            <Button variant="outlined" sx={{ mt: 3, mb: 1 }} onClick={handleClick}> Reset the quiz </Button>
        </Stack>
    </>
    
}