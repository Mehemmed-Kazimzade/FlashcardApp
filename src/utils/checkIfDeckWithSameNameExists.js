export default function checkIfDeckWithSameNameExists(name, latestName) {
    const decksIndex = JSON.parse(localStorage.getItem("decksIndex")) || [];

    for(let i = 0; i < decksIndex.length; i++) {
        const deck = JSON.parse(localStorage.getItem(decksIndex[i]));

        if (deck.deckName === name && name !== latestName) return true;
    }

    return false;
}