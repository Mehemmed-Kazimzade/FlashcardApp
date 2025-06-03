import { useNavigate } from "react-router";
import DeckSelector from "../components/DeckSelector";
import { useQuiz } from "../hooks/QuizContext";
import { useState } from "react";
import { FormControlLabel, Checkbox, Box, Paper, Button, Typography } from "@mui/material";

// Utility: starts a quiz session given a deck
import { startPracticeSession } from "../utils/startPracticeSession";

// Utility: determines the quiz mode based on selected dropdown label
import determineModeFromSelectedDeck from "../utils/determineModeFromSelectedDeck";

// Utility: returns the correct deck object based on quiz mode
import getDeckFromSelectedMode from "../utils/getDeckFromSelectedMode";

export default function FlashcardApp() {
    const [shuffle, setShuffle] = useState(false); // state for shuffling cards.
    const navigate = useNavigate(); 
    const {selectedDeck, dispatch} = useQuiz();  // global state for current dropdown selection.

    const handleClick = () => {
        // Step 1: Figure out what mode we're in ("random", "all", or "selected").
        const mode = determineModeFromSelectedDeck(selectedDeck);

        // Step 2: Get the appropriate deck object based on that mode.
        const deck = getDeckFromSelectedMode(mode, selectedDeck);

        // Prevent null crashes or empty decks
        if (!deck || !deck.cards || deck.cards.length === 0) {
            alert("Could not find a valid deck with cards.");
            return;
        }

        // Step 3: Start the practice session (dispatch cards, navigate to quiz).
        startPracticeSession(deck, dispatch, navigate, {shuffle});
    };
    return <>
        <Box 
            display="flex" 
            flexDirection="column" 
            alignItems="center" 
            justifyContent="center" 
            minHeight="80vh"
            ml={6}
        >
            {/* Card-like container */}
            <Paper 
                elevation={3} 
                sx={{
                    p: 4, 
                    borderRadius: 2, 
                    width: "100%", 
                    maxWidth: 400, 
                    textAlign: "center" 
                }}
            >
                <Typography variant="h5" fontWeight="bold" mb={3}>
                    Start Your Flashcard Practice
                </Typography>

                {/* Deck selection dropdown */}
                <Box mb={2}>
                    <DeckSelector />
                </Box>

                {/* Shuffle option */}
                <Box mb={2}>
                    <FormControlLabel
                        control={
                            <Checkbox 
                                checked={shuffle} 
                                onChange={(e) => setShuffle(e.target.checked)} 
                            />
                        }
                        label="Shuffle Cards"
                    />
                </Box>

                {/* Start Quiz button */}
                <Button 
                    variant="contained" 
                    size="large"
                    fullWidth 
                    onClick={handleClick}
                >
                    Start the Quiz
                </Button>
            </Paper>
        </Box>
    </>
}
