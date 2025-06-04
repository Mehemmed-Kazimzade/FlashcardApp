import convertDeckIntoFlashcard from "./convertDeckIntoFlashcard";
import shuffleArray from "./shuffleArray";
import assignPlaces from "../utils/assingPlaces";

/**
 * Launches a practice session with the given deck
 * @param {Object} deck - deck object with cards
 * @param {Function} dispatch - quiz context dispatcher
 * @param {Function} navigate - react-router navigate function
 */

export function startPracticeSession(deck, dispatch, navigate, selectedDeck, options = {}) {
    let flashcards = convertDeckIntoFlashcard(deck);
    const decksIndex = deck.id.split(" ");

    if (options.shuffle) flashcards = assignPlaces(shuffleArray(flashcards));

    dispatch({ type: "SET_FLASHCARDS_FROM_DECK", payload: { flashcards, selectedDeck, decksIndex} });
    navigate("/practice/");
}