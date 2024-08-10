import axios from '../../utils/axios'

export const theatreGetTheatreDataService = (id,token)=>{
    return axios.post('/theatre/gettheatredata',{id},{headers:{Authorization:`Bearer ${token}`}})
}

export const theatreAddScreenService = (data,token)=>{
    return axios.post('/theatre/addscreen',data,{headers:{Authorization:`Bearer ${token}`}})
}

export const theatreGetAllMoviesService = (filters,token)=>{
    return axios.post('/movie/getmoviesfortheatre',{filters},{headers:{Authorization:`Bearer ${token}`}})
}

export const theatreEnrollMovieService = (data,token)=>{
    return axios.post('/theatre/enrollmovie',data,{headers:{Authorization:`Bearer ${token}`}})
}

export const theatreEditScreenService = (data,token)=>{
    return axios.post('/theatre/editscreen',data,{headers:{Authorization:`Bearer ${token}`}})
}

export const theatreChangeShowMovieService = (data,token)=>{
    return axios.post('/theatre/changeshowmovie',data,{headers:{Authorization:`Bearer ${token}`}})
}

export const theatreRemoveMovieFromScreenService = (data,token)=>{
    return axios.post('/theatre/removemoviefromscreen',data,{headers:{Authorization:`Bearer ${token}`}})
}

export const theatreExtendMovieForScreenService = (data,token)=>{
    return axios.post('/theatre/extendmovieforscreen',data,{headers:{Authorization:`Bearer ${token}`}})
}

export const theatreEditTierService = (data,token)=>{
    return axios.post('/theatre/edittier',data,{headers:{Authorization:`Bearer ${token}`}})
}

export const theatreChangeTierOrderService = (data,token)=>{
    return axios.post('/theatre/changetierorder',data,{headers:{Authorization:`Bearer ${token}`}})
}

export const theatreGetRunningMoviesService = (token)=>{
    return axios.get('/theatre/getrunningmovies',{headers:{Authorization:`Bearer ${token}`}})
}