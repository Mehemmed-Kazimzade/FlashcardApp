import { useQuiz } from "./QuizContext";
import { useNavigate } from "react-router";


export function useQuizManager() {
    const {flipCard, setSeries, flashcards, setScore} = useQuiz();
    const navigate = useNavigate();

    const showAnswer = (id) => flipCard(id);

    const handleNext = (place, id) => {
        if (place < flashcards.length) {
            flipCard(id);
            setSeries(prev => prev + 1);
        }
    }

    const handlePrevious = (place, id) => {
        if (place > 1){
            flipCard(id);
            setSeries(prev => prev - 1);
        }
    }

    const handleScore = (score, place, id) => {
        setScore(prev => prev + score);

        if(place === flashcards.length) endQuiz();
        else handleNext(place, id);
    }

    const endQuiz = () => navigate("/result");

    return {showAnswer, handleNext, handlePrevious, handleScore, endQuiz}
}

