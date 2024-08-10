import React from 'react'


function CastIcon({person,type}) {
  return (
    <div className='w-[9rem] flex flex-col items-center gap-2 '>
        <div className='h-[8rem] rounded-full overflow-hidden w-[8rem] border-2 border-[#15121B] shadow-[0px_0px_35px_rgba(255,255,255,0.25)] '>
          <img src={person?.profile_path} alt="" className='w-[100%] object-cover mx-auto'/>
        </div>
        {type !== 'no' && <div className='flex flex-col gap-1 items-center justify-start w-[100%] overflow-hidden'>
          <h3 className='text-sm tracking-wide text-center '>{person?.name}</h3>
          {
            type === "crew"?
          <p className='text-xs  text-ellipsis overflow-hidden text-center h-[2rem]'>{person?.department ? person?.department : ''}</p>
            :
          <p className='text-xs  text-ellipsis overflow-hidden text-center h-[2rem]'>{person?.character ? "as "+person?.character : ''}</p>
          }
        </div>}
    </div>
  )
}

export default CastIcon
