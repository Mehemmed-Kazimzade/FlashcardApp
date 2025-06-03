import getAllDecksCombined from "./getAllDecksCombined";
import getDeckFromName from "./getDeckFromName";
import selectRandomDeck from "./selectRandomDeck";

/**
 * Retrieves the correct deck object based on the given quiz mode.
 * This abstracts away the logic of fetching decks from localStorage.
 *
 * @param {"random" | "all" | "selected"} mode - Quiz mode to decide deck source
 * @param {String} selectedDeck
 * @returns {Object|null} deck - A deck object with a `cards` array, or null if not found
 */

export default function getDeckFromSelectedMode(mode, selectedDeck = "") {
    let deck = null;

    switch (mode) {
        case "random": {
            deck = selectRandomDeck();
            break;
        }

        case "all": {
            deck = getAllDecksCombined();
            break;
        }

        default : {
            deck = getDeckFromName(selectedDeck); // mode === deckName when selected
        }
    }

    return deck;
}