import React, { useEffect, useRef, useState } from 'react'
import { Toaster } from 'sonner'
import Showbox from './Showbox'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { theatreGetBookingsByScreen } from '../../../features/theatreBookings/theatreBookingActions'
import { resetScreenShows } from '../../../features/theatreBookings/theatreBookingSlice'
import { ScaleLoader } from 'react-spinners'
import InfiniteScroll from 'react-infinite-scroll-component'

function BookingsScreenShows() {
    const [searchParams] = useSearchParams()
    const screen_id = searchParams.get("id")
    const dispatch = useDispatch();
    const {theatreToken} = useSelector(state=>state.theatre)
    const {screenshows} = useSelector(state=>state.theatreBooking)
    const [page,setPage] = useState(1)

    const scrollRef = useRef(null);

    useEffect(()=>{
        console.log("SCREEN",screen_id);
        const data = {page:1,screen_id}
        dispatch(resetScreenShows())
        dispatch(theatreGetBookingsByScreen({data,token:theatreToken}))
    },[])

    const nextPage = ()=>{
        const data = {page:page+1,screen_id}
        dispatch(theatreGetBookingsByScreen({data,token:theatreToken}))
        setPage(prev=>prev+1)
    }
    window.history.scrollRestoration = "manual"

  return (
<div className='py-10 bg-[#15121B] '>
        <Toaster richColors />
        <div className='pt-28 px-12  min-h-[10rem]'>
            <h2 className='text-white text-2xl md:text-3xl font-semibold tracking-widest'>SELECT SHOWS</h2>
            <div ref={scrollRef} className=''>
                {
                    screenshows &&  screenshows.length > 0 ?
                    <InfiniteScroll dataLength={screenshows?.length} scrollThreshold={'750px'} scrollableTarget={scrollRef} next={nextPage} loader={<ScaleLoader className='absolute -bottom-[6rem] ' color='#f6ae2d'/>} hasMore={true} className=' py-4 px-2 mx-auto  relative  flex flex-wrap gap-12 justify-between my-6 scrollbar-none'>
                    {
                    screenshows.map((shows)=>{
                    return (
                          <Showbox key={shows?._id} show={shows} />
                    )
                    })
                    }
                    </InfiniteScroll>
                    : <div className='text-white tracking-widest'> NO SHOWS.</div>
                }

            </div>
        </div>
    </div>
  )
}

export default BookingsScreenShows
