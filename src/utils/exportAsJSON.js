export default function exportAsJSON(filename, deck) {
    delete deck.id;
    const blob = new Blob([JSON.stringify(deck)], { type: "application/json" });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${filename.replace(/\s+/g, "_")}_Deck.json`;
    link.click();
}