import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useQuizManager } from '../hooks/QuizManager';
import { useEffect } from 'react';
import { useQuiz } from '../hooks/QuizContext';
import ResponsiveFlashcardButton from './ResponsiveFlashcardButton';
 
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

    }, [quizEnded, showAnswer, handleScore, props.id, props.place, props.isFlipped]);

    if (!props.isFlipped) {
        return <>
            <ResponsiveFlashcardButton startIcon={<VisibilityIcon />} 
                onClick={() => showAnswer(props.id)} id='showAnswerButton' text="Show Answer" />
        </>
    }

    return (
            <div className="buttonsContainer">

                <ResponsiveFlashcardButton startIcon={<RemoveIcon />} 
                    onClick={() => handleScore(0, props.place, props.id)} text="Forgot" />

                <ResponsiveFlashcardButton startIcon={<AddIcon />} 
                    onClick={() => handleScore(1, props.place, props.id)} text="Remembered" />

            </div>
    )
}