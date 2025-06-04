import shuffleArray from "./shuffleArray";

export default function getAllDecksCombined() {
    const decksIndex = JSON.parse(localStorage.getItem("decksIndex"), "[]");
    
    const shuffledDecksIndex = shuffleArray(decksIndex);

    const allDecks = {
        id: decksIndex.join(" "),
        deckName: "All Decks",
        cards: [],
    };

    for(const index of shuffledDecksIndex) {
        const deck = JSON.parse(localStorage.getItem(index), "{}");
        allDecks["cards"].push(...deck.cards);
    }

    return allDecks;
}