import React, { useEffect, useLayoutEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { IoIosClose } from 'react-icons/io'
import { ScaleLoader } from 'react-spinners'
import { Toaster } from 'sonner'
import { motion } from 'framer-motion'
import { Loader } from '@googlemaps/js-api-loader'
import AutoSearch from './AutoSearch'
import kochi from '../../assets/kochi-513.png'
import kolkata from '../../assets/kolkata.png'
import chennai from '../../assets/chennai.png'
import delhi from '../../assets/delhi.png'
import bengaluru from '../../assets/Bengaluru.png'
import mumbai from '../../assets/mumbai.png'
import pune from '../../assets/pune.png'
import MajorLocation from './MajorLocation'

const revealVariant = {
    hidden:{
      height:'1vh',
      opacity:0
    },
    visible:{
      height:'60vh',
      opacity:1,
      transition:{
        type:"linear",
        duration:0.2
      }
    }
  }


function SelectCity({isOpen,set}) {
    const [isLoaded,setIsLoaded] = useState(false);
    const MAPS_API_KEY = process.env.REACT_APP_MAPS_API_KEY;

    useEffect(()=>{
        loads()
    },[])

    const loads = async()=>{
        const loader = new Loader({
            apiKey:MAPS_API_KEY,
            version:'weekly'
        })
         await loader.importLibrary("places")
        setIsLoaded(true)
    }
     

    if(isOpen){ 
        return createPortal(
            <div className='w-[100%] h-[100vh] fixed top-0 pt-32 md:pt-28 flex items-start justify-center bg-[#00000091] z-30'>
              <Toaster richColors />
                <motion.div
                variants={revealVariant}
                initial="hidden"
                animate="visible"
                className='bg-black text-white w-[80%] sm:w-[75%] border-2 border-[#f6ae2d] rounded-sm p-8 flex flex-col gap-16 justify-start items-center fixed min-h-[70vh] z-30'>
                      <IoIosClose onClick={()=>set(false)} className="absolute cursor-pointer right-3 top-3 w-[2rem] h-[2rem]"/>
                        <h1 className='font-medium text-lg tracking-wider text-center'>Select Your City</h1>
                        <div className='w-[100%] flex flex-col items-center gap-4 '>
                            {
                                isLoaded && <AutoSearch set={set} />
                            }
                        </div>
                        <div className='w-[90%] flex justify-evenly flex-wrap'>
                            {isLoaded &&
                            <>
                            <MajorLocation src={pune} name={'Pune'} set={set} />
                            <MajorLocation src={mumbai} name={'Mumbai'} set={set} />
                            <MajorLocation src={bengaluru} name={'Bengaluru'} set={set} />
                            <MajorLocation src={delhi} name={'Delhi'} set={set} />
                            <MajorLocation src={chennai} name={'Chennai'} set={set} />
                            <MajorLocation src={kolkata} name={'Kolkata'} set={set} />
                            <MajorLocation src={kochi} name={'Kochi'} set={set} />
                            </>
                            }
                        </div>
                        <div className='w-[100%] mx-auto'>
                        {/* <ScaleLoader loading={loading}  color='#f6ae2d' height={20} /> */}
                        </div>
                </motion.div>
            </div>,
            document.getElementById("trailer-modal")
          )
    }else{
        return null
    }
}

export default SelectCity
