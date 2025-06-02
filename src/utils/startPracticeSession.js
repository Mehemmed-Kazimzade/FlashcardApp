import convertDeckIntoFlashcard from "./convertDeckIntoFlashcard";

/**
 * Launches a practice session with the given deck
 * @param {Object} deck - deck object with cards
 * @param {Function} dispatch - quiz context dispatcher
 * @param {Function} navigate - react-router navigate function
 */
export function startPracticeSession(deck, dispatch, navigate) {
    const flashcards = convertDeckIntoFlashcard(deck);
    dispatch({ type: "SET_FLASHCARDS_FROM_DECK", payload: { flashcards } });
    navigate("/practice/");
}