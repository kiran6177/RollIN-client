import React from 'react'

function ProfileNavbar({selected,setSelected}) {
  return (
    <div className='flex fixed  bg-[#d79a28] w-screen overflow-x-scroll scrollbar-none z-10'>
        <h2 onClick={()=>setSelected('PROFILE')} className={selected === 'PROFILE' ? 'bg-[#f6ae2d] text-black px-6 py-2 sm:py-3 text-lg tracking-wider font-medium cursor-pointer' : 'text-black px-6 py-2 sm:py-3 text-lg tracking-wider font-medium cursor-pointer'}>Profile</h2>
        <h2 onClick={()=>setSelected('ORDERS')} className={selected === 'ORDERS' ? 'bg-[#f6ae2d] text-black px-6 py-2 sm:py-3 text-lg tracking-wider font-medium cursor-pointer' : 'text-black px-6 py-2 sm:py-3 text-lg tracking-wider font-medium cursor-pointer'}>Orders</h2>
        <h2 onClick={()=>setSelected('NOTIFICATIONS')} className={selected === 'NOTIFICATIONS' ? 'bg-[#f6ae2d] text-black px-6 py-2 sm:py-3 text-lg tracking-wider font-medium cursor-pointer' : 'text-black px-6 py-2 sm:py-3 text-lg tracking-wider font-medium cursor-pointer'}>Notifications</h2>
    </div>  
  )
}

export default ProfileNavbar
