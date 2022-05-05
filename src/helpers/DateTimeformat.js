export const formatDate = (date) => {
    const { day, month, year } = getDateVariables(date);
    return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;
};

export const formatDatePrimitive = (date) => {
    const { day, month, year } = getDateVariables(date);
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};

function getDateVariables(date) {
    const d = new Date(date);
    const month = '' + (d.getMonth() + 1);
    const day = '' + d.getDate();
    const year = d.getFullYear();

    return { year, day, month };
}

function getTimeVariables(date) {
    const d = new Date(date);
    const hours = '' + d.getHours();
    const minutes = '' + d.getMinutes();
    const seconds = '' + d.getSeconds();

    return { hours, minutes, seconds };
}

export const formatDateTime = (date) => {
    const { day, month, year } = getDateVariables(date);
    const { hours, minutes, seconds } = getTimeVariables(date);

    return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year} ${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
}

export const formatTime = (date) => {
    const { hours, minutes, seconds } = getTimeVariables(date);
    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
}