import axios from "../../utils/axios";

export const userGetBannerMoviesService = (data)=>{
    return axios.post(`/movie/getbanners`,data)
}

export const userGetMoviesByGenreService = (data)=>{
    return axios.post('/movie/getmoviesbygenre',data)
}

export const userGetAllMoviesService = (filters)=>{
    return axios.post('/movie/getallmovieswithfilters',{filters})
}

export const userGetRecommendedMoviesWithLocationService = (data)=>{
    return axios.post(`/movie/getrecommendedmovies`,data)
}