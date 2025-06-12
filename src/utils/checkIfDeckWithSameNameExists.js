export default function checkIfDeckWithSameNameExists(name) {
    const decksIndex = JSON.parse(localStorage.getItem("decksIndex")) || [];

    for(let i = 0; i < decksIndex.length; i++) {
        const deck = JSON.parse(localStorage.getItem(decksIndex[i]));

        if (deck.deckName === name) return true;
    }

    return false;
}