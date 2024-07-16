import React, { useEffect } from 'react'
import { createPortal } from 'react-dom';
import { IoIosClose } from 'react-icons/io';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { resetBookingData, resetPaymentStatus } from '../../../features/userBooking/userBookingSlice';

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

function PaymentSuccess({isOpen,set}) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {booking_data} = useSelector(state=>state.userBooking)

    useEffect(()=>{
        return ()=>{
            dispatch(resetBookingData())
            dispatch(resetPaymentStatus())  
        }
    },[])

    if(isOpen){ 
        return createPortal(
            <div className='w-[100%] h-[100vh] fixed top-0 pt-8 md:pt-12 flex items-center justify-center bg-[#00000091] z-30'>
                <motion.div
                variants={confirmVarinat}
                initial="hidden"
                animate="visible"
                className='bg-black text-white w-[80%] sm:w-[45%] lg:w-[27%] border-2 border-[#f6ae2d] rounded-md  flex flex-col  justify-between items-center fixed min-h-[55dvh] '>
                      <IoIosClose onClick={()=>{set(false); navigate('/')}} className="absolute cursor-pointer font-medium right-3 top-3 w-[2rem] h-[2rem]"/>
                        <div className='w-[100%] flex flex-col justify-between'>
                            <div className='w-[100%] flex items-center gap-5 border-b-2 py-4 px-8 sm:p-8 border-[#f6ae2d]'>
                                <div className='w-[25%] border-[1px] border-[#f6ae2d] rounded-sm'>
                                    <img src={booking_data?.movie?.poster_path} alt="" className='object-contain ' /> 
                                </div>
                                <div className='w-[70%]'>
                                    <h2 className='text-[#f6ae2d] font-semibold text-lg sm:text-xl whitespace-nowrap text-ellipsis overflow-hidden tracking-wider'>{booking_data?.movie?.title}</h2>
                                    <h2 className='text-xs sm:text-sm whitespace-nowrap text-ellipsis overflow-hidden '>{booking_data?.movie?.genres[0] ? booking_data?.movie?.genres[0]?.name ? booking_data?.movie?.genres[0]?.name : booking_data?.movie?.genres[0]  : '' }{booking_data?.movie?.genres[1] ? booking_data?.movie?.genres[1]?.name ? " / "+ booking_data?.movie?.genres[1]?.name : " / "+ booking_data?.movie?.genres[1] : '' },{booking_data?.movie?.language}</h2>
                                    <h2 className='text-xs sm:text-sm whitespace-nowrap text-ellipsis overflow-hidden '>{new Date(booking_data?.show_date).toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'})}, {booking_data?.show_time}</h2>
                                </div>
                            </div>
                            <div className='flex flex-col justify-between'>
                            <div>
                                <div className='flex flex-col w-[100%] px-8  py-3 '>
                                    <div className='flex flex-col '>
                                    <h1 className='text-[#f6ae2d] font-semibold text-md sm:text-lg whitespace-nowrap text-ellipsis overflow-hidden w-[100%]'>{booking_data?.theatre_id?.name}</h1>
                                    <h1 className='text-[#f6ae2d] font-medium text-md sm:text-lg whitespace-nowrap text-ellipsis overflow-hidden w-[100%]'>{booking_data?.screendata?.screen_name}</h1>
                                    </div>
                                    <h2 className='text-[10px] sm:text-xs whitespace-nowrap text-ellipsis overflow-hidden '>{booking_data?.theatre_id?.address?.completeLocation}</h2>
                                </div>
                                <div className='flex flex-col px-8 py-3 gap-1'>
                                    <h3 className='text-[10px] sm:text-xs'>Seats</h3>
                                    {
                                        booking_data?.seatdata?.length > 0 && booking_data?.seatdata.map((seatObj,i)=>{
                                            return(
                                            <h2 key={seatObj?.tier_name+i} className='text-md sm:text-xl'>{seatObj?.tier_name} - <span className='text-[#f6ae2d] font-semibold tracking-wider'>{seatObj?.seats?.length > 1 ? seatObj?.seats?.join(', ') : seatObj.seats.join()}</span></h2>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div>
                                <div className='flex justify-center'><h3 className='text-[8px] sm:text-[10px] md:text-xs text-center border-[1px] border-[#f6ae2d] rounded-3xl py-1 sm:py-2 px-3'>Booking ID : {booking_data?.order_id} </h3></div>
                                <div className=' overflow-hidden flex justify-center p-3 sm:p-6'>
                                    <img src={booking_data?.qr_url} alt="" className='object-contain aspect-square w-[50%]' />
                                </div>
                                <div className='flex justify-center'><h3 className='text-[8px] sm:text-[10px] md:text-xs text-center border-[1px] border-[#f6ae2d] rounded-3xl py-1 sm:py-2 px-3 my-2 sm:my-4'>Cancellation available only before 4 hours of show.</h3></div>
                            </div>
                            </div>

                        </div>
                </motion.div>
            </div>,
            document.getElementById("trailer-modal")
          )
    }else{
        return null
    }
}

export default PaymentSuccess
