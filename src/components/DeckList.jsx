import { Box, Grid, Typography } from '@mui/material';
import { useNavigate } from "react-router";
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import React, { useCallback } from "react";
import { useQuiz } from '../hooks/QuizContext';
import { startPracticeSession } from '../utils/startPracticeSession';
import DeckCard from './DeckCard';

// @ts-check

/**
 * @param {Object[]} decks
 * @returns {React.JSX.Element}
 */

export default function DeckList({decks, searchValue}) {
    const {dispatch} = useQuiz();
    const navigate = useNavigate();

    const handlePractice = useCallback(
        deck => startPracticeSession(deck, dispatch, navigate, deck.deckName)
        ,[dispatch, navigate]);


    if (decks.length === 0) {
        return <>
            <Grid size={{xs: 12, sm: 6,  md: 4}}>
                <Box sx={{ textAlign: 'center', mt: 6 }}>
                    <FolderOpenIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                        <Typography className='text' variant="h6" color="text.secondary">
                            {searchValue === "" ? "You haven't created any decks yet." : 
                            `There is no deck that matches with '${searchValue}'`}
                        </Typography>
                    <Typography className='text' variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Start by clicking “Create New Deck” above.
                    </Typography>
                </Box>
            </Grid>
        </>
    }

    return <>
        {decks.map(oneDeck => <DeckCard key={oneDeck.id} oneDeck={oneDeck} handlePractice={handlePractice} />)}
    </>
}