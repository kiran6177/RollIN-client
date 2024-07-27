import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom';
import { toast, Toaster } from 'sonner';
import { motion } from 'framer-motion';
import { IoIosClose } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { ScaleLoader } from 'react-spinners';
import { useSearchParams } from 'react-router-dom';
import { theatreChangeShowMovie } from '../../../features/theatreFeat/theatreFeatAction';
import { theatreCancelShowBookings, theatreGetShowBookingStatus } from '../../../features/theatreBookings/theatreBookingActions';
import { resetReservationStatus, resetTheatreBookingActions } from '../../../features/theatreBookings/theatreBookingSlice';

const confirmVarinat = {
    hidden:{
      scale:0
    },
    visible:{
      scale:1,
      transition:{
        type:"spring",
        bounce:0.5
      }
    }
  }

function ChangeShowModal({isOpen,set,enrolledMovies}) {

    const {loading} = useSelector(state=>state.theatreFeat)
    const {reservationStatus,message} = useSelector(state=>state.theatreBooking)
    const {theatreToken} = useSelector(state=>state.theatre)
    const [movieSelect,setMovieSelect] = useState(false)
    const [show,setShow] = useState(null);
    const [searchParams] = useSearchParams();
    const screen_id = searchParams.get('id')
    const dispatch = useDispatch()
    const [hasBookings,setHasBookings] = useState(false);
    const [hasData,setHasData] = useState(false);
    const [hasFilledBookings,setHasFilledBookings] = useState(false);


    useEffect(()=>{
        if(isOpen){
            const data = {screen_id,showdata:isOpen} 
            dispatch(theatreGetShowBookingStatus({data,token:theatreToken}))
        }
        return ()=>{
            dispatch(resetReservationStatus())
        }
    },[isOpen])

    useEffect(()=>{  
        console.log(reservationStatus);
        if(reservationStatus !== null && (reservationStatus?.hasData === false && reservationStatus?.hasBookings === false && reservationStatus?.hasFilledBookings === false)){
            setShow(isOpen)
        }else if(reservationStatus !== null && reservationStatus?.hasFilledBookings === true){ 
            setHasFilledBookings(true)
        }else if(reservationStatus !== null && reservationStatus?.hasBookings === true){ 
            setHasBookings(true)
        }else if(reservationStatus !== null && reservationStatus?.hasData === true){ 
            setHasData(true)
        }
        return ()=>{
            setHasFilledBookings(false)
            setHasBookings(false)
            setHasData(false) 
            setShow(null)
        }
    },[reservationStatus])

    useEffect(()=>{
        if(message === 'Cancellation Successfull.'){
            set(false)
            toast.success(message)
            dispatch(resetTheatreBookingActions())
        }
    },[message])
     
    const handleShowSelect = (movie)=>{
        setShow(prev=>{
            return {...prev,movie_id:movie ? movie.movie_id : null}
        })
        console.log(show,movie);
        setMovieSelect(false)
    }

    const handleConfirm = ()=>{
        console.log(screen_id);
        console.log(show);
        dispatch(theatreChangeShowMovie({data:{screen_id,showdata:show},token:theatreToken}))
        set(false)
    }

    const handleBookingCancel = ()=>{
        console.log("cancel");
        console.log(isOpen);
        dispatch(theatreCancelShowBookings({data:{screen_id,showdata:isOpen},token:theatreToken}))
    }

    const handleNoBookingCancel = ()=>{
        console.log("Nocancel");
        console.log(isOpen);
        dispatch(theatreCancelShowBookings({data:{screen_id,showdata:isOpen},token:theatreToken}))
    }

    if(isOpen){ 
        return createPortal(
            <div className='w-[100%] h-[100vh] fixed top-0 pt-32 md:pt-26 flex items-center justify-center bg-[#00000091]'>
              <Toaster richColors />
                <motion.div
                variants={confirmVarinat}
                initial="hidden"
                animate="visible"
                className='bg-black text-white w-[80%] sm:w-[65%] lg:w-[45%] xl:w-[35%] border-2 border-[#f6ae2d] rounded-md p-8 flex flex-col gap-16 justify-center items-center fixed min-h-[70vh] '>
                      <IoIosClose onClick={()=>set(false)} className="absolute cursor-pointer right-3 top-3 w-[2rem] h-[2rem]"/>
                        <h1 className='font-medium text-lg tracking-wider text-center'>Change Show Movie</h1>
                        <div className='w-[100%] flex flex-col items-center gap-4 '>
                        <h3 className='my-2 text-xl font-semibold tracking-widest w-[90%] overflow-hidden text-ellipsis whitespace-nowrap text-center text-[#f6ae2d]'>{show?.showtime}</h3>
                        {
                             enrolledMovies.length > 0 && movieSelect === show?.showtime ?
                            <div className=' overflow-scroll scrollbar-none flex flex-col justify-start text-black w-[90%] h-[7rem] '>
                                
                                <div key={'null'} onClick={()=>handleShowSelect(null)} className='min-h-[3rem] flex items-center bg-white rounded-sm  ml-[1.5px] mt-[1px] border-black w-[100%]'>
                                        <p className='mx-5 w-[100%]  text-ellipsis overflow-hidden'>Invalidate</p>
                                </div>
                                {
                                enrolledMovies.map((movie,i)=>{
                                    return (
                                    <div key={i} onClick={()=>handleShowSelect(movie)} className='min-h-[3rem] flex items-center bg-white rounded-sm  ml-[1.5px] mt-[1px] border-black w-[100%]'>
                                        <p className='mx-5 w-[100%]  text-ellipsis overflow-hidden'>{movie.title}</p>
                                    </div>
                                    )
                                }) 
                                }

                            </div>
                            :
                            show && <div onClick={()=>setMovieSelect(show.showtime)} className=' flex items-center  text-black w-[90%] h-[3rem] bg-[#f6ae2d] rounded-sm border-2 border-black' >
                            <p className='mx-5 text-xs sm:text-base'>{show?.movie_id !== null? enrolledMovies.find(mov=>mov.movie_id === show?.movie_id)?.title :'Choose Movie'}</p>      
                            </div>
                            }
                            {
                                hasFilledBookings &&
                                <>
                                <h3 className='text-[#f6ae2d] tracking-wider'>Bookings exist for some dates.</h3>
                                <h6 className='text-sm w-[90%] flex justify-center overflow-hidden'>You can change shows after {reservationStatus?.hasFilledDates} days.</h6>
                                </>
                            }
                            {
                                hasBookings &&
                                <>
                                <h3 className='text-[#f6ae2d] tracking-wider'>Bookings exist for some dates.</h3>
                                <h6 className='text-sm w-[90%] flex justify-center overflow-hidden'>Do you want to cancel shows without bookings ?</h6>
                                </>
                            }
                            {
                                hasData &&
                                <>
                                <h3 className='text-[#f6ae2d] tracking-wider'>Some bookings exist.</h3>
                                <h6 className='text-sm w-[90%] flex justify-center overflow-hidden'>Do you want to request for cancellation ?</h6>
                                </>
                            }
                        </div>

                        <div className='w-[100%] flex items-center justify-center gap-8'>
                            {hasData && <button onClick={handleNoBookingCancel} disabled={loading} className={loading? 'bg-[#cb9635d6] border-2 border-[#f6ae2d] text-black px-8 py-2 rounded-md hover:bg-black hover:text-white transition-all duration-200 ease-in-out' :'bg-[#f6ae2d] border-2 border-[#f6ae2d] text-black px-8 py-2 rounded-md hover:bg-black hover:text-white transition-all duration-200 ease-in-out'}>YES</button>}
                            {hasBookings && <button onClick={handleBookingCancel} disabled={loading} className={loading? 'bg-[#cb9635d6] border-2 border-[#f6ae2d] text-black px-8 py-2 rounded-md hover:bg-black hover:text-white transition-all duration-200 ease-in-out' :'bg-[#f6ae2d] border-2 border-[#f6ae2d] text-black px-8 py-2 rounded-md hover:bg-black hover:text-white transition-all duration-200 ease-in-out'}>YES</button>}
                            {show && <button onClick={handleConfirm} disabled={loading} className={loading? 'bg-[#cb9635d6] border-2 border-[#f6ae2d] text-black px-8 py-2 rounded-md hover:bg-black hover:text-white transition-all duration-200 ease-in-out' :'bg-[#f6ae2d] border-2 border-[#f6ae2d] text-black px-8 py-2 rounded-md hover:bg-black hover:text-white transition-all duration-200 ease-in-out'}>CONFIRM</button>}
                            <button onClick={()=>set(false)} disabled={loading} className={loading ? 'bg-[#cb9635d6] border-2 border-[#f6ae2d] text-black px-8 py-2 rounded-md hover:bg-black hover:text-white transition-all duration-200 ease-in-out' :'bg-[#f6ae2d] border-2 border-[#f6ae2d] text-black px-8 py-2 rounded-md hover:bg-black hover:text-white transition-all duration-200 ease-in-out'}>{hasFilledBookings ? 'EXIT' :'CANCEL'}</button>
                        </div>
                        <div className='w-[100%] mx-auto'>
                        <ScaleLoader loading={loading}  color='#f6ae2d' height={20} />
                        </div>
                </motion.div>
            </div>,
            document.getElementById("trailer-modal")
          )
    }else{
        return null
    }
}

export default ChangeShowModal
