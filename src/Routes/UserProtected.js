import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router';

function UserProtected({children}) {
    const {userToken} = useSelector(state=>state.user);
    const navigate = useNavigate();
    const location = useLocation()

    useEffect(()=>{
        if(!userToken){
            navigate('/login',{replace:true,state:location.state});
            return
        }
    },[userToken])

    if(userToken){
        return children
    }else{
        return null
    }
}

export default UserProtected
