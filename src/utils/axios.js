import axios from 'axios';

const instance =  axios.create({
        baseURL:'https://womensnest.online/api',
        withCredentials:true
    })

    

export default instance