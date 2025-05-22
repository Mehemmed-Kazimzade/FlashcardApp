import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

export default function FlashcardActions({props}) {
    if (!props.isFlipped) {
        return <>
            <Button variant="contained" startIcon={<VisibilityIcon />} onClick={() => props.flipCard(id)}>
                Show Answer
            </Button>
        </>
    }

    return (
            <div className="buttonsContainer">
                <Button variant="contained" startIcon={<RemoveIcon />} onClick={() => props.handleScore(0)}>
                    Forgot
                </Button>
                {/* <Button variant="contained" startIcon={<VisibilityOffIcon />} onClick={() => flipCard(id)}> Hide Again </Button> */}
                <Button variant="contained" startIcon={<AddIcon />} onClick={() => props.handleScore(1)}>
                    Remembered 
                </Button>
            </div>
    )
}