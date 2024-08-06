import React from 'react'

function MovieCard2Skelton() {
  return (
    <div className='w-[16rem] hover:scale-[1.02] transition-all duration-200 ease-in-out'>
        <div  className='h-[19.8rem] cursor-pointer w-[16rem]   rounded-md overflow-hidden relative bg-[#1f1b23]'>
            <div className='absolute bottom-0 z-10 flex justify-between w-[100%] px-4 h-[1.5rem] items-center bg-[#171717]'></div>
            
        </div>
            <div className='flex flex-col mt-1 gap-1'>
                <span className='text-[#1f1b23]  bg-[#1f1b23] max-w-fit'> =======================</span>
                <span className='text-[#1f1b23]  bg-[#1f1b23] max-w-fit'>==============</span>
            </div>
    </div>
  )
}

export default MovieCard2Skelton
