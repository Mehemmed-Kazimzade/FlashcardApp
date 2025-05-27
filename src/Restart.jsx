import { Button } from "@mui/material";
import { useQuiz } from "./QuizContext";
import { useNavigate } from "react-router";

export default function Restart() {
    const {dispatch} = useQuiz();
    const navigate = useNavigate();

    const handleClick = () => {
        dispatch({type: "RESET_QUIZ"});
        navigate("/");
    }

    return (
        <Button variant="contained" sx={{ marginBlockStart: 2 }} onClick={handleClick}> Reset the quiz </Button>
    )
    
}