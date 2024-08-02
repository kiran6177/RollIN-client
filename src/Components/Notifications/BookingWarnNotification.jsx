import React, { useCallback } from 'react'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { getTimeFrame } from '../../utils/getTimeFrame';

const cardVariants = {
    hidden:{
        opacity:0,
        y:100
    },
    visible:{
        opacity:1,
        y:0,
        transition:{
            duration:1
        }
    }
  }


function BookingWarnNotification({notification}) {
    const {theatreData} = useSelector(state=>state.theatre);

    const getTime = useCallback(getTimeFrame(notification?.createdAt),[notification?.createdAt])

  return (
    <motion.div 
    variants={cardVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{once:true}} 
    className='border-2 border-[#f6ae2d] rounded-md py-5 px-8 bg-black relative flex flex-col md:flex-row gap-8 w-[100%]' >
            <div className='md:h-[8rem] self-center aspect-[4/5] border-[1px] border-[#f6ae2d] rounded-sm overflow-hidden w-[10rem] md:w-auto'>
                <img src={notification?.moviedata?.poster_path} alt="" height={'100%'} className='object-cover aspect-[4/5]' />
            </div>
            <div className='flex flex-col gap-3'>
                <h2 className='text-[#f6ae2d] tracking-wider font-medium text-lg sm:text-xl '>Hey {theatreData?.name}, {notification?.showdata?.show_time} show bookings ends today.</h2>
                <h2 className='text-[#f6ae2d] text-md'>{notification?.moviedata?.title}</h2>
                <h2 className='text-white text-sm'>Change movie to continue bookings.</h2>
            </div>
            {notification?.read_status === "UNREAD" && <span className='absolute top-[0.5rem] left-[1rem] -rotate-[35deg] text-[10px] bg-red-600 text-white rounded-full w-[2.5rem] h-[2.5rem] flex items-center justify-center font-semibold tracking-widest'>NEW</span>}
        <p className='absolute text-white text-xs bottom-4 right-7'>{getTime}</p>
    </motion.div>
  )
}

export default BookingWarnNotification
