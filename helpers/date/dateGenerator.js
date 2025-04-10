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


const parseUserDateToUTC = (userDateString) => {
    // If it's already a Date object, return its UTC equivalent
    if (userDateString instanceof Date) {
        return new Date(userDateString.toUTCString());
    }

    // If it's not a string, throw an error or handle it
    if (typeof userDateString !== 'string') {
        throw new Error("Invalid input: expected a formatted date string");
    }

    // Example: "7:54 AM 10 April 2025"
    const [time, ampm, day, monthName, year] = userDateString.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (ampm === "PM" && hours !== 12) hours += 12;
    if (ampm === "AM" && hours === 12) hours = 0;

    const month = monthNames.indexOf(monthName); // 0-based month

    const localDate = new Date(year, month, day, hours, minutes);

    return localDate; // Mongo will store in UTC
};


module.exports = { dateGenerator, monthNames, parseUserDateToUTC };
