import axios from "../../utils/axios";

export const googleUserAuthService = (access_token)=>{
    return axios.post('/auth/user/login/google',{access_token})
}

export const userLogoutService = (access_token)=>{
    return axios.get('/auth/user/logout',{headers:{Authorization:`Bearer ${access_token}`}})
}

export const userEmailLoginService = (email)=>{
    return axios.post('/auth/user/login/email',{email})
}

export const userVerifyOtpService = (id,otp) =>{
    return axios.post('/auth/user/verifyotp/email',{id,otp})
}