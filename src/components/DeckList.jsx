import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import { useNavigate } from "react-router";
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { Link } from 'react-router';
import React from "react";
import { useQuiz } from '../hooks/QuizContext';
import { startPracticeSession } from '../utils/startPracticeSession';
import formatDate from '../utils/dateFormatter';
import LongMenu from './LongMenu';
import deleteDeckFromLocalStorage from '../utils/deleteDeckFromLocalStorage';

// @ts-check

/**
 * @param {Object[]} decks
 * @returns {React.JSX.Element}
 */

export default function DeckList({decks, searchValue}) {
    const {dispatch, timeDispatch} = useQuiz();
    const navigate = useNavigate();

    const handlePractice = (deck) => {
        startPracticeSession(deck, dispatch, navigate, deck.deckName);
    }

    const handleDelete = (id) => {
        deleteDeckFromLocalStorage(id);
        navigate("/decks/", {state: {status:"SUCCESS", message: "Deck deleted successfully"}});
    }


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
        {decks.map(oneDeck => (
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
        ))}
    </>
}