import { Button } from "@mui/material";
import { useNavigate } from "react-router";
import DeckSelector from "../components/DeckSelector";
import { useQuiz } from "../hooks/QuizContext";
import findDeckIdFromName from "../utils/findDeckIdFromName";
import { startPracticeSession } from "../utils/startPracticeSession";

export default function FlashcardApp() {
    const navigate = useNavigate(); 
    const {selectedDeck, dispatch} = useQuiz();

    const handleClick = () => {
        startPracticeSession(findDeckIdFromName(selectedDeck), dispatch, navigate);
    };

    return <>
        <DeckSelector />
        <Button variant="contained" sx={{ marginBlockStart: 2 }} onClick={handleClick}>Start the Quiz</Button>
    </>
}
