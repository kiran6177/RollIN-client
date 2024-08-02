import axios from '../../utils/axios.js';

export const signupTheatreService = (data)=>{
    return axios.post('/auth/theatre/signup',data)
}

export const logoutTheatreService = (token)=>{
    return axios.get('/auth/theatre/logout',{headers:{Authorization:`Bearer ${token}`}})
}

export const loginTheatreService = (data)=>{
    return axios.post('/auth/theatre/login/email',data)
}

export const completeTheatreService = (data,token)=>{
    return axios.post('/auth/theatre/completeprofile',data,{headers:{Authorization:`Bearer ${token}`,"Content-Type":"multipart/form-data"}})
}

export const theatreGoogleAuthService = (accessToken)=>{
    return axios.post('/auth/theatre/login/google',accessToken)
}

export const theatreLoginOtpVerifyService = (id,otp)=>{
    return axios.post('/auth/theatre/verifyotp/login',{id,otp})
}

export const theatreRegisterOtpVerifyService = (id,otp)=>{
    return axios.post('/auth/theatre/verifyotp/register',{id,otp})
}

export const theatreResendOtpService = (id)=>{
    return axios.post('/auth/theatre/resendotp',id)
}

export const theatreProfileUpdateService = (data,token)=>{
    return axios.put('/auth/theatre/updateprofile',data,{headers:{Authorization:`Bearer ${token}`,"Content-Type":"multipart/form-data"}})
}

export const theatreGetNotificationsService = (data,token)=>{
    return axios.post('/auth/theatre/getnotifications',data,{headers:{Authorization:`Bearer ${token}`}})
}