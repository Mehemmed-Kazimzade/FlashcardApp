import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useQuizManager } from './hooks/QuizManager';

export default function FlashcardActions({props}) {
    const {showAnswer, handleScore} = useQuizManager();

    if (!props.isFlipped) {
        return <>
            <Button variant="contained" startIcon={<VisibilityIcon />} onClick={() => showAnswer(props.id)}>
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
                <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleScore(1, props.place, props.id)}>
                    Remembered 
                </Button>
            </div>
    )
}