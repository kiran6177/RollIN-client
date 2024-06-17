import React from 'react'
import { useNavigate } from 'react-router'

function PersonCard({person,type}) {
    const navigate = useNavigate()
    return (
        <div onClick={()=>navigate(`/admin/persondetail?id=${person?.person_id}`)} className='w-[14rem] flex flex-col items-center gap-2 cursor-pointer '>
            <div className='h-[13rem] rounded-full hover:scale-[1.05] transition-all duration-200 ease-in-out overflow-hidden w-[13rem] border-2 border-[#15121B] shadow-[0px_0px_35px_rgba(255,255,255,0.25)] '>
              <img src={person?.profile_path} alt="" className='w-[100%] object-cover mx-auto'/>
            </div>
            <div className='flex flex-col gap-1 items-center justify-start w-[100%] text-white overflow-hidden'>
              <h3 className='text-sm tracking-wide text-center '>{person?.name}</h3>
              {
                type === "crew"?
              <p className='text-xs  text-ellipsis overflow-hidden text-center h-[2rem]'>{person?.department ? person?.department : ''}</p>
                :
              <p className='text-xs  text-ellipsis overflow-hidden text-center h-[2rem]'>{person?.character ? "as "+person?.character : ''}</p>
              }
            </div>
        </div>
      )
}

export default PersonCard
