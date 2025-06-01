export default function getDecksFromLocalStorage() {
    const decksIndex = JSON.parse(localStorage.getItem("decksIndex") || "[]");

    const decks = [];

    decksIndex.forEach(deckIdx => {
        decks.push(JSON.parse(localStorage.getItem(deckIdx) || "{}"));
    });

    return decks;
}