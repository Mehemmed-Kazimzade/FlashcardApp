import Flashcard from "../components/Flashcard";
import LinearProgress from '@mui/material/LinearProgress';
import { Box, Typography, Stack, Chip } from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useQuiz } from "../hooks/QuizContext";
import { useEffect, useState, useRef } from "react";
import { useQuizManager } from "../hooks/QuizManager";
import { motion } from "framer-motion";

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
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
            <Box className="flashcardsContainer"
                maxWidth="900px"
                mx="auto"
                px={2}
                py={4}
                display="flex"
                flexDirection="column"
                alignItems="center"
            >
                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    justifyContent="space-between"
                    alignItems={{ xs: "flex-start", sm: "center" }}
                    sx={{ width: "100%", mb: 3, gap: 1 }}>

                <Typography variant="h6" fontWeight="600">
                    Practicing: <b>{selectedDeck}</b>
                </Typography>

                {timer && duration !== "" && (
                    <Chip
                    color={color}
                    icon={<AccessTimeIcon />}
                    label={`Time: ${minutes}:${seconds}`}
                    variant="outlined"
                    sx={{
                        fontSize: "0.95rem",
                        fontWeight: 700,
                        px: 1.2,
                        py: 0.6,
                        borderRadius: 2,
                    }}
                    />
                )}
                </Stack>

                <LinearProgress variant="determinate" value={progressValue} 
                sx={{ width: "100%", height: 8, borderRadius: 5, backgroundColor: "#e0e0e0", mb: 3, 
                    "& .MuiLinearProgress-bar": { backgroundColor: theme => theme.palette.primary.main, },}}/>

                <Box width="100%" maxWidth="600px">
                    <Flashcard flashcardObject={flashcardObject} />
                </Box>
            </Box>
        </motion.div>
    </>
}