import React, { useCallback } from 'react'
import { motion } from 'framer-motion';
import { getTimeFrame } from '../../utils/getTimeFrame';
import { useSelector } from 'react-redux';

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

function MovieReminderNotfication({notification}) {

    const {userData} = useSelector(state=>state.user);

    const getTime = useCallback(getTimeFrame(notification?.createdAt),[notification?.createdAt])

  return (
    <motion.div 
    variants={cardVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{once:true}} 
    className='border-2 border-[#f6ae2d] rounded-md py-5 px-8 bg-black relative flex gap-8 w-[100%]' >
            <div className='h-[8rem] aspect-[4/5] border-[1px] border-[#f6ae2d] rounded-sm'>
                <img src={notification?.moviedata?.poster_path} alt="" height={'100%'} className='object-cover aspect-[4/5]' />
            </div>
            <div className='flex flex-col gap-3'>
                <h2 className='text-[#f6ae2d] tracking-wider font-medium text-xl '>Hey {userData?.firstname}, {notification?.moviedata?.title} is now in theatres!!</h2>
                <h2 className='text-white text-sm'>Show starts from <span className='text-[#f6ae2d]'>{new Date(notification?.movie_begin).toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'})} </span> onwards. Stay Tuned!!</h2>
                <h2 className='text-[#f6ae2d] text-sm'>Don't Miss It.</h2>
            </div>
            {notification?.read_status === "UNREAD" && <span className='absolute top-[0.5rem] left-[1rem] -rotate-[35deg] text-[10px] bg-red-600 text-white rounded-full w-[2.5rem] h-[2.5rem] flex items-center justify-center font-semibold tracking-widest'>NEW</span>}
        <p className='absolute text-white text-xs bottom-4 right-7'>{getTime}</p>
    </motion.div>
  )
}

export default MovieReminderNotfication
