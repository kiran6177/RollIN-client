import React from 'react'
import { createPortal } from 'react-dom'
import { IoIosClose } from 'react-icons/io';
import { motion } from 'framer-motion';
import YouTube from 'react-youtube';

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
const opts = {
    width: '100%',
    playerVars: {
      autoplay: 1,
      controls:0,
      rel:1,
      fs:0,
      iv_load_policy:3
    },
  };

function TrailerModal({isOpen,set,videoKey}) {

    if(isOpen){ 
        return createPortal(
            <div className='w-[100%] h-[100vh] fixed top-0 pt-32 md:pt-26 flex items-center justify-center bg-[#00000091]'>
                <motion.div
                variants={confirmVarinat}
                initial="hidden"
                animate="visible"
                className='bg-black text-white w-[80%] sm:w-[65%] lg:w-[55%] border-2 border-[#f6ae2d] rounded-md p-8 flex flex-col gap-16 justify-center fixed min-h-[70vh] '>
                      <IoIosClose onClick={()=>set(false)} className="absolute cursor-pointer right-3 top-3 w-[2rem] h-[2rem]"/>
                        <div className='w-[100%]'>
                            {videoKey ?
                            <YouTube videoId={videoKey} opts={opts} style={{borderRadius:'10px'}} /> 
                            :   <h4 className='w-[100%] text-center'>NO VIDEOS AVAILABLE.</h4>
                            }
                        </div>
                </motion.div>
            </div>,
            document.getElementById("trailer-modal")
          )
    }else{
        return null
    }
    
}

export default TrailerModal
