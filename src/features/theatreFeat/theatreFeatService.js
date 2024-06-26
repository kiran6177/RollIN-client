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

export const theatreRemoveMovieFromScreenService = (data,token)=>{
    return axios.post('/theatre/removemoviefromscreen',data,{headers:{Authorization:`Bearer ${token}`}})
}

export const theatreExtendMovieForScreenService = (data,token)=>{
    return axios.post('/theatre/extendmovieforscreen',data,{headers:{Authorization:`Bearer ${token}`}})
}