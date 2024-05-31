import axios from '../../utils/axios.js';

export const signupTheatreService = (data)=>{
    return axios.post('/auth/theatre/signup',data)
}

export const logoutTheatreService = (token)=>{
    return axios.get('/auth/theatre/logout',{headers:{Authorization:`Bearer ${token}`}})
}

export const loginTheatreService = (data)=>{
    return axios.post('/auth/theatre/login',data)
}

export const completeTheatreService = (data,token)=>{
    return axios.post('/auth/theatre/completeprofile',data,{headers:{Authorization:`Bearer ${token}`}})
}