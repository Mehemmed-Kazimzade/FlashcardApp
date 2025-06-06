import { createContext, useContext, useReducer } from "react";
import { initialState, quizReducer } from "./quizReducer";
import { initialTimeState,timeReducer } from "./timeReducer";

const QuizContext = createContext();

export function QuizProvider({children}) {
    const [state, dispatch] = useReducer(quizReducer, initialState);
    const [timeState, timeDispatch] = useReducer(timeReducer, initialTimeState);

    return (
        <QuizContext.Provider value={{...state, dispatch, ...timeState, timeDispatch}}>
            {children}
        </QuizContext.Provider>
    )
}

export function useQuiz() {
    return useContext(QuizContext);
}

