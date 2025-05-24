import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel'; 
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import { useQuiz } from './QuizContext';

export default function CategorySelector() {
    const {category, dispatch} = useQuiz();

    return <>
        <Box minWidth={120}>
            <FormControl sx={{width:200}}>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={category}
                    label="Category"
                    onChange={(e) => dispatch({type: "SET_CATEGORY", payload: e.target.value})}>
                    <MenuItem value={"All"}>All</MenuItem>
                    <MenuItem value={"React"}>React</MenuItem>
                    <MenuItem value={"Java"}>Java</MenuItem>
                    <MenuItem value={"JavaScript"}>JavaScript</MenuItem>
                </Select>
            </FormControl>
        </Box>
    </>
}