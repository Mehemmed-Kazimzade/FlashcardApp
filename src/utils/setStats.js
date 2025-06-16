export default function setStats(deckName, score, total) {
  const stats = JSON.parse(localStorage.getItem("stats") || "{}");

  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const formattedDate = `${day}/${month}`;

  const newStat = { date: formattedDate, score, total };

  if (!stats[deckName]) {
    stats[deckName] = [];
  }

  stats[deckName].push(newStat);

  localStorage.setItem("stats", JSON.stringify(stats));
}