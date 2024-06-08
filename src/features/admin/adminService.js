import axios from '../../utils/axios';

export const loginAdminService = (data)=>{
    return axios.post('/auth/admin/login',data)
}

export const logoutAdminService = (token)=>{
    return axios.get('/auth/admin/logout',{headers:{Authorization:`Bearer ${token}`}})
}

export const adminGetUsersService = (token) =>{
    return axios.get('/auth/admin/getusers',{headers:{Authorization:`Bearer ${token}`}})
}

export const blockUnblockUsersService = (userid,token) =>{
    return axios.post('/auth/admin/blockunblockuser',{userid},{headers:{Authorization:`Bearer ${token}`}})

}

export const adminGetTheatresService = (token) =>{
    return axios.get('/auth/admin/gettheatres',{headers:{Authorization:`Bearer ${token}`}})
}

export const blockUnblockTheatresService = (theatreid,token) =>{
    return axios.post('/auth/admin/blockunblocktheatre',{theatreid},{headers:{Authorization:`Bearer ${token}`}})

}

export const approveTheatreService = (theatreid,token) =>{
    return axios.post('/auth/admin/approvetheatre',{theatreid},{headers:{Authorization:`Bearer ${token}`}})

}