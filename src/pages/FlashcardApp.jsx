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
import getDecksFromLocalStorage from '../utils/getDecksFromLocalStorage';
import ResponsiveButton from "../components/ResposiveButton";
import NoDecksUI from "../components/NoDecksUI";

export default function FlashcardApp() {
  const { selectedDeck, dispatch, timer, isValid, timeDispatch } = useQuiz();
  const [shuffle, setShuffle] = useState(false);
  const navigate = useNavigate();
  const allDecks = getDecksFromLocalStorage();


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
      <Box className="mainContainer">
        {timer && <TimeSetter />}

        <Paper className="practicePaperContainer" elevation={4}>
            { allDecks.length === 0 ? <NoDecksUI /> :
            <div>
                <Typography variant="h5" fontWeight="bold" mb={2} fontSize={{ xs: 16 }} >
                    Start Your Flashcard Practice
                </Typography>

                <Divider sx={{ mb: 3 }} />

                    <Box mb={3}>
                        <DeckSelector allDecks={allDecks} />
                    </Box>

                <Stack direction={{ xs: 'column', lg: 'row' }} spacing={2} justifyContent="center" alignItems="center" mb={3}>
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
            <ResponsiveButton onClick={handleClick} text={"Start the Quiz"} />
          </div> }
        </Paper>
      </Box>
    </motion.div>
  );
}
