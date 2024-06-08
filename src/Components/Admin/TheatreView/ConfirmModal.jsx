import React from 'react'
import { createPortal } from 'react-dom';
import { IoIosClose } from 'react-icons/io';

function ConfirmModal({isOpen,set,theatre,handleAction}) {
    
    if(isOpen){
        
        return createPortal(
            <div className='w-[100%] h-[100vh] fixed top-0 pt-26 flex items-center justify-center bg-[#00000091]'>
              <div className='bg-black text-white w-[80%] sm:w-[65%] lg:w-[45%] xl:w-[35%] border-2 border-[#f6ae2d] rounded-md p-8 flex flex-col gap-16 justify-center fixed min-h-[50vh] '>
              <IoIosClose onClick={()=>set(false)} className="absolute cursor-pointer right-3 top-3 w-[2rem] h-[2rem]"/>
                <h1 className='font-semibold text-2xl text-center'>Are You Sure ?</h1>
                <div className='w-[100%] flex items-center justify-center gap-8'>
                  <button onClick={()=>{handleAction(theatre.id); set(false)}} className='bg-[#f6ae2d] border-2 border-[#f6ae2d] text-black px-8 py-2 rounded-md hover:bg-black hover:text-white transition-all duration-200 ease-in-out'>{isOpen}</button>
                  <button onClick={()=>set(false)} className='bg-[#f6ae2d] border-2 border-[#f6ae2d] text-black px-8 py-2 rounded-md hover:bg-black hover:text-white transition-all duration-200 ease-in-out'>CANCEL</button>
                </div>
              </div>
            </div>
          ,document.getElementById('confirm-modal'))
     
}else{
    return null
}
}

export default ConfirmModal
