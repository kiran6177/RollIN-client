import React from 'react'
import { ScaleLoader } from 'react-spinners'

function ModalLoader({loading}) {
  return (
    <>
    <div className='absolute bg-[#00000055] w-[100%] h-[100%]'></div>
    <div className='absolute w-[100%] flex justify-center '>
        <ScaleLoader loading={loading}  color='#f6ae2d' height={20} />
    </div>
    </>
  )
}

export default ModalLoader
