import React, { useEffect } from 'react'
import { IoIosClose } from 'react-icons/io';
import { motion } from 'framer-motion';
import { createPortal } from 'react-dom';
import { resetBookingData, resetPaymentStatus } from '../../../features/userBooking/userBookingSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import fail from '../../../assets/fail.png'

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

function PaymentFailure({isOpen,set}) {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        return ()=>{
            dispatch(resetBookingData())
            dispatch(resetPaymentStatus())  
        }
    },[])

    if(isOpen){ 
        return createPortal(
            <div className='w-[100%] h-[100vh] fixed top-0 pt-32 md:pt-26 flex items-center justify-center bg-[#00000091]'>
                <motion.div
                variants={confirmVarinat}
                initial="hidden"
                animate="visible"
                className='bg-black text-white w-[80%] sm:w-[65%] lg:w-[40%] border-2 border-[#f6ae2d] rounded-md p-8 flex flex-col gap-16 justify-between items-center fixed min-h-[55vh] '>
                      <IoIosClose onClick={()=>{set(false); navigate('/')}} className="absolute cursor-pointer font-medium right-3 top-3 w-[2rem] h-[2rem]"/>
                        <div className='w-[100%] flex flex-col items-center gap-2  '>
                        <div 
                            className='w-[50%]  overflow-hidden'>
                                <motion.img 
                                initial={{scale:0}}
                                animate={{scale:1}}
                                transition={{duration:0.5,ease:'easeInOut'}}
                                src={fail} alt="" width={'100%'} className='object-contain aspect-square ' /> 
                        </div>
                        <h2 className='tracking-wider text-[#f6ae2d] text-xl sm:text-3xl text-center w-[100%]  drop-shadow-[0px_0px_35px_black]' style={{fontFamily:'Stylish , serif'}}>Payment Failed.</h2>
                            <button onClick={()=>{set(false); navigate('/')}} className='bg-[#f6ae2d] z-10 border-2 my-4 border-[#f6ae2d] text-black px-4 py-2 rounded-sm w-[70%] font-medium tracking-widest hover:bg-black hover:text-white transition-all duration-150 ease-linear'>OK</button>
                        </div>
                </motion.div>
            </div>,
            document.getElementById("trailer-modal")
          )
    }else{
        return null
    }
}

export default PaymentFailure
