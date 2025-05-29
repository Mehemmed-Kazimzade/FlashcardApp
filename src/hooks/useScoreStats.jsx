export default function useScoreStats(flashcards) {
    const remembered = flashcards.filter(card => card.isRemembered).length;
    const forgotten = flashcards.length - remembered;

    return {remembered, forgotten};
}