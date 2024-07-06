import axios from '../../utils/axios'

export const userGetTheatresService = (data)=>{
    return axios.post('/theatre/gettheatres',data)
}

export const userGetSingleTheatreService = (data)=>{
    return axios.post('/theatre/getsingletheatre',data)
}