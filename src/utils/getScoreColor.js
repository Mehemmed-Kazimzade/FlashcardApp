const getScoreColor = (score, total) => {
    const ratio = score / total;
    if (ratio === 1) return "success.main";
    if (ratio >= 0.6) return "warning.main";
    return "error.main";
};

export default getScoreColor;