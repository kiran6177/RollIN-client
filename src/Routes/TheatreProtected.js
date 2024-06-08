import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

function TheatreProtected({children}) {
    const {theatreToken,theatreData} = useSelector(state=>state.theatre);
    const navigate = useNavigate();

    useEffect(()=>{
        if(!theatreData?.isVerified || theatreData?.isBlocked){
            navigate('/theatre/login',{replace:true})
            return
        }
        if(theatreToken && theatreData.isVerified && !theatreData.isCompleted){
            navigate('/theatre/completeprofile',{state:{message:'Please complete your profile.'}})
            return
        }
        if(!theatreToken){
            navigate('/theatre/login',{replace:true})
            return
        }
        
    },[theatreToken,theatreData])

    if(theatreToken && theatreData.isVerified){
        return children
    }else{
        return null
    }
}

export default TheatreProtected
