import React from 'react'
import { useNavigate } from 'react-router';

function ScreenBox({theatre,setTheatreTo,setIsOpen}) {
    const navigate = useNavigate()

  return (
    <div   className=' border-2 border-[#f6ae2d] cursor-pointer rounded-md p-6 w-[90%] sm:w-[45%] md:w-[30%] bg-black flex flex-col gap-6'>
        <h3 onClick={()=>navigate(`/screenwithmovies?theatre_id=${theatre._id}`)} className='text-[#f6ae2d] font-medium'>{theatre?.name}</h3> 
        <h6 className='text-white text-xs'>{theatre?.address?.completeLocation}</h6>
        <button onClick={()=>{setIsOpen(true);setTheatreTo(theatre)}} className='text-right text-[#f6ae2d] text-xs'>View in map</button>
    </div>
  )
}

export default ScreenBox
