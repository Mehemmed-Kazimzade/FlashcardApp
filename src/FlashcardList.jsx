import Flashcard from "./Flashcard";
import { useQuiz } from "./QuizContext";

export default function FlashcardList() {
    const {flashcards, series} = useQuiz();

    if (flashcards.length === 0) return <p>No Flashcards in this category</p>

    const currentFlashcard = flashcards[series];

    const flashcardObject = {
        id: currentFlashcard.id,
        place: currentFlashcard.place,
        answer: currentFlashcard.answer,
        flipped: currentFlashcard.flipped,
        question: currentFlashcard.question,
    }

    return <>
        {<Flashcard flashcardObject={flashcardObject}/>}
    </>
}