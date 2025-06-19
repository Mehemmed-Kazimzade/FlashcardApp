import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router';
import { useLocation } from 'react-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import getDecksFromLocalStorage from '../utils/getDecksFromLocalStorage';
import DeckList from '../components/DeckList';
import { motion } from 'framer-motion';
import ReusableSnackbar from '../components/ReusableSnackbar';

export default function Decks() {
    const location = useLocation();
    const [decks, setDecks] = useState([]);
    const [filteredDecks, setFilteredDecks] = useState([]);
    const [toast, setToast] = useState({ open: false, severity: "info", message: "" });
    const [searchValue, setSearchValue] = useState("");
    const timeOutIdRef = useRef(null);

    const applyFilter = useCallback(value => {
        if (value === ""){
            setFilteredDecks(decks);
        }
        
        else{
            const query = value.toLowerCase();
            const regex = new RegExp(query, 'i');
            
            setFilteredDecks(decks.filter(deck => regex.test(deck.deckName.toLowerCase())));
        }
        
    }, [decks]);
                
    const handleChange = useCallback(value => {
        setSearchValue(value);
        if(timeOutIdRef.current){
            clearTimeout(timeOutIdRef.current);
        }

        timeOutIdRef.current = setTimeout(() => applyFilter(value), 300);

    }, [applyFilter]);

    useEffect(() => {
        const decksFromStorage = getDecksFromLocalStorage();
        setDecks(decksFromStorage);
        setFilteredDecks(decksFromStorage);

        const state = location.state
        if(state?.message && state?.status) {
            setToast({open: true, severity: state.status.toLowerCase(), message: state.message});
            window.history.replaceState({}, document.title);
        }

        return () => {
            if(timeOutIdRef.current) clearTimeout(timeOutIdRef.current);
        };
    }, [])

    return <>
    <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >

        <ReusableSnackbar toast={toast} setToast={setToast} />

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