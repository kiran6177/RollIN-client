import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import { Toaster, toast } from 'sonner';
import { resetTheatreActions  } from '../../../features/theatre/theatreSlice'
import plus from '../../../assets/plus.jpeg'
import aav from '../../../assets/MV5BOWMyNTA2M2UtMmZkNC00ZWE5LThjZGItODcxNGU2MDBhYTk1XkEyXkFqcGdeQXVyOTU0NjY5MzM@._V1_.jpg'

function Home() {

    const  { theatreData,theatreToken , success , message } = useSelector(state=>state.theatre);
    const dispatch = useDispatch();
    useEffect(()=>{
      if(success){
        toast.success("Login successfully.");
        dispatch(resetTheatreActions())
        return
      } 
    },[success])

  return (
    <div className='pt-32 min-h-[80vh] bg-[#15121B]'>
      <Toaster richColors />
      <div className='p-12'>
        <h1 className='text-white font-semibold text-3xl mb-10'>SCREENS</h1> 
      <div className='flex flex-wrap justify-evenly'>
        
        <div className='relative border-2 border-[#f6ae2d] w-full sm:w-[44%] md:w-[31%] xl:w-[31%]  rounded-md bg-black overflow-hidden'>
          <div className='h-[100%] pb-[15%]'>
            <img src={plus} alt="" width={'100%'} className='aspect-square object-cover cursor-pointer' />
          </div>
          <div className='absolute bottom-0 bg-[#f6ae2d] w-[100%] h-[25%] z-10 p-8 md:p-5 lg:p-8'>
            <h4 className='font-semibold tracking-widest cursor-pointer'>ADD SCREEN</h4>
          </div>
        </div>

        
        <div className='relative border-2 border-[#f6ae2d] w-full sm:w-[44%] md:w-[31%] xl:w-[31%]  rounded-md bg-black overflow-hidden'>
          <div className='h-[100%] pb-[15%]'>
            <img src={aav} alt="" width={'100%'} className='aspect-square object-cover' />
          </div>
          <div className='absolute bottom-0 bg-[#f6ae2d] w-[100%] h-[25%] z-10 p-5 md:py-2 md:px-4 lg:p-5'>
            <h4 className='font-bold text-base md:text-lg lg:text-xl tracking-widest'>SCREEN 1</h4>
            <h6 className='font-medium tracking-wide'>Aavesham</h6>
          </div>
        </div>
        

      </div>
      </div>
    </div>
  )
}

export default Home
