export default function exportAsCSV(filename, deck) {
    const headers = ["Question", "Answers"];
    const rows = deck.cards.map(card => [card.question, card.answer]);
    
    const csv = [headers, ...rows].map(
        row => row.map(val => `"${String(val).replace(/"/g, '""')}"`).join(",")).join("\n");
    
    const blob = new Blob([csv], {type:"text/csv;charset=utf-8;"});
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download =  `${filename.replace(/\s+/g, "_")}_Deck.csv`;
    link.click();
}