import React from 'react'

function ScreenBoxSkelton() {
  return (
    <div  className=' rounded-md p-6 w-[90%] sm:w-[45%] md:w-[30%] bg-[#282828] flex flex-col gap-6'>
        <h3  className='text-[#161515] rounded-md max-w-fit bg-[#161515] font-medium'>======================</h3> 
        <h6 className='text-[#161515] rounded-md max-w-fit bg-[#161515] text-xs'>==============</h6>
        <button  className='self-end text-[#161515] rounded-md max-w-fit bg-[#161515] text-xs'>=============</button>
    </div>
  )
}

export default ScreenBoxSkelton
