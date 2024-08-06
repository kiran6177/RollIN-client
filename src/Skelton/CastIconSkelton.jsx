import React from 'react'

function CastIconSkelton() {
  return (
    <div className='w-[9rem] flex flex-col items-center gap-2 '>
        <div className='h-[8rem] rounded-full overflow-hidden w-[8rem] border-2 border-[#15121B] bg-[#282727]  cursor-pointer hover:scale-[1.02] transition-all duration-150 ease-linear'>
        </div>
        <div className='flex flex-col gap-1 items-center justify-start w-[100%] overflow-hidden'>
          <h3 className='text-sm tracking-wide text-center bg-[#282727] text-[#282727] rounded-md'>=============</h3>
          <p className='text-xs  text-ellipsis overflow-hidden text-center bg-[#282727] text-[#282727] rounded-md'>===========</p>
        </div>
    </div>
  )
}

export default CastIconSkelton
