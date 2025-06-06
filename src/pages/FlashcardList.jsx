import Flashcard from "../components/Flashcard";
import LinearProgress from '@mui/material/LinearProgress';
import { Box, Typography, Stack, Chip } from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useQuiz } from "../hooks/QuizContext";
import { useEffect, useState, useRef } from "react";
import { useQuizManager } from "../hooks/QuizManager";

export default function FlashcardList() {
    const {flashcards,timer, selectedDeck, series, duration, timeDispatch} = useQuiz();
    const {endQuiz} = useQuizManager();
    const [timeLeft, setTimeLeft] = useState(duration * 60);
    const [color, setColor] = useState("success");
    const timeLeftRef=  useRef(timeLeft);

    useEffect(() => {
        let interval = null;

        if (timer && duration !== "") {
            interval = setInterval(() => {
                setTimeLeft(prev => {
                    timeLeftRef.current = prev - 1;
                    if (prev === 0) {
                        clearInterval(interval);
                        endQuiz();
                        return 0;
                    }
                    if (prev === 60) setColor("warning");
                    if (prev === 10) setColor("error");

                    return prev - 1;
                });
            }, 1000);
        }

        return () => {
            if (interval !== null){
                let timeLeft = timeLeftRef.current;
                timeDispatch({type: "SET_TIME_LEFT", payload: {timeLeft}});
                clearInterval(interval)
            };
        };

    }, [timer, duration]);

    const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
    const seconds = String(timeLeft % 60).padStart(2, "0");

    if (flashcards.length === 0) return <p>No Flashcards in this category</p>

    const progressValue = ((series) / flashcards.length) * 100;

    const currentFlashcard = flashcards[series];

    const flashcardObject = {
        id: currentFlashcard.id,
        place: currentFlashcard.place,
        answer: currentFlashcard.answer,
        flipped: currentFlashcard.flipped,
        question: currentFlashcard.question,
    }

    return <>
        <Box maxWidth="800px" margin="0 auto">
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2.4 }}>
                <Typography variant="h5">
                    Practicing: <b>{selectedDeck}</b>
                </Typography>

                {/* Timer UI */}
                {timer && duration !== "" && <Chip color={color}
                    icon={<AccessTimeIcon />}
                    label={`Time: ${minutes}:${seconds}`}
                    variant="outlined"
                    sx={{ fontSize: "0.95rem", fontWeight: 700 }}
                />}
            </Stack>
            <LinearProgress variant="determinate" value={progressValue} sx={{marginBlockEnd: 2}} />
            {<Flashcard flashcardObject={flashcardObject}/>}
        </Box>
    </>
}