import { createContext, useContext, useReducer } from "react";
import { initialState, quizReducer } from "./quizReducer";

const QuizContext = createContext();

export function QuizProvider({children}) {
    const [state, dispatch] = useReducer(quizReducer, initialState);

    return (
        <QuizContext.Provider value={{...state, dispatch}}>
            {children}
        </QuizContext.Provider>
    )
}

export function useQuiz() {
    return useContext(QuizContext);
}

