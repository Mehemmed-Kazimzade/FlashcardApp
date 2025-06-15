import { Button, Stack } from "@mui/material";
import { useQuiz } from "../hooks/QuizContext";
import { useNavigate } from "react-router";
import importDeckToLocalStorage from "../utils/importDeckToLocalStorage";
import ReusableSnackbar from "./ReusableSnackbar";
import { useState } from "react";

export default function Restart() {
    const {dispatch, timeDispatch, unimportedDeck, unimported} = useQuiz();
    const [toast, setToast] = useState({ open: false, severity: "info", message: "" });
    const navigate = useNavigate();

    const handleClick = () => {
        timeDispatch({type: "RESET_TIME"});
        dispatch({type: "RESET_QUIZ"});
        navigate("/selectDeck/");
    }

    const handleImport = () => {
        const res = importDeckToLocalStorage(unimportedDeck);
    
        if (res) setToast({open:true, severity: "success", message: "Deck Imported!"});
        else setToast({open: true, severity:"error", message: "Deck already imported."})
    }

    return <>
        <ReusableSnackbar toast={toast} setToast={setToast} />
        <Stack spacing={1.4} mt={2}>
            {unimported && <Button variant="outlined" sx={{ mt: 3, mb: 1 }} onClick={handleImport}> Import this Deck </Button>}
            <Button variant="outlined" sx={{ mt: 3, mb: 1 }} onClick={handleClick}> Reset the quiz </Button>
        </Stack>
    </>
    
}