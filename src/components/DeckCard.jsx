import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import { Link } from 'react-router';
import React, { useCallback } from "react";
import { useQuiz } from '../hooks/QuizContext';
import formatDate from '../utils/dateFormatter';

// Define props with JSDoc for clarity
/**
 * @param {Object} props
 * @param {Object} props.oneDeck - The individual deck object
 * @param {Function} props.handlePractice - Function to set toast messages (if needed by LongMenu)
 */

function DeckCard({ oneDeck, handlePractice }) {
    const {timeDispatch} = useQuiz();

    return <>
        <Grid key={oneDeck.id} size={{xs: 12, sm: 6, md: 4}} position={"relative"}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>

                <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {oneDeck.deckName}
                </Typography>

                <Typography variant="body2" color="text.secondary" gutterBottom>
                    {oneDeck.cards.length} card(s) • Last practiced: {oneDeck.lastPracticed === null ? "Never" : formatDate(oneDeck.lastPracticed)}
                </Typography>

                <Typography variant="body2" sx={{ mt: 1 }}>
                    Best score: {oneDeck.bestScore ? oneDeck.bestScore : 0} / {oneDeck.cards.length}
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }} className="deckButtonsContainer">

                    <Button size="small" variant="contained" onClick={() => {
                        timeDispatch({type: "RESET_TIMER" });
                        handlePractice(oneDeck);
                    }} >Practice</Button>

                    <Link to={`/editDeck/${oneDeck.id}`}><Button size="small" variant="outlined" fullWidth={true}>Edit</Button></Link>
                </Box>
            </Paper>
        </Grid>
    </>

}

export default React.memo(DeckCard);