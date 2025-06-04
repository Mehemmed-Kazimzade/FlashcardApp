// utils/assignPlaces.js
/**
 * Assigns the `place` field to each card based on its new position.
 * @param {Array} cards - flashcards array (possibly shuffled)
 * @returns {Array} newCards with updated place fields
 */
export default function assignPlaces(cards) {
    return cards.map((card, index) => ({
        ...card,
        place: index + 1,
    }));
}