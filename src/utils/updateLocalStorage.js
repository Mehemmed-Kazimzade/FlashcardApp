export default function updateLocalStorage(deckId, deckProp, cards) {
    const previousDeck = JSON.parse(localStorage.getItem(deckId));
    if (!deckProp.deckName || cards.length === 0) return;

    const submittedData = {
        ...previousDeck,
        ...deckProp,
        cards: cards,
        lastUpdatedAt: new Date().toISOString(),
    }

    localStorage.setItem(deckId, JSON.stringify(submittedData));
}