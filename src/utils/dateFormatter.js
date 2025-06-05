import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

function formatDate(lastPracticed) {
    return dayjs(lastPracticed).fromNow();
}

export default formatDate;
