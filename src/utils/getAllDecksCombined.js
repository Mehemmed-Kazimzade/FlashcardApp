import shuffleArray from "./shuffleArray";

export default function getAllDecksCombined() {
    const decksIndex = JSON.parse(localStorage.getItem("decksIndex"), "[]");
    
    const shuffledDecksIndex = shuffleArray(decksIndex);

    const allDecks = {
        deckName: "All Decks",
        cards: [],
    };

    for(const index of shuffledDecksIndex) {
        const deck = JSON.parse(localStorage.getItem(index), "{}");
        console.log(deck);
        allDecks["cards"].push(...deck.cards);
    }

    return allDecks;
}