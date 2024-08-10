export const getShowDate = (reserved_date,showtime)=>{
    const time = showtime.replace(/[A-Za-z\s]/g,'')
    const zone = showtime.replace(/[^A-Za-z\s]/g,"")
    let [hour,minute] = time.split(":")
    hour = parseInt(hour,10)
    if(zone === 'PM' && hour !== 12){
        hour += 12
    }
    if(zone === 'AM' && hour === 12){
        hour = 0
    }
    const showDate = new Date(reserved_date)
    showDate.setMinutes(minute)
    showDate.setHours(hour)
    return showDate
}