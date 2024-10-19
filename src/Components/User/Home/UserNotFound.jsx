import React from 'react'
import gearImage from '../../../assets/gear-vector-removebg-preview.png'
import { Link } from 'react-router-dom'

function UserNotFound({type}) {
  return (
    <div className='pt-[8rem] py-[5rem] bg-[#15121B] min-h-[60vh]'>
      <div className='flex justify-center gap-3 md:gap-6 mb-8'>
        <div className='max-w-[150px] md:max-w-[300px]'>
            <img src={gearImage} alt="" className='object-cover aspect-square' />
        </div>
        <div className='flex flex-col items-center justify-center md:gap-4'>
            <h1 style={{fontFamily:'Teko,sans-serif'}} className='text-[#f6ae2d] text-4xl md:text-[5rem] tracking-widest'>404</h1>
            <h1 style={{fontFamily:'Teko,sans-serif'}} className='text-[#f6ae2d] text-lg md:text-3xl tracking-widest'>Page Not Found!!</h1>
        </div>
      </div>
      <div className='flex justify-center'>
        <Link to={type === "ADMIN" ? "/admin" : type === "THEATRE" ? "/theatre" : "/"} className='border-2 text-white py-2 px-8 rounded-sm border-[#f6ae2d] text-xs md:text-base'>Back to Home</Link>
      </div>
    </div>
  )
}

export default UserNotFound
