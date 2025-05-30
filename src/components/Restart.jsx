import { Button } from "@mui/material";
import { useQuiz } from "../hooks/QuizContext";
import { useNavigate } from "react-router";

export default function Restart() {
    const {dispatch} = useQuiz();
    const navigate = useNavigate();

    const handleClick = () => {
        dispatch({type: "RESET_QUIZ"});
        navigate("/");
    }

    return (
        <Button variant="outlined" sx={{ mt: 3, mb: 1 }} onClick={handleClick}> Reset the quiz </Button>
    )
    
}