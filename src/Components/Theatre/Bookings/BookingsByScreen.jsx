import React, { useEffect } from 'react'
import { Toaster } from 'sonner'
import ScreenBox2 from './ScreenBox2'
import { useDispatch, useSelector } from 'react-redux'
import { theatreGetTheatreData } from '../../../features/theatreFeat/theatreFeatAction'
import { useNavigate } from 'react-router'

function BookingsByScreen() {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {theatreToken,theatreData} = useSelector(state=>state.theatre)
    const {theatreScreenData} = useSelector(state=>state.theatreFeat);

    useEffect(()=>{
        if(!theatreScreenData || theatreScreenData?.length === 0){
            if(theatreData.id && theatreToken){
                dispatch(theatreGetTheatreData({id:theatreData.id,token:theatreToken}))
                return
            }
        }
    },[theatreScreenData])
  return (
<div className='py-10 bg-[#15121B] '>
        <Toaster richColors />
        <div className='pt-28 px-12  min-h-[10rem]'>
            <div className='flex justify-between'>
            <h2 className='text-white text-3xl font-semibold tracking-widest'>SELECT SCREEN</h2>
            <button onClick={()=>navigate('/theatre/bookings/list')} className='text-black bg-[#f6ae2d] border-2 border-[#f6ae2d] rounded-sm text-lg px-8 py-2 font-medium tracking-widest'>BOOKINGS</button>
            </div>
            <div className='flex flex-wrap justify-evenly gap-8 my-8'>
                {theatreScreenData?.length > 0 && theatreScreenData.map(screen=>{
                    return(
                        <ScreenBox2 key={screen?._id} screen={screen} />
                    )
                    })} 
            </div>
        </div>
    </div>
  )
}

export default BookingsByScreen
