import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router';
import { useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import ToastMessenger from '../components/ToastMessenger';
import getDecksFromLocalStorage from '../utils/getDecksFromLocalStorage';
import DeckList from '../components/DeckList';
import { motion } from 'framer-motion';

export default function Decks() {
    const location = useLocation();
    const [toastProps, setToastProps] = useState(null);
    const [decks, setDecks] = useState([]);
    const [filteredDecks, setFilteredDecks] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    const handleChange = (value) => {
        setSearchValue(value);
        if (value === "") {
            setFilteredDecks(decks);
        }

        else{
            const query = value.toLowerCase();
            const regex = new RegExp(query, "i");
            
            setFilteredDecks(decks.filter(deck => regex.test(deck.deckName.toLowerCase())));
        }
    }

    useEffect(() => {
        const decksFromStorage = getDecksFromLocalStorage();
        setDecks(decksFromStorage);
        setFilteredDecks(decksFromStorage);

        const state = location.state
        if(state?.message && state?.status) {
            setToastProps({status: state.status, message: state.message});
            window.history.replaceState({}, document.title);
        }
    }, [])

    return <>
    <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >

        {toastProps && <ToastMessenger status={toastProps.status} message={toastProps.message} />}
        <Box className="deckListContainer" sx={{ p: 4, maxWidth: 1000, mx: 'auto' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }} className="decksContainer" >
            <Typography variant="h4" fontWeight="bold">Your Decks</Typography>
            <Link to={"/createDeck/"}>
                <Button variant="contained" startIcon={<AddIcon />} className='createDeckButton'>
                    Create New Deck
                </Button>
            </Link>
          </Box>

          <TextField fullWidth variant="outlined" value={searchValue} onChange={(e) => handleChange(e.target.value)}
          placeholder="Search decks..." sx={{ mb: 4 }} />

          {/* Deck List Grid */}    
          <Grid container spacing={3} alignItems={"center"}>
            {<DeckList searchValue={searchValue} decks={filteredDecks}/>}
          </Grid>
        </Box>

    </motion.div>
    </>
}