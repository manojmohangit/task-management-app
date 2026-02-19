export function formatDate(timestamp: number) {

    let date = new Date(timestamp);
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return `${dayNames[date.getDay()]} ${date.getDate()}, ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
}