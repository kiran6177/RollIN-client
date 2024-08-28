import React, { lazy, Suspense, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import ProfileNavbar from './ProfileNavbar';
import LoadingSpinner from '../../Loaders/LoadingSpinner';
const ProfileData  = lazy(()=>import('./ProfileData'));
const Orders = lazy(()=>import('./Orders'));
const Notifications = lazy(()=>import('./Notifications'))

function Profile() {
    const [selected,setSelected] = useState('PROFILE')
    const {userToken} = useSelector(state=>state.user)

    const navigate = useNavigate()
    useEffect(()=>{
        if(!userToken){
            navigate('/login')
            return
        }
    },[userToken])



  return (
    <div className='pt-24 sm:pt-24 bg-[#15121B]'>
      <ProfileNavbar selected={selected} setSelected={setSelected} />
      <div className='p-8 md:p-12'>
        {selected === 'PROFILE' && <Suspense fallback={<LoadingSpinner/>}><ProfileData/></Suspense>}
        {selected === 'ORDERS' && <Suspense fallback={<LoadingSpinner/>}><Orders/></Suspense>}
        {selected === 'NOTIFICATIONS' && <Suspense fallback={<LoadingSpinner/>}><Notifications/></Suspense>}
      </div>
    </div>
  )
}

export default Profile
