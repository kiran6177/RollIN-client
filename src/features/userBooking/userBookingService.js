import axios from '../../utils/axios'

export const userGetShowDataService = (data)=>{
    return axios.post('/booking/getshowdata',data)
}

export const userGetSingleShowDataService = (data,token)=>{
    return axios.post('/booking/getsingleshowdata',data,{headers:{Authorization:`Bearer ${token}`}})
}