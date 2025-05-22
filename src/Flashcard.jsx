import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { useState } from 'react';
import Result from './Result';
import { useQuiz } from './QuizContext';
import FlashcardActions from './FlashcardActions';

export default function Flashcard({flashcardObject, setSeries, size, flipCard}) {
    const {score, setScore} = useQuiz();
    const [quizFinished, setQuizFinished] = useState(false);

    function handleScore(point) {
        if (flashcardObject.place === size) {
            setScore(prev => prev + point);
            setQuizFinished(true);
        }
        else {
            setScore(prev => prev + point);
            handleNext();
        }
    }

    function handleNext() {
        if (flashcardObject.place < size) {
            flipCard(flashcardObject.id);
            setSeries(prev => prev + 1);
        }
    }

    function handlePrevious() {
        if (flashcardObject.place > 1) {
            flipCard(flashcardObject.id);
            setSeries(prev => prev - 1);
        }
    }

    if (quizFinished) return <Result score={score} numOfQuestions={size} />

    const actionsprops = {
        id: flashcardObject.id,
        isFlipped: flashcardObject.flipped,
        flipCard: flipCard,
        handleScore: handleScore
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