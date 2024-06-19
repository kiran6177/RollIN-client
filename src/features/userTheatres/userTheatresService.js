import axios from '../../utils/axios'

export const userGetTheatresService = ()=>{
    return axios.get('/theatre/gettheatres')
}