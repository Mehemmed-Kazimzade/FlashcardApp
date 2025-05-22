import { useState } from "react"
import Flashcard from "./Flashcard";
import { useQuiz } from "./QuizContext";

export default function FlashcardList() {
    const {flashcards, setFlashcards} = useQuiz();
    const [series, setSeries] = useState(0);

    const flipCard = (id) => {
        setFlashcards(prev => {
            return prev.map(e => e.id === id ? {...e, flipped: !e.flipped} : e)
        })
    }

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
        {<Flashcard flashcardObject={flashcardObject}
                    flipCard={flipCard}
                    setSeries={setSeries}
                    size={flashcards.length}
        />}
    </>
}