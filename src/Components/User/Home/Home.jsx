import React, {  useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router';

function Home() {
    const {userData,userToken} = useSelector(state=>state.user);
    const navigate = useNavigate()

    useEffect(()=>{
      if(!userToken){
        navigate('/login')
        return
      }
    },[userToken])

  return (
    <div className='pt-32 bg-[#15121B]'>
      <div className='p-12'>
      <h2 className='text-white font-semibold text-4xl'>Welcome {userData && userData.firstname}</h2>
      </div>
    </div>
  )
}

export default Home
