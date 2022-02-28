export const formatDate = (date) => {
    const d = new Date(date);
    const month = '' + (d.getMonth() + 1);
    const day = '' + d.getDate();
    const year = d.getFullYear();

    return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;
}

export const formatDateTime = (date) => {
    const d = new Date(date);
    const month = '' + (d.getMonth() + 1);
    const day = '' + d.getDate();
    const year = d.getFullYear();
    const hour = '' + d.getHours();
    const minute = '' + d.getMinutes();
    const seconds = '' + d.getSeconds();

    return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year} ${hour.padStart(2, '0')}:${minute.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
}