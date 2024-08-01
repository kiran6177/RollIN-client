import React, { lazy, Suspense, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import ProfileNavbar from './ProfileNavbar';
const ProfileData  = lazy(()=>import('./ProfileData'));
const Orders = lazy(()=>import('./Orders'));
const Notifications = lazy(()=>import('./Notifications'))

function Profile() {
    const [selected,setSelected] = useState('PROFILE')
    const dispatch = useDispatch();
    const {userToken} = useSelector(state=>state.user)

    const navigate = useNavigate()
    useEffect(()=>{
        if(!userToken){
            navigate('/login')
            return
        }
    },[userToken])



  return (
    <div className='pt-36 sm:pt-24 bg-[#15121B]'>
      <ProfileNavbar selected={selected} setSelected={setSelected} />
      <div className='p-12'>
        {selected === 'PROFILE' && <Suspense><ProfileData/></Suspense>}
        {selected === 'ORDERS' && <Suspense><Orders/></Suspense>}
        {selected === 'NOTIFICATIONS' && <Suspense><Notifications/></Suspense>}
      </div>
    </div>
  )
}

export default Profile
