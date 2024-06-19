import React, { useEffect } from 'react'
import img from '../../../assets/aavesham.jpg'
import { useSearchParams } from 'react-router-dom'

function ScreenMovieSection() {
    const [searchParams] = useSearchParams()

    useEffect(()=>{
        console.log(searchParams.get("id"));
    },[])

  return (
    <div className='py-10 bg-[#15121B] '>
        <div className='pt-28 px-12  min-h-[10rem] '>
            <div className='border-2 border-[#f6ae2d] rounded-sm bg-black '>
                <div className='border-b-2 border-[#f6ae2d] py-6 px-10 flex flex-col gap-4'>
                    <h5 className='text-[#f6ae2d] text-3xl sm:text-4xl font-semibold tracking-widest'>THEATRE</h5>
                    <h6 className='text-white text-md sm:text-base'>LOCATION</h6>
                    <div className='flex flex-wrap gap-6'>
                        <div className='w-[10rem]'>
                            <img src={img} alt="" className='aspect-square object-cover' width={'100%'} />
                        </div>
                        <div className='w-[10rem]'>
                            <img src={img} alt="" className='aspect-square object-cover' width={'100%'} />
                        </div>
                    </div>
                    
                </div>
                <div className='bg-[#cc9329] px-4 py-2 flex gap-5 text-xs md:text-sm tracking-widest overflow-x-scroll'>
                    <button className='flex flex-col items-center border-2 border-black rounded-md bg-[#f6ae2d] shadow-[0px_0px_40px_rgb(0,0,0,0.6)] p-3 '><span className='font-medium'>WED</span><span className='font-medium'>24</span><span className='font-medium'>SAT</span></button>
                    <button className='flex flex-col items-center border-2 border-[#f6ae2d] rounded-md bg-black text-[#f6ae2d] shadow-[0px_0px_40px_rgb(0,0,0,0.2)] p-3 '><span className='font-medium'>WED</span><span className='font-medium'>24</span><span className='font-medium'>SAT</span></button>
                    <button className='flex flex-col items-center border-2 border-[#f6ae2d] rounded-md bg-black text-[#f6ae2d] shadow-[0px_0px_40px_rgb(0,0,0,0.2)] p-3 '><span className='font-medium'>WED</span><span className='font-medium'>24</span><span className='font-medium'>SAT</span></button>
                    <button className='flex flex-col items-center border-2 border-[#f6ae2d] rounded-md bg-black text-[#f6ae2d] shadow-[0px_0px_40px_rgb(0,0,0,0.2)] p-3 '><span className='font-medium'>WED</span><span className='font-medium'>24</span><span className='font-medium'>SAT</span></button>
                    <button className='flex flex-col items-center border-2 border-[#f6ae2d] rounded-md bg-black text-[#f6ae2d] shadow-[0px_0px_40px_rgb(0,0,0,0.2)] p-3 '><span className='font-medium'>WED</span><span className='font-medium'>24</span><span className='font-medium'>SAT</span></button>
                </div>
                <div className='text-white p-4'>
                    MOVIES LIST
                </div>
            </div>
        </div>
    </div>
  )
}

export default ScreenMovieSection
