import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import { Toaster, toast } from 'sonner';
import { resetTheatreActions  } from '../../../features/theatre/theatreSlice'

function Home() {

    const  { theatreToken , success , message } = useSelector(state=>state.theatre);
    const dispatch = useDispatch();
    useEffect(()=>{
      if(success){
        toast.success("Login successfully.");
        dispatch(resetTheatreActions())
        return
      }
    },[success])

  return (
    <div>
      <Toaster richColors />
    </div>
  )
}

export default Home
