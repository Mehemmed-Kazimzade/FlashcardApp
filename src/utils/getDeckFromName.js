export default function getDeckFromName(deckName) {
    const decksIndex = JSON.parse(localStorage.getItem("decksIndex") || "[]");

    // found variable corresponds to deck that is founded or null if not.
    let found = null;

    decksIndex.forEach(e => {
        if (found !== null) return;
        const selectedDeck = JSON.parse(localStorage.getItem(e) || "{}");
        if (selectedDeck.deckName === deckName){
            found = selectedDeck;
        }
    })

    return found;
}