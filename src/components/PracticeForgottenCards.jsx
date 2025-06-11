import { useQuiz } from "../hooks/QuizContext";
import { useNavigate } from "react-router";
import { Button, useMediaQuery, useTheme } from "@mui/material";

export default function PracticeForgottenCards({forgotten}) {
    const {flashcards, dispatch} = useQuiz();
    const navigate = useNavigate();
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClick = () => {
        const updatedFlashcards = 
            flashcards.filter(
                card => (!card.isRemembered)).map((card, idx) => 
                    ({...card, flipped:false, place: idx + 1}));

        dispatch({type: "PRACTICE_AGAIN", payload: {updatedFlashcards}});
        navigate("/practice");
    }

    if(forgotten > 0) {
        return (
            <div>
                <Button variant="contained" sx={{ mt: 2, mb: 0 }} size={isSmall ? 'small' : "large"} onClick={handleClick}>
                    Practice Forgotten Cards Again
                </Button>
            </div>    
        )
    }

    return <></>
}