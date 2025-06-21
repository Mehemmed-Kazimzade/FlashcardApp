export default function deleteDeckFromLocalStorage(id) {
    const deck = JSON.parse(localStorage.getItem(id));

    if (deck !== null) {
        const deckName = deck.deckName;

        const stats = JSON.parse(localStorage.getItem("stats"));
        console.log(stats, deckName);
        if(stats[deckName]) delete stats[deckName];

        localStorage.setItem("stats", JSON.stringify(stats))

        localStorage.removeItem(id);
        const decksIndex = JSON.parse(localStorage.getItem("decksIndex"));
        localStorage.setItem("decksIndex", JSON.stringify(decksIndex.filter(deckId => deckId !== id)));
    }
}