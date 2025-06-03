import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router';
import { useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import ToastMessenger from '../components/ToastMessenger';
import getDecksFromLocalStorage from '../utils/getDecksFromLocalStorage';
import DeckList from '../components/DeckList';

export default function Decks() {
    const location = useLocation();
    const [toastProps, setToastProps] = useState(null);
    const [decks, setDecks] = useState([]);

    useEffect(() => {
        setDecks(getDecksFromLocalStorage());
        const state = location.state
        if(state?.message && state?.status) {
            setToastProps({status: state.status, message: state.message});
            window.history.replaceState({}, document.title);
        }
    }, [])

    return <>
    {toastProps && <ToastMessenger status={toastProps.status} message={toastProps.message} />}

    <Box sx={{ p: 4, maxWidth: 1000, mx: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" fontWeight="bold">Your Decks</Typography>
        <Link to={"/createDeck/"}>
            <Button variant="contained" startIcon={<AddIcon />}>
                Create New Deck
            </Button>
        </Link>
      </Box>

      <TextField fullWidth variant="outlined" placeholder="Search decks..." sx={{ mb: 4 }} />

      {/* Deck List Grid */}
      <Grid container spacing={3} alignItems={"center"}>
        {<DeckList decks={decks} />}
      </Grid>
    </Box>
    </>
}