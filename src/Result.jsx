import { useQuiz } from "./QuizContext"

export default function Result() {
    const {score, flashcards} = useQuiz();
    return <>
        <h2>Congrats, your score is: {score} / {flashcards.length}</h2>
    </>
}