export const initialState = {
    category: "All",
    flashcards: [],
    score: 0,
    series: 0
};

export function quizReducer(state, action) {
    const flipCardById = (cards, id) => {
        return cards.map(card => (card.id === id) ? {...card, flipped: !card.flipped} : card);
    }

    switch(action.type) {
        case "SET_CATEGORY": {
            const {category} = action.payload;

            return {
                ...state,
                category: category
            }
        }

        case "SET_FLASHCARDS": {
            const {enrichedData} = action.payload;

            return {
                ...state,
                flashcards: enrichedData,
            }
        }

        case "INIT_QUIZ": {
            const {category, enrichedData} = action.payload;

            return {
                ...state,
                flashcards: enrichedData,
                category: category,
                series: 0,
                score: 0,
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

        case "RESET_QUIZ": {
            return {
                category: "All",
                flashcards: [],
                series: 0,
                score: 0,
            }
        }

        default: 
            return state;
    }
}