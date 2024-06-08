import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

function AdminProtected({children}) {
    const {adminToken} = useSelector(state=>state.admin);
    const navigate = useNavigate();

    useEffect(()=>{
        if(!adminToken){
            navigate('/admin/login',{replace:true});
            return
        }
    },[adminToken])

    if(adminToken){
        return children
    }else{
        return null
    }
}

export default AdminProtected
