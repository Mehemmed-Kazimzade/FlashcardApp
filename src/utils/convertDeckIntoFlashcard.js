export default function convertDeckIntoFlashcard(deck) {
    if (deck === null) return null;
    const flashcards = [];
    const cards = deck.cards;
    
    cards.forEach((card, idx) => (
        flashcards.push({...card, flipped: false, category: "All", isRemembered: false, place: idx + 1})
    ));

    return flashcards;
}