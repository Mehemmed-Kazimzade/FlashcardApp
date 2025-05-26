import { useQuiz } from "./QuizContext";
import { useNavigate } from "react-router";


export function useQuizManager() {
    const {flashcards, dispatch} = useQuiz();
    const navigate = useNavigate();

    const showAnswer = (id) => dispatch({type:"FLIP", payload: {id}});

    const handleNext = (place, id) => {
        if (place < flashcards.length) dispatch({type:"NEXT", payload: {id}});
    }

    const handlePrevious = (place, id) => {
        if (place > 1) dispatch({type:"PREVIOUS", payload: {id}})
    }

    const handleScore = (score, place, id) => {
        dispatch({type: "RECORD_SCORE", payload: {score}});

        if(place === flashcards.length) endQuiz();

        else handleNext(place, id);
    }

    const endQuiz = () => {
        navigate("/result");
    };

    return {showAnswer, handleNext, handlePrevious, handleScore, endQuiz}
}

