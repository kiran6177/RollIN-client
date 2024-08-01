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

export const userResendOtpService = (id)=>{
    return axios.post('/auth/user/resendotp',{id})
}

export const userEditProfileService = (data,access_token)=>{
    return axios.post('/auth/user/editprofile',data,{headers:{Authorization:`Bearer ${access_token}`}})
}

export const userEditEmailService = (data,access_token)=>{
    return axios.post('/auth/user/editemail',data,{headers:{Authorization:`Bearer ${access_token}`}})
}

export const userEditResendService = (data,access_token)=>{
    return axios.post('/auth/user/resendprofileotp',data,{headers:{Authorization:`Bearer ${access_token}`}})
}

export const userProfileVerifyOtpService = (data,access_token)=>{
    return axios.post('/auth/user/verifyotpprofile',data,{headers:{Authorization:`Bearer ${access_token}`}})
}

export const userGetNotificationsService = (data,access_token)=>{
    return axios.post('/auth/user/getnotifications',data,{headers:{Authorization:`Bearer ${access_token}`}})
}
