export default function getStats() {
    return JSON.parse(localStorage.getItem("stats") || "{}");
}