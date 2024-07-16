import React from 'react'
import { IoIosClose } from 'react-icons/io'
import { motion } from 'framer-motion'
import { createPortal } from 'react-dom'
import image from '../../../assets/ohno-bg.png'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { resetUserBookings } from '../../../features/userBooking/userBookingSlice'

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

function SessionTimedOutModal({isOpen,set}) {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    if(isOpen){ 
        return createPortal(
            <div className='w-[100%] h-[100vh] fixed top-0 pt-32 md:pt-26 flex items-center justify-center bg-[#00000091]'>
                <motion.div
                variants={confirmVarinat}
                initial="hidden"
                animate="visible"
                className='bg-black text-white w-[80%] sm:w-[65%] lg:w-[40%] border-2 border-[#f6ae2d] rounded-md p-8 flex flex-col gap-16 justify-between items-center fixed min-h-[55vh] '>
                      <IoIosClose onClick={()=>{set(false); navigate("/"); dispatch(resetUserBookings())}} className="absolute cursor-pointer font-medium right-3 top-3 w-[2rem] h-[2rem]"/>
                        <div className='w-[100%] flex flex-col items-center gap-6 relative'>
                            <motion.div 
                            initial={{height:0}}
                            animate={{height:'90%'}}
                            transition={{duration:0.5,ease:'easeInOut'}}
                            className='w-[50%] absolute right-0 bottom-0 overflow-hidden'>
                                <img src={image} alt="" width={'100%'} className='object-contain aspect-[4/3] ' />
                            </motion.div>
                            <h2 className='tracking-wider text-[#f6ae2d] text-sm sm:text-base lg:text-xl mt-[2rem] sm:mt-[6rem] mb-[2rem] w-[60%] z-10 drop-shadow-[0px_0px_35px_black]' style={{fontFamily:'Stylish , serif'}}>Your session timed out.<br></br> Try Again.</h2>
                            
                            <button onClick={()=>{set(false); navigate("/"); dispatch(resetUserBookings()) }} className='bg-[#f6ae2d] z-10 border-2 border-[#f6ae2d] text-black px-4 py-2 rounded-sm w-[70%] font-medium tracking-widest hover:bg-black hover:text-white transition-all duration-150 ease-linear'>OK</button>
                        </div>
                </motion.div>
            </div>,
            document.getElementById("trailer-modal")
          )
    }else{
        return null
    }
}

export default SessionTimedOutModal
