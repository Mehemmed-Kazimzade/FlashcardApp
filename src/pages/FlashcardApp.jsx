import { useNavigate } from "react-router";
import DeckSelector from "../components/DeckSelector";
import { useQuiz } from "../hooks/QuizContext";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  FormControlLabel,
  Checkbox,
  Box,
  Paper,
  Button,
  Typography,
  Stack,
  Divider
} from "@mui/material";

import ShuffleIcon from '@mui/icons-material/Shuffle';
import TimerIcon from '@mui/icons-material/Timer';

// Utilities
import { startPracticeSession } from "../utils/startPracticeSession";
import determineModeFromSelectedDeck from "../utils/determineModeFromSelectedDeck";
import getDeckFromSelectedMode from "../utils/getDeckFromSelectedMode";
import TimeSetter from "../components/timeSetter";

export default function FlashcardApp() {
  const [shuffle, setShuffle] = useState(false);
  const navigate = useNavigate();
  const { selectedDeck, dispatch, timer, isValid, timeDispatch } = useQuiz();

  const setTimer = (checked) => {
    timeDispatch({ type: "SET_TIMER", payload: { checked } });
  };

  const handleClick = () => {
    if (timer && !isValid) return;

    const mode = determineModeFromSelectedDeck(selectedDeck);
    const deck = getDeckFromSelectedMode(mode, selectedDeck);

    if (!deck || !deck.cards || deck.cards.length === 0) {
      alert("Could not find a valid deck with cards.");
      return;
    }

    startPracticeSession(deck, dispatch, navigate, selectedDeck, { shuffle });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="85vh" px={2}>
        {timer && <TimeSetter />}

        <Paper elevation={4} sx={{ p: 4, borderRadius: 4, width: "100%", maxWidth: 420, backgroundColor: "#fdfdfd", textAlign: "center"}}>
            <Typography variant="h5" fontWeight="bold" mb={2}>
                Start Your Flashcard Practice
            </Typography>

          <Divider sx={{ mb: 3 }} />

            <Box mb={3}>
                <DeckSelector />
            </Box>

        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" mb={3}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={shuffle}
                  onChange={(e) => setShuffle(e.target.checked)}
                  icon={<ShuffleIcon />}
                  checkedIcon={<ShuffleIcon color="primary" />}
                />
              }
              label="Shuffle"
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={timer}
                  onChange={(e) => setTimer(e.target.checked)}
                  icon={<TimerIcon />}
                  checkedIcon={<TimerIcon color="primary" />}
                />
              }
              label="Timer"
            />
          </Stack>

          <Button variant="contained" fullWidth size="large" onClick={handleClick}
                sx={{
                fontWeight: "bold",
                textTransform: "none",
                py: 1.2
                }}
            >
            Start the Quiz
          </Button>
        </Paper>
      </Box>
    </motion.div>
  );
}
