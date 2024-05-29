import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

function Home() {
    const {adminData,adminToken} = useSelector(state=>state.admin);
    const navigate = useNavigate()

    useEffect(()=>{
      if(!adminToken){
        navigate('/admin/login',{replace:true})
        return
      }
    },[adminToken])

  return (
    <div className='pt-28 lg:pl-56 min-h-[100vh] bg-[#15121B]'>
      <div className='p-12'>
      <h2 className='text-white font-semibold text-4xl'>Welcome {adminData && adminData.name}</h2>
      </div>
    </div>
  )
}

export default Home
