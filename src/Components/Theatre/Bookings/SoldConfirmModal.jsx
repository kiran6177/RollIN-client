import React from 'react'
import { createPortal } from 'react-dom'
import { IoIosClose } from 'react-icons/io'
import { motion } from 'framer-motion'
import { ScaleLoader } from 'react-spinners'
import { Toaster } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { theatreBookSeat } from '../../../features/theatreBookings/theatreBookingActions'

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

function SoldConfirmModal({isOpen,set}) {

    const {loading} = useSelector(state=>state.theatreBooking)
    const {theatreToken} = useSelector(state=>state.theatre)
    const dispatch = useDispatch();
    const handleSold = ()=>{
        console.log(isOpen);
        dispatch(theatreBookSeat({data:isOpen,token:theatreToken}))
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
                        <h1 className='font-medium text-lg tracking-wider text-[#f6ae2d] text-center'>MARK AS SOLD</h1>
                        <div className='w-[100%] flex flex-col items-center gap-4 '>
                            <h1 className='font-medium text-md tracking-widest text-center'>SEAT : <span className='text-[#f6ae2d]'>{isOpen?.seatData[0]}</span></h1>
                            <h2 className='font-medium text-md tracking-wider text-center'>Are You Sure ?</h2>
                        </div>

                        <div className='w-[100%] flex flex-col md:flex-row md:items-center justify-center gap-3 md:gap-8'>
                            <button onClick={()=>{handleSold()}} disabled={loading} className={loading? 'bg-[#cb9635d6] border-2 border-[#f6ae2d] text-black px-8 py-2 rounded-md hover:bg-black hover:text-white transition-all duration-200 ease-in-out' :'bg-[#f6ae2d] border-2 border-[#f6ae2d] text-black px-8 py-2 rounded-md hover:bg-black hover:text-white transition-all duration-200 ease-in-out'}>CONFIRM</button>
                            <button onClick={()=>set(false)} disabled={loading} className={loading ? 'bg-[#cb9635d6] border-2 border-[#f6ae2d] text-black px-8 py-2 rounded-md hover:bg-black hover:text-white transition-all duration-200 ease-in-out' :'bg-[#f6ae2d] border-2 border-[#f6ae2d] text-black px-8 py-2 rounded-md hover:bg-black hover:text-white transition-all duration-200 ease-in-out'}>CANCEL</button>
                        </div>
                        {loading && <div className='w-[100%] mx-auto'>
                        <ScaleLoader loading={loading}  color='#f6ae2d' height={20} />
                        </div>}
                </motion.div>
            </div>,
            document.getElementById("trailer-modal")
          )
    }else{
        return null
    }
}

export default SoldConfirmModal
