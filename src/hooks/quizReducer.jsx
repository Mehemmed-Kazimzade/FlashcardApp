export const initialState = {
    category: "All",
    selectedDeck: "Random Deck",
    decksIndex: [],
    flashcards: [],
    score: 0,
    series: 0,
    duration: 0,
    quizEnded: false,
    unimportedDeck: null,
    unimported: false,
    practicingForgottenCards: false,
};

export function quizReducer(state, action) {
    const flipCardById = (cards, id) => {
        return cards.map(card => (card.id === id) ? {...card, flipped: !card.flipped} : card);
    }

    switch(action.type) {

        case "SET_CATEGORY": {
            const {newCategory} = action.payload;

            return {
                ...state,
                category: newCategory
            }
        }

        case "SET_DECK": {
            const {newSelectedDeck} = action.payload;

            return {
                ...state,
                selectedDeck: newSelectedDeck,
            }
        }

        case "SET_PRACTICING_FORGOTTEN_CARDS": {
            return {
                ...state,
                practicingForgottenCards: true,
            }
        }

        case "SET_UNIMPORTED": {
            const {deck} = action.payload;

            return {
                ...state,
                unImportedDeck: deck,
                unimported: true,
            }
        }

        case "SET_FLASHCARDS_FROM_DECK": {
            const {flashcards, selectedDeck, decksIndex} = action.payload;
            
            return {
                ...initialState,
                unimportedDeck: state.unImportedDeck,
                unimported: state.unimported,
                decksIndex: decksIndex,
                selectedDeck: selectedDeck,
                flashcards: flashcards,
                quizEnded: false,
            }
        }

        case "FLIP": {
            const {id} = action.payload;
            const updated = flipCardById(state.flashcards, id);

            return {
                ...state,
                flashcards: updated
            }
        }

        case "NEXT": {
            const {id} = action.payload;

            const updated = flipCardById(state.flashcards, id);

            return {
                ...state,
                flashcards: updated,
                series: state.series + 1,
            }
        }

        case "PREVIOUS": {
            const {id} = action.payload;

            const updated = flipCardById(state.flashcards, id);

            return {
                ...state,
                flashcards: updated,
                series: state.series - 1,
            }
        }

        case "RECORD_SCORE": {
            const {score} = action.payload;

            return {
                ...state,
                score: state.score + score,
            }
        }

        case "RECORD_REMEMBERED": {
            const {id} = action.payload;

            const updatedFlashcards = state.flashcards.map(card => (
                (card.id === id) ? {...card, isRemembered: true} : card
            ))

            return {
                ...state,
                flashcards: updatedFlashcards
            }
        }

        case "PRACTICE_AGAIN": {
            const {updatedFlashcards} = action.payload;

            return {
                ...state,
                flashcards: updatedFlashcards,
                series: 0,
                score: 0,
                practicingForgottenCards: true,
                quizEnded: false,
            }
        }

        case "RESET_QUIZ": {
            return {
                ...initialState,
            }
        }

        case "END_QUIZ": {
            return {
                ...state,
                quizEnded: true,
            }
        }

        default: 
            return state;
    }
}