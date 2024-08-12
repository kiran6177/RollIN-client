import React from 'react'
import { motion } from 'framer-motion';
import { IoIosClose } from 'react-icons/io';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userCancelTicket } from '../../../features/userBooking/userBookingActions';

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

function CancelConfirmModal({isOpen,set}) {
    const {userToken} = useSelector(state=>state.user);
    const dispatch = useDispatch();
    const {loading} = useSelector(state=>state.userBooking);

    const handleAction = ()=>{
        dispatch(userCancelTicket({data:{order_id:isOpen},token:userToken}))
        set(false)
    }
    if(isOpen){ 
        return createPortal(
            <div className='w-[100%] h-[100vh] fixed top-0 pt-8 md:pt-12 flex items-center justify-center bg-[#00000091] z-30'>
                <motion.div
                variants={confirmVarinat}
                initial="hidden"
                animate="visible"
                className='bg-black text-white w-[80%] sm:w-[65%] lg:w-[45%] xl:w-[35%] border-2 border-[#f6ae2d] rounded-md p-8 flex flex-col gap-16 justify-center fixed min-h-[50vh] '>
                      <IoIosClose onClick={()=>{set(false);}} className="absolute cursor-pointer font-medium right-3 top-3 w-[2rem] h-[2rem]"/>
                      <h1 className='font-semibold text-2xl text-center'>Are You Sure ?</h1>
                        <div className='w-[100%] flex items-center justify-center gap-8'>
                            <button disabled={loading} onClick={handleAction} className={loading ? 'bg-[#c1861abf] border-2 border-[#c1861abf] text-black px-8 py-2 rounded-md hover:bg-black hover:text-white transition-all duration-200 ease-in-out' :'bg-[#f6ae2d] border-2 border-[#f6ae2d] text-black px-8 py-2 rounded-md hover:bg-black hover:text-white transition-all duration-200 ease-in-out'}>YES</button>
                            <button disabled={loading} onClick={()=>set(false)} className={loading ? 'bg-[#c1861abf] border-2 border-[#c1861abf] text-black px-8 py-2 rounded-md hover:bg-black hover:text-white transition-all duration-200 ease-in-out' : 'bg-[#f6ae2d] border-2 border-[#f6ae2d] text-black px-8 py-2 rounded-md hover:bg-black hover:text-white transition-all duration-200 ease-in-out'}>NO</button>
                        </div>
                </motion.div>
            </div>,
            document.getElementById("trailer-modal")
          )
    }else{
        return null
    }
}

export default CancelConfirmModal
