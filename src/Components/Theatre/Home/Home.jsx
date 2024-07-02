import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Toaster, toast } from 'sonner';
import { resetTheatreActions  } from '../../../features/theatre/theatreSlice'
import { theatreGetTheatreData } from '../../../features/theatreFeat/theatreFeatAction';

function Home() {

    const  { theatreData,theatreToken , success , message } = useSelector(state=>state.theatre);
    const {theatreScreenData} = useSelector(state=>state.theatreFeat);
    const dispatch = useDispatch();
    useEffect(()=>{
      if(success){
        toast.success("Login successfully.");
        dispatch(resetTheatreActions())
        return
      } 
    },[success])

    useEffect(()=>{
      if(theatreData.id && theatreToken){
        dispatch(theatreGetTheatreData({id:theatreData.id,token:theatreToken}))
        return
      }
    },[theatreData])

  return (
    <div className='pt-32 min-h-[80vh] bg-[#15121B]'>
      <Toaster richColors />
      <div className='p-12'>
        <h1 className='text-white font-semibold text-3xl mb-10'>DASHBOARD</h1> 
      
      </div>
    </div>
  )
}

export default Home
