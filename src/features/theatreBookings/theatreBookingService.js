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

export const theatreGetScreenCollectionsService = (data,token)=>{
    return axios.post('/booking/getscreencollection',data,{headers:{Authorization:`Bearer ${token}`}})
}

export const theatreGetMovieCollectionsService = (token)=>{
    return axios.get('/booking/getmoviecollection',{headers:{Authorization:`Bearer ${token}`}})
}

export const theatreGetLatestOrdersService = (token)=>{
    return axios.get('/booking/getlatestorders',{headers:{Authorization:`Bearer ${token}`}})
}

export const theatreGetCollectionReportService = (data,token)=>{
    return axios.post('/booking/collectionreport',data,{headers:{Authorization:`Bearer ${token}`},responseType:'blob'})
}