import axios from '../../utils/axios'

export const theatreGetShowBookingStatusService = (data,token)=>{
    return axios.post('/booking/getshowbookingstatus',data,{headers:{Authorization:`Bearer ${token}`}})
}

export const theatreCancelShowBookingsService = (data,token)=>{
    return axios.post('/booking/cancelshowbookings',data,{headers:{Authorization:`Bearer ${token}`}})
}

export const theatreGetBookingsByScreenService = (data,token)=>{
    return axios.post('/booking/getscreenbookings',data,{headers:{Authorization:`Bearer ${token}`}})
}

export const theatreGetSingleShowService = (data,token)=>{
    return axios.post('/booking/getsingleshow',data,{headers:{Authorization:`Bearer ${token}`}})
}

export const theatreGetCompleteBookingsService = (data,token)=>{
    return axios.post('/booking/getcompletebookings',data,{headers:{Authorization:`Bearer ${token}`}})
}

export const theatreBookSeatService = (data,token)=>{
    return axios.post('/booking/bookseat',data,{headers:{Authorization:`Bearer ${token}`}})
}