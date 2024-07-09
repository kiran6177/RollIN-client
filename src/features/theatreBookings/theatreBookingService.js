import axios from '../../utils/axios'

export const theatreGetShowBookingStatusService = (data,token)=>{
    return axios.post('/booking/getshowbookingstatus',data,{headers:{Authorization:`Bearer ${token}`}})
}

export const theatreCancelShowBookingsService = (data,token)=>{
    return axios.post('/booking/cancelshowbookings',data,{headers:{Authorization:`Bearer ${token}`}})
}