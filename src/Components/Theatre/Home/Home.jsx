import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import { Toaster, toast } from 'sonner';
import { resetTheatreActions  } from '../../../features/theatre/theatreSlice'

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
      <h2 className='text-white font-semibold text-4xl'>Welcome {theatreData && theatreData.name}</h2>
      </div>
    </div>
  )
}

export default Home
