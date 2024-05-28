import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router';

function UserProtected({children}) {
    const {userToken} = useSelector(state=>state.user);
    const navigate = useNavigate();

    useEffect(()=>{
        if(!userToken){
            navigate('/login');
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
