import axios from '../../utils/axios'

export const userGetTheatresService = (data)=>{
    return axios.post('/theatre/gettheatres',data)
}

export const userGetSingleTheatreService = (id)=>{
    return axios.post('/theatre/getsingletheatre',{id})
}