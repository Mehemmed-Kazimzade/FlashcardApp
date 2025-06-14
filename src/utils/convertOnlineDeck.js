export default function convertOnlineDeck(onlineDeck) {
    return {
        id: onlineDeck.id,
        deckName: onlineDeck.name,
        deckDescription: "",
        cards: onlineDeck.cards,
    }
}