export const getTimeFrame = (date)=>{
    if(date){
      const notificationDate = new Date(date);
      const now = new Date();
      const differnceInMilliSeconds = now  - notificationDate;
      const hour = 60 * 60 * 1000;
      const minute = 60 * 1000;
      const day =  24 * 60 * 60 * 1000;
      if(differnceInMilliSeconds <=  hour){
        const estimatedMinutes = Math.ceil(differnceInMilliSeconds/minute);
        return `${estimatedMinutes} ${estimatedMinutes=== 1 ? 'minute' : 'minutes'} ago`
      }else if(differnceInMilliSeconds <= day){
        const estimatedHour = Math.floor(differnceInMilliSeconds/hour);
        return `${estimatedHour} ${estimatedHour=== 1 ? 'hour' : 'hours'}  ago`
      }else if(differnceInMilliSeconds <= 10 * day){
        const estimatedDays = Math.floor(differnceInMilliSeconds/day)
        return `${estimatedDays} ${estimatedDays=== 1 ? 'day' : 'days'}  ago`
      }else{
        return notificationDate.toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'})
      }
    }

  }