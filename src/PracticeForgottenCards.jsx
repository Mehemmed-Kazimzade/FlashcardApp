import { useQuiz } from "./QuizContext";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";

export default function PracticeForgottenCards({forgotten}) {
    const {flashcards, dispatch} = useQuiz();
    const navigate = useNavigate();

    const handleClick = () => {
        const updatedFlashcards = flashcards.filter(card => (!card.isRemembered)).map((card, idx) => ({...card, flipped:false, place: idx + 1}));
        console.log(updatedFlashcards);
        dispatch({type: "PRACTICE_AGAIN", payload: {updatedFlashcards}});
        navigate("/practice");
    }

    if(forgotten > 0) {
        return (
            <div>
                <Button variant="contained" sx={{ mt: 2, mb: 0 }} onClick={handleClick}>
                    Practice Forgotten Cards Again
                </Button>
            </div>    
        )
    }

    return <></>
}