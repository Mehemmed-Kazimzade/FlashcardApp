export default function getDeckWithId(deckId) {
    const deck = JSON.parse(localStorage.getItem(deckId));
    return deck;
}
