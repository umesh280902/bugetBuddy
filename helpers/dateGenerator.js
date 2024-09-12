const dateGenerator=()=>{
    const date=new Date()

    let hours=date.getHours();
    const minutes=date.getMinutes().toString().padStart(2,'0')
    const ampm=hours>=12?'PM':'AM';
    hours=hours%12||12;

    const day=date.getDate();
    const monthNames=[
        "January",
        "Feburary",
        "March",
        "April",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ]
    const month=monthNames[date.getMonth()]
    const year=date.getFullYear();

    return `${hours}:${minutes} ${ampm} ${day} ${month} ${year}`

}

module.exports=dateGenerator