import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel'; 
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import { useQuiz } from '../hooks/QuizContext';
import getDecksFromLocalStorage from '../utils/getDecksFromLocalStorage';

export default function DeckSelector() {
    const {selectedDeck, dispatch} = useQuiz();
    const allDecks = getDecksFromLocalStorage();

    const handleChange = (e) => {
        let newSelectedDeck = e.target.value;
        dispatch({type: "SET_DECK", payload: {newSelectedDeck} });
    }

    return <>
        <Box minWidth={120}>
            <FormControl sx={{width:200}}>
                <InputLabel id="demo-simple-select-label">Deck</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedDeck}
                    label="Select Deck"
                    onChange={(e) => handleChange(e)}>
                    <MenuItem value={"Random Deck"}>Random Deck</MenuItem>

                    {
                        allDecks.map(d => (
                            <MenuItem value={d.deckName}>{d.deckName}</MenuItem>
                        ))
                    }

                </Select>
            </FormControl>
        </Box>
    </>
}