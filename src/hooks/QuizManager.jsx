import { useCallback } from "react";
import { useQuiz } from "./QuizContext";
import { useNavigate } from "react-router";

export function useQuizManager() {
    const {flashcards, dispatch, timeDispatch} = useQuiz();
    const navigate = useNavigate();

    const showAnswer = useCallback(id => dispatch({type:"FLIP", payload: {id}}), [dispatch]);

    const handleNext = useCallback((place, id) => {
        if (place < flashcards.length) dispatch({type:"NEXT", payload: {id}});
    }, [dispatch, flashcards.length]);

    const handlePrevious = useCallback((place, id) => {
        if (place > 1) dispatch({type:"PREVIOUS", payload: {id}});
    }, [dispatch]);

    const handleScore = useCallback((score, place, id) => {
        if (score === 1) dispatch({type:"RECORD_REMEMBERED", payload: {id}});
        dispatch({type: "RECORD_SCORE", payload: {score}});

        if (place === flashcards.length) {
            endQuiz()
        }

        else handleNext(place, id);
    }, [dispatch, flashcards.length]);

    const endQuiz = useCallback(() => {
        navigate("/result");
    }, [navigate]);

    return {showAnswer, handleNext, handlePrevious, handleScore, endQuiz}
}

