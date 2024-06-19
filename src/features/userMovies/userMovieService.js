import axios from "../../utils/axios";

export const userGetBannerMoviesService = ()=>{
    return axios.get('/movie/getbanners')
}

export const userGetMoviesByGenreService = ()=>{
    return axios.get('/movie/getmoviesbygenre')
}

export const userGetAllMoviesService = (filters)=>{
    return axios.post('/movie/getallmovieswithfilters',{filters})
}