const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May", // Corrected the order of May and June
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

const dateGenerator = (inputDate) => {
    const date =new Date (inputDate)
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    console.log(`${hours}:${minutes} ${ampm} ${day} ${month} ${year}`)
    return `${hours}:${minutes} ${ampm} ${day} ${month} ${year}`;
};

module.exports = { dateGenerator, monthNames };
