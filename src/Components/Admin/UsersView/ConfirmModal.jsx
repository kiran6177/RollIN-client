import React from 'react'
import { createPortal } from 'react-dom';
import { IoIosClose } from 'react-icons/io';
import { motion } from 'framer-motion';

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

function ConfirmModal({isOpen,set,handleAction}) {
    
    if(isOpen){
        const id = isOpen.split("|")[1]
        const action = isOpen.split("|")[0]
        return createPortal(
            <div className='w-[100%] h-[100vh] fixed top-0 pt-26 flex items-center justify-center bg-[#00000091]'>
              <motion.div
              variants={confirmVarinat}
              initial="hidden"
              animate="visible"
              className='bg-black text-white w-[80%] sm:w-[65%] lg:w-[45%] xl:w-[35%] border-2 border-[#f6ae2d] rounded-md p-8 flex flex-col gap-16 justify-center fixed min-h-[50vh] '>
              <IoIosClose onClick={()=>set(false)} className="absolute cursor-pointer right-3 top-3 w-[2rem] h-[2rem]"/>
                <h1 className='font-semibold text-2xl text-center'>Are You Sure ?</h1>
                <div className='w-[100%] flex flex-col md:flex-row md:items-center justify-center gap-2 md:gap-8'>
                  <button onClick={()=>{handleAction(id); set(false)}} className='bg-[#f6ae2d] border-2 border-[#f6ae2d] text-black px-8 py-2 rounded-md hover:bg-black hover:text-white transition-all duration-200 ease-in-out'>{action}</button>
                  <button onClick={()=>set(false)} className='bg-[#f6ae2d] border-2 border-[#f6ae2d] text-black px-8 py-2 rounded-md hover:bg-black hover:text-white transition-all duration-200 ease-in-out'>CANCEL</button>
                </div>
              </motion.div>
            </div>
          ,document.getElementById('confirm-modal'))
     
}else{
    return null
}
}

export default ConfirmModal
