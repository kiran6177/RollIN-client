import React, { useEffect } from 'react'
import opp from '../../../assets/MM-1207 Oppenheimer.jpg'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

function Showbox({show}) {
    const navigate = useNavigate()
    

  return (
    <div className='border-2 border-[#f6ae2d]  lg:w-[45%] bg-black rounded-sm flex flex-col-reverse sm:flex-row justify-between'>
        <div className='flex flex-col sm:w-[40%] justify-evenly gap-2 p-6'>
            <h2 className='text-[#f6ae2d] text-2xl font-semibold tracking-widest '>{show?.showtime}</h2>
            <h2 className='text-white text-lg'>{new Date(show?.reserved_date).toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'})}</h2>
            <h2 className='text-[#a4a3a3] text-md tracking-wider'>{show?.movie_data?.title}</h2> 
            <button onClick={()=>navigate(`/theatre/bookings/reservations?show_id=${show?.show_id}&date=${show?.reserved_date}`)} className='bg-[#f6ae2d] border-2 border-[#f6ae2d] rounded-sm px-3 py-1 text-sm tracking-widest font-medium hover:scale-[1.03] transition-all duration-150 ease-linear'>View Bookings</button>
        </div>
        <div className='relative sm:max-w-[40%] h-full overflow-hidden'>
        <div className='absolute bg-gradient-to-t sm:bg-gradient-to-r from-black to-transparent w-[100%] h-[100%] top-0 left-0'></div>
            <img src={show?.movie_data?.backdrop_path} alt=""  className='h-[100%] object-cover' />
        </div>
    </div>
  )
}

export default Showbox
