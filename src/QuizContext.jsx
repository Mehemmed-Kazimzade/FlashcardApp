import { createContext, useState, useContext } from "react";

const QuizContext = createContext();

export function QuizProvider({children}) {
    const [flashcards, setFlashcards] = useState([]);
    const [score, setScore] = useState(0);
    const [category, setCategory] = useState("All");

    return (
        <QuizContext.Provider value={{flashcards, setFlashcards, score, setScore, category, setCategory}}>
            {children}
        </QuizContext.Provider>
    )
}

export function useQuiz() {
    return useContext(QuizContext);
}

