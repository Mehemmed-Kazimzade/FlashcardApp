import { TextField } from "@mui/material";
import { useState } from "react";

export default function TimeSetter( {isValid, setIsValid} ) {
    const [duration, setDuration] = useState("1");

    const handleChange = (value) => {
        // Allow empty input
        if (value === "") {
            setDuration("");
            setIsValid(true);
            return;
        }

        // Allow only digits
        if (/^\d+$/.test(value)) {
            const number = parseInt(value, 10);
            if (number >= 1 && number <= 30) {
                setIsValid(true);
            }
            else{
                setIsValid(false);
            }
        }

        else{
            setIsValid(false);
        }

        setDuration(value);
    };

    return <TextField type="text" value={duration} 
            label="Set Time (min)" sx={{ mb: 0.5 }} onChange={e => handleChange(e.target.value)}
            helperText={!isValid ? "Enter a number between 1 and 30" : " "}
            slotProps={{ htmlInput: {inputMode: "numeric", pattern: "[0-9]*"}, formHelperText: { color: "error", fontWeight: "bold" } }}>
    </TextField>
}