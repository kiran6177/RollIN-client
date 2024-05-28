import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser, userLogout } from '../../../features/user/userSlice';
import { useNavigate } from 'react-router';

function Profile() {

    const dispatch = useDispatch();
    const {userToken} = useSelector(state=>state.user)
    const navigate = useNavigate()
    useEffect(()=>{
        if(!userToken){
            navigate('/login')
            return
        }
    },[userToken])

    const handleLogout = ()=>{
        dispatch(logoutUser())
        dispatch(userLogout(userToken))
    }

  return (
    <div className='pt-32 bg-[#15121B]'>
      <div className='p-12'>
      <h2 className='text-white font-semibold text-4xl'>User Profile</h2>
      <button onClick={handleLogout} className='border-2 border-[#f6ae2d] bg-[#F6AE2D] px-12 py-2 rounded-sm font-semibold tracking-widest my-5 hover:bg-[black] hover:text-white transition-all duration-150 ease-in-out'>LOGOUT</button>
      </div>
    </div>
  )
}

export default Profile
