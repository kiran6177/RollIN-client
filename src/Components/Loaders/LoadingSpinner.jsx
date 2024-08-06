import React from 'react'
import { DotLoader } from 'react-spinners'

function LoadingSpinner() {
  return (
    <div className='fixed w-[100vw] h-[100vh] bg-[#000000ee] top-0 left-0 z-40 flex justify-center items-center'>
      <div className='flex flex-col gap-4 items-center'>
      <DotLoader color='#f6ae2d' />
      <p style={{fontFamily:'Teko'}} className='text-white text-3xl tracking-widest'>LOADING</p>
      </div>
    </div>
  )
}

export default LoadingSpinner
