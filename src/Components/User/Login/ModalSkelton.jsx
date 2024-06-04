import React from 'react'
import { ScaleLoader } from 'react-spinners'

function ModalSkelton() {
  return (
        <div className='w-[100%] h-[100vh] fixed top-0 pt-26 flex items-center justify-center bg-[#00000091]'>
            <div className='bg-black text-white w-[35%] border-2 border-[#f6ae2d] rounded-md p-8 flex flex-col items-center justify-center   fixed min-h-[75vh] '>
            <ScaleLoader  height={20} color='#f6ae2d' />
            </div>  
        </div>
  )
}

export default ModalSkelton
