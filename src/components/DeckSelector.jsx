import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel'; 
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import { useQuiz } from '../hooks/QuizContext';
import NoDecksUI from './NoDecksUI';

export default function DeckSelector( {allDecks} ) {
    const {selectedDeck, dispatch} = useQuiz();

    const handleChange = (e) => {
        let newSelectedDeck = e.target.value;
        dispatch({type: "SET_DECK", payload: {newSelectedDeck} });
    }

    return <>
        <Box minWidth={120}>
            { allDecks.length === 0 ? <NoDecksUI /> :
            <FormControl >
                <InputLabel id="demo-simple-select-label">Deck</InputLabel>
                <Select className='deckSelector'
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedDeck}
                    label="Select Deck"
                    onChange={(e) => handleChange(e)}>
                    <MenuItem value={"Random Deck"}>Random Deck</MenuItem>
                    <MenuItem value={"All Decks"}>All Decks</MenuItem>

                    {
                        allDecks.map(d => (
                            <MenuItem value={d.deckName}>
                                {d.deckName}
                            </MenuItem>
                        ))
                    }

                </Select>
            </FormControl>}
        </Box>
    </>
}