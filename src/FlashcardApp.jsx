import { Button } from "@mui/material";
import CategorySelector from "./CategorySelector";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useQuiz } from "./QuizContext";
import EnrichData from "./EnrichData";

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
        <Button variant="contained" onClick={handleClick}>Start the Quiz</Button>
    </>
}
