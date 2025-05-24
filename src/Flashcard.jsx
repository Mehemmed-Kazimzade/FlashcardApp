import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import FlashcardActions from './FlashcardActions';

export default function Flashcard({flashcardObject}) {
    const actionsprops = {
        id: flashcardObject.id,
        isFlipped: flashcardObject.flipped,
        place: flashcardObject.place
    }

    return <>
        <div style={{maxWidth:"800px", textAlign:"left", margin:"0 auto"}}>
            <Card>
                <CardContent>
                    <div>
                        <Typography variant="h5" sx={{ color: 'text.secondary', marginBlockEnd: 2 }}>
                            Question {flashcardObject.place}:
                        </Typography>
                    </div>
                    <Typography variant="subtitle1" sx={{ mt: 2 }}>
                        {flashcardObject.question}
                    </Typography>
                    <Divider />
                    <Typography variant="body1" sx={{ mt: 2 }}>
                        {flashcardObject.flipped ? flashcardObject.answer : ""}
                    </Typography>
                </CardContent>
                <CardActions>
                    <FlashcardActions props={actionsprops} />
                </CardActions>
            </Card>
        </div>
    </>
}