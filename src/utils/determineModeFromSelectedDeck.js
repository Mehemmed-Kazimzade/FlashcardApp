/**
 * Determines the quiz mode based on the user's selected option in the DeckSelector.
 * This is used to branch logic between:
 * - "random" deck mode
 * - "all" decks mode (merged deck)
 * - a specific user-created deck ("selected")
 *
 * @param {string} selectedDeck - The label selected by the user
 * @returns {"random" | "all" | "selected"}
 */

const determineModeFromSelectedDeck = (selectedDeck) => {
    if (selectedDeck === "Random Deck") return "random";
    if (selectedDeck === "All Decks") return "all";
    return "selected";
}

export default determineModeFromSelectedDeck;
