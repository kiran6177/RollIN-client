import axios from '../../utils/axios'

export const userGetTheatresService = ()=>{
    return axios.get('/theatre/gettheatres')
}

export const userGetSingleTheatreService = (id)=>{
    return axios.post('/theatre/getsingletheatre',{id})
}