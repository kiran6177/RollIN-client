import axios from '../../utils/axios';

export const adminGetAllTMDBMoviesService = (filters,token)=>{
    return axios.post('/movie/getalltmdbmovies',{filters},{headers:{Authorization:`Bearer ${token}`}})
}

export const adminGetTMDBMovieDetailService =(movieid,token)=>{
    return axios.post('/movie/gettmdbmoviedetail',{movieid},{headers:{Authorization:`Bearer ${token}`}})
}

export const adminAddMovieToDBService = (movieid,release_date,token)=>{
    return axios.post('/movie/addmovietodb',{movieid,release_date},{headers:{Authorization:`Bearer ${token}`}})
}

export const adminGetMoviesFromDBService = (page,token)=>{
    return axios.post('/movie/getallmovies',{page},{headers:{Authorization:`Bearer ${token}`}})
}

export const adminGetPersonsFromDBService = (page,token)=>{
    return axios.post('/movie/getallpersons',{page},{headers:{Authorization:`Bearer ${token}`}})
}

export const adminDisableMovieService = (data,token)=>{
    return axios.post('/movie/disablemovie',data,{headers:{Authorization:`Bearer ${token}`}})
}

export const adminEnableMovieService = (data,token)=>{
    return axios.post('/movie/enablemovie',data,{headers:{Authorization:`Bearer ${token}`}})
}