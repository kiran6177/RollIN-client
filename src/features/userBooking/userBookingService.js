import axios from '../../utils/axios'

export const userGetShowDataService = (data)=>{
    return axios.post('/booking/getshowdata',data)
}

export const userGetSingleShowDataService = (data,token)=>{
    return axios.post('/booking/getsingleshowdata',data,{headers:{Authorization:`Bearer ${token}`}})
}

export const userGetShowDataByMovieService = (data)=>{
    return axios.post('/booking/getshowdatabymovie',data)
}

export const userSeatReservationService = (data,token)=>{
    return axios.post('/booking/reserveseat',data,{headers:{Authorization:`Bearer ${token}`}})
}

export const userPayNowService = (data,token)=>{
    return axios.post('/booking/initiatepayment',data,{headers:{Authorization:`Bearer ${token}`}})
}

export const userPayProcessService = (data,token)=>{
    return axios.post('/booking/paymentprocess',data,{headers:{Authorization:`Bearer ${token}`}})
}

export const userGetOrdersService = (data,token)=>{
    return axios.post('/booking/getorders',data,{headers:{Authorization:`Bearer ${token}`}})
}

export const userGetUpcomingMoviesService = (data,token)=>{
    return axios.post('/booking/getupcomingmovies',data,{headers:{Authorization:`Bearer ${token}`}})
}

export const userGetRecommendedMoviesService = (data,token)=>{
    return axios.post('/booking/getrecommendedmovies',data,{headers:{Authorization:`Bearer ${token}`}})
}


export const userCancelTicketService = (data,token)=>{
    return axios.post('/booking/cancelticket',data,{headers:{Authorization:`Bearer ${token}`}})
}