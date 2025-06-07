import setLastPracticedAt from "../utils/setLastPracticedAt";
import { useQuiz } from "./QuizContext";
import { useNavigate } from "react-router";
import { useRef } from "react";

export function useQuizManager() {
    const {flashcards,decksIndex, dispatch} = useQuiz();
    const endCalledRef = useRef(false);
    const navigate = useNavigate();

    const showAnswer = (id) => dispatch({type:"FLIP", payload: {id}});

    const handleNext = (place, id) => {
        if (place < flashcards.length) dispatch({type:"NEXT", payload: {id}});
    }   

    const handlePrevious = (place, id) => {
        if (place > 1) dispatch({type:"PREVIOUS", payload: {id}})
    }

    const handleScore = (score, place, id) => {
        if (!endCalledRef.current) {
            if (score === 1) dispatch({type:"RECORD_REMEMBERED", payload: {id}});
            dispatch({type: "RECORD_SCORE", payload: {score}});
        }

        if (place === flashcards.length) {
            endCalledRef.current = true;
            endQuiz()
        }

        else handleNext(place, id);
    }

    const endQuiz = () => {
        dispatch({type: "END_QUIZ"});
        setLastPracticedAt(decksIndex);
        navigate("/result");
    };

    return {showAnswer, handleNext, handlePrevious, handleScore, endQuiz}
}

