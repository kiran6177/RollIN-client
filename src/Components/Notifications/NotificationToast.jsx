import React, { useEffect, useState } from 'react'
import banner from "../../assets/MM-1207 Oppenheimer.jpg"
import { IoNotificationsSharp } from "react-icons/io5";
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

function NotificationToast({notification}) {
  const [image,setImage] = useState('');
  const [header,setHeader] = useState('');
  const [desc,setDesc] = useState('');

  const {userData} = useSelector(state=>state.user);
  const {theatreData} = useSelector(state=>state.theatre);

  useEffect(()=>{
    if(userData && notification){
      if(notification?.type === "SHOW_ALERT"){
        setImage(notification?.orderdata?.movie?.backdrop_path)
        setHeader(`Hey ${userData?.firstname}, You have movie at ${notification?.orderdata?.show_time}`);
        setDesc(notification?.orderdata?.movie?.title)
      }
      if(notification?.type === "MOVIE_REMINDER"){
        setImage(notification?.moviedata?.backdrop_path)
        setHeader(`Hey ${userData?.firstname}, ${notification?.moviedata?.title} is now in theatres!!`);
        setDesc("Don't Miss It.")
      }
    }
    if(theatreData && notification){
      if(notification?.type === "ENROLLMENT_ENDED"){
        setImage(notification?.moviedata?.backdrop_path)
        setHeader(`Hey ${theatreData?.name}, ${notification?.moviedata?.title}'s enrollment is ending.!! `);
        setDesc("Enroll or Extend to continue booking.")
      }
      if(notification?.type === "BOOKINGS_ENDED"){
        setImage(notification?.moviedata?.backdrop_path)
        setHeader(`Hey ${theatreData?.name}, ${notification?.showdata?.show_time} show bookings ends today.!! `);
        setDesc("Change movie to continue bookings.")
      }
    }
  },[notification,userData,theatreData])

  return (
    <motion.div 
    initial={{x:1000}}
    animate={{x:0}}
    transition={{type:'spring'}}
    exit={{x:1000}}
    className='bg-black border-2 border-[#f6ae2d] rounded-md fixed w-[80vw] sm:w-[68vw] lg:w-[40vw] h-[6rem] sm:h-[7rem] z-50 top-[4.5rem] right-[3rem] shadow-[0px_0px_35px_rgba(245,176,63,0.6)] overflow-hidden flex justify-between'>
      <div className='flex gap-5 p-4 '>
        <div className='flex items-center justify-center'>
        <IoNotificationsSharp className='text-[#f6ae2d] w-[2rem] h-[2rem] animate-bounce' />
        </div>
        <div className='flex flex-col gap-2'>
          <h2 className='text-[#f6ae2d] tracking-wider text-sm sm:text-base  '>{header}</h2>
          <h2 className='text-white font-light tracking-wide text-xs sm:text-sm'>{desc}</h2>
        </div>
      </div>
      <div className='h-full overflow-hidden relative'>
        <div className='h-[100%] w-[100%] bg-gradient-to-r from-black to-transparent absolute'></div>
        <img src={image} alt=""  className='object-cover  h-[100%]' />
      </div>
    </motion.div>
  )
}

export default NotificationToast