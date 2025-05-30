import { Button } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import CategorySelector from "../components/CategorySelector";
import EnrichData from "../utils/EnrichData";
import { useQuiz } from "../hooks/QuizContext";

export default function FlashcardApp() {
    const navigate = useNavigate(); 
    const {category, dispatch} = useQuiz();

    useEffect(() => {
        const enrichedData = EnrichData(category);
        dispatch({type: "SET_FLASHCARDS", payload: {enrichedData} });
    }, [category]);

    const handleClick = () => navigate("/practice/");

    return <>
        <CategorySelector />
        <Button variant="contained" sx={{ marginBlockStart: 2 }} onClick={handleClick}>Start the Quiz</Button>
    </>
}
