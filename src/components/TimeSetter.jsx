import { TextField } from "@mui/material";
import { useQuiz } from "../hooks/QuizContext";

export default function TimeSetter() {
    const {duration, isValid, timeDispatch} = useQuiz();

    const handleChange = (value) => {
        // Allow empty input
        if (value === "") {
            let isValid = true;

            timeDispatch({type: "SET_DURATION", payload: {value}});
            timeDispatch({type: "SET_IS_VALID", payload: {isValid}});

            return;
        }

        // Allow only digits
        if (/^\d+$/.test(value)) {
            const number = parseInt(value, 10);
            if (number >= 1 && number <= 30) {
                let isValid = true;
                timeDispatch({type: "SET_IS_VALID", payload: {isValid}});
            }
            else{
                let isValid = false;
                timeDispatch({type: "SET_IS_VALID", payload: {isValid}});
            }
        }
        
        else{
            let isValid = false;
            timeDispatch({type: "SET_IS_VALID", payload: {isValid}});
        }

        timeDispatch({type: "SET_DURATION", payload: {value}});
    };

    return <TextField type="text" value={duration} 
            label="Set Time (min)" sx={{ mb: 0.5 }} onChange={e => handleChange(e.target.value)}
            helperText={!isValid ? "Enter a number between 1 and 30" : " "}
            slotProps={{ htmlInput: {inputMode: "numeric", pattern: "[0-9]*"}, formHelperText: { color: "error", fontWeight: "bold" } }}>
    </TextField>
}