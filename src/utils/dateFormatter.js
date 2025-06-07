function formatDate(lastPracticed) {
    const now = new Date().toISOString();
    const nowDate = new Date(now);
    const lastPracticedDate = new Date(lastPracticed);

    const timeDifference = nowDate.getTime() - lastPracticedDate.getTime();

    const timeInSeconds = timeDifference / 1000;
    const timeInMinutes = timeInSeconds / (60);
    const timeInHours = timeInMinutes / (60);
    const timeInDays = timeInHours / (24);
    const timeInWeeks = timeInDays / 7;

    if (timeInSeconds < 10) return "a few seconds ago";

    else if (timeInSeconds < 60) return `${timeInSeconds.toFixed(0)} seconds ago`;

    else if (timeInMinutes < 2) return `a minute ago`;
    
    else if (timeInMinutes < 60) return `${timeInMinutes.toFixed(0)} minutes ago`;

    else if (timeInHours < 2) return `an hour ago`;
    
    else if (timeInHours < 24) return `${timeInHours.toFixed(0)} hours ago`;

    else if (timeInDays < 2) return `a day ago`;

    else if (timeInDays < 7) return `${timeInDays.toFixed(0)} days ago`;
    

    return `${timeInWeeks.toFixed(0)} weeks ago`;
}

export default formatDate;
