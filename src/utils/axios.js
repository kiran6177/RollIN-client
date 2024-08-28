import axios from 'axios';

const instance =  axios.create({
        baseURL:'http://rollin.online/api',
        withCredentials:true
    })

    

export default instance