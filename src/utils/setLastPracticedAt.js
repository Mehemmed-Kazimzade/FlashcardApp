export default function setLastPracticedAt(decksIndex) {
    for(const index of decksIndex) {
        const deck = JSON.parse(localStorage.getItem(index), "{}");
        deck.lastPracticed = new Date().toISOString();
        localStorage.setItem(index, JSON.stringify(deck));
    }
}