import axios from '../../utils/axios';

export const loginAdminService = (data)=>{
    return axios.post('/auth/admin/login',data)
}

export const logoutAdminService = (token)=>{
    return axios.get('/auth/admin/logout',{headers:{Authorization:`Bearer ${token}`}})
}