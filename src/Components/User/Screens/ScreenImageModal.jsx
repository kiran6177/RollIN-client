import React from 'react'
import img from '../../../assets/aavesham.jpg'
import { createPortal } from 'react-dom'
import  { motion } from 'framer-motion'
import { IoIosClose } from 'react-icons/io'

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

function ScreenImageModal({isOpen,set,theatre}) {
    
    if(isOpen){ 
        return createPortal(
            <div className='w-[100%] h-[100vh] fixed top-0 pt-32 md:pt-26 flex items-center justify-center bg-[#00000091]'>
                <motion.div
                variants={confirmVarinat}
                initial="hidden"
                animate="visible"
                className='bg-black text-white w-[80%] sm:w-[65%] lg:w-[55%] border-2 border-[#f6ae2d] rounded-md p-8 flex flex-col gap-16 py-10 items-center fixed min-h-[70vh] '>
                      <IoIosClose onClick={()=>set(false)} className="absolute cursor-pointer right-3 top-3 w-[2rem] h-[2rem]"/>
                    <div className='flex flex-col gap-6 '>
                        <h2 className='text-[#f6ae2d] text-xl font-semibold tracking-widest' >{theatre?.name}</h2>
                        <h2 className='text-white text-md font-normal tracking-wide' >{theatre?.address?.completeLocation}</h2>
                        <div className='flex flex-wrap gap-6'>
                            {theatre?.images?.length > 0 && theatre.images.map(image=>{
                                    return(
                                    <div key={image} className='w-[10rem]'>
                                        <img src={image} alt="" className='aspect-square object-cover' width={'100%'} />
                                    </div>
                                )})
                            }
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

export default ScreenImageModal

