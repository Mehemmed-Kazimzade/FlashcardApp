import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useQuizManager } from '../hooks/QuizManager';
import { useEffect } from 'react';
import { useQuiz } from '../hooks/QuizContext';
 
export default function FlashcardActions({ props }) {
    const {quizEnded} = useQuiz();
    const {showAnswer, handleScore} = useQuizManager();

    useEffect(() => {
        const spaceBarListener = event => {
            event.preventDefault();
            
            if (!quizEnded){
                if (event.code === "Space" && !props.isFlipped) {
                    showAnswer(props.id);
                }
                
                if (event.code === "ArrowRight" && props.isFlipped) {
                    handleScore(1, props.place, props.id);
                }
                
                if (event.code === "ArrowLeft" && props.isFlipped) {
                    handleScore(0, props.place, props.id);
                }
            }
        }

        document.body.addEventListener("keyup", spaceBarListener);

        return () => document.body.removeEventListener("keyup", spaceBarListener);

    }, [props.isFlipped]);

    if (!props.isFlipped) {
        return <>
            <Button variant="contained" id="showAnswerButton" startIcon={<VisibilityIcon />} onClick={() => showAnswer(props.id)}>
                Show Answer
            </Button>
        </>
    }

    return (
            <div className="buttonsContainer">
                <Button variant="contained" startIcon={<RemoveIcon />} onClick={() => handleScore(0, props.place, props.id)}>
                    Forgot
                </Button>
                {/* <Button variant="contained" startIcon={<VisibilityOffIcon />} onClick={() => flipCard(id)}> Hide Again </Button> */}
                <Button variant="contained" startIcon={<AddIcon />} onClick={(e) => {handleScore(1, props.place, props.id)}}>
                    Remembered 
                </Button>
            </div>
    )
}