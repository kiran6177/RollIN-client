import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import { Toaster } from 'sonner'
import { motion } from 'framer-motion'
import { ScaleLoader } from 'react-spinners'
import { IoIosClose } from 'react-icons/io'
import { BiSolidMoviePlay } from "react-icons/bi";
import { GiFilmProjector } from "react-icons/gi";

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

function SearchModal({isOpen,set}) {

    const [movieQuery,setMovieQuery] = useState('')
    const [screenQuery,setScreenQuery] = useState('')

    const [type,setType] = useState('MOVIES');

    if(isOpen){ 
        return createPortal(
            <div className='w-[100%] h-[100vh] fixed top-0 pt-32 md:pt-28 flex items-start justify-center bg-[#00000091] z-30'>
              <Toaster richColors />
                <motion.div
                variants={revealVariant}
                initial="hidden"
                animate="visible"
                className='bg-black text-white w-[80%] sm:w-[75%] border-2 border-[#f6ae2d] rounded-sm p-8 flex flex-col gap-16 justify-start items-center fixed min-h-[70vh] z-30 overflow-hidden'>
                      <IoIosClose onClick={()=>set(false)} className="absolute cursor-pointer right-3 top-3 w-[2rem] h-[2rem]"/>
                        <div>
                            <button onClick={()=>setType('MOVIES')} className={type === 'MOVIES' ? 'bg-[#f6ae2d] text-black font-medium sm:font-semibold text-xs sm:text-base tracking-widest border-2 border-[#f6ae2d] px-5 sm:px-10 py-1 sm:py-3' : 'font-medium sm:font-semibold text-xs sm:text-base tracking-widest border-2 border-[#f6ae2d] px-5 sm:px-10 py-1 sm:py-3'}>MOVIES</button>
                            <button onClick={()=>setType('SCREENS')} className={type === 'SCREENS' ? 'bg-[#f6ae2d] text-black font-medium sm:font-semibold text-xs sm:text-base tracking-widest border-2 border-[#f6ae2d] px-5 sm:px-10 py-1 sm:py-3' : 'font-medium sm:font-semibold text-xs sm:text-base tracking-widest border-2 border-[#f6ae2d] px-5 sm:px-10 py-1 sm:py-3'}>SCREENS</button>
                        </div>
                        {
                            type === 'MOVIES' ? 
                                <>
                                <div className='w-[100%] flex flex-col items-center gap-4 '>    
                                    <input type="text" placeholder='Search For Movies '  value={movieQuery} onChange={(e)=>setMovieQuery(e.target.value)} className='text-sm border-2 border-[#f6ae2d] bg-black px-4 py-3 w-[100%] rounded-sm'  />
                                </div>
                                <div className='w-[100%]'>
                                   <h2 className='text-sm sm:text-lg tracking-wider font-medium mb-5'>Movie Results </h2>
                                    <div className='flex flex-col h-[10rem] gap-2 sm:gap-4 overflow-y-scroll'>

                                        <div className='flex gap-4 '>
                                            <BiSolidMoviePlay className='h-[1.7rem] w-[1.7rem] m-1 text-[#f6ae2d]' />
                                            <div className='flex flex-col tracking-wider'>
                                                <h2 className='text-xs sm:text-base text-[#f6ae2d]'>Paradise</h2>
                                                <p className='text-[8px] sm:text-[10px] my-[2px]'>Comedy / Action</p>
                                            </div>
                                        </div>

                                        <div className='flex gap-4 '>
                                            <BiSolidMoviePlay className='h-[1.7rem] w-[1.7rem] m-1 text-[#f6ae2d]' />
                                            <div className='flex flex-col tracking-wider'>
                                                <h2 className='text-xs sm:text-base text-[#f6ae2d]'>Paradise</h2>
                                                <p className='text-[8px] sm:text-[10px] my-[2px]'>Comedy / Action</p>
                                            </div>
                                        </div>

                                        <div className='flex gap-4 '>
                                            <BiSolidMoviePlay className='h-[1.7rem] w-[1.7rem] m-1 text-[#f6ae2d]' />
                                            <div className='flex flex-col tracking-wider'>
                                                <h2 className='text-xs sm:text-base text-[#f6ae2d]'>Paradise</h2>
                                                <p className='text-[8px] sm:text-[10px] my-[2px]'>Comedy / Action</p>
                                            </div>
                                        </div>
                                        <div className='flex gap-4 '>
                                            <BiSolidMoviePlay className='h-[1.7rem] w-[1.7rem] m-1 text-[#f6ae2d]' />
                                            <div className='flex flex-col tracking-wider'>
                                                <h2 className='text-xs sm:text-base text-[#f6ae2d]'>Paradise</h2>
                                                <p className='text-[8px] sm:text-[10px] my-[2px]'>Comedy / Action</p>
                                            </div>
                                        </div>
                                        <div className='flex gap-4 '>
                                            <BiSolidMoviePlay className='h-[1.7rem] w-[1.7rem] m-1 text-[#f6ae2d]' />
                                            <div className='flex flex-col tracking-wider'>
                                                <h2 className='text-xs sm:text-base text-[#f6ae2d]'>Paradise</h2>
                                                <p className='text-[8px] sm:text-[10px] my-[2px]'>Comedy / Action</p>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                                </>
                            :
                            <>
                            <div className='w-[100%] flex flex-col items-center gap-4 '>    
                                <input type="text" placeholder='Search For Screens '  value={screenQuery} onChange={(e)=>setScreenQuery(e.target.value)} className='text-sm border-2 border-[#f6ae2d] bg-black px-4 py-3 w-[100%] rounded-sm'  />
                            </div>
                            <div className='w-[100%]'>
                                   <h2 className='text-sm sm:text-lg tracking-wider font-medium mb-5'>Screen Results </h2>
                                    <div className='flex flex-col h-[10rem] gap-2 sm:gap-4 overflow-y-scroll'>

                                        <div className='flex gap-4 '>
                                            <GiFilmProjector className='h-[1.7rem] w-[1.7rem] m-1 text-[#f6ae2d]' />
                                            <div className='flex flex-col tracking-wider'>
                                                <h2 className='text-xs sm:text-base text-[#f6ae2d]'>JMAX By Gejo Theatre</h2>
                                                <p className='text-[8px] sm:text-[10px] my-[2px]'>Pattimattom , Kerala , India , 683562</p>
                                            </div>
                                        </div>

                                        <div className='flex gap-4 '>
                                            <GiFilmProjector className='h-[1.7rem] w-[1.7rem] m-1 text-[#f6ae2d]' />
                                            <div className='flex flex-col tracking-wider'>
                                                <h2 className='text-xs sm:text-base text-[#f6ae2d]'>JMAX By Gejo Theatre</h2>
                                                <p className='text-[8px] sm:text-[10px] my-[2px]'>Pattimattom , Kerala , India , 683562</p>
                                            </div>
                                        </div>

                                        <div className='flex gap-4 '>
                                            <GiFilmProjector className='h-[1.7rem] w-[1.7rem] m-1 text-[#f6ae2d]' />
                                            <div className='flex flex-col tracking-wider'>
                                                <h2 className='text-xs sm:text-base text-[#f6ae2d]'>JMAX By Gejo Theatre</h2>
                                                <p className='text-[8px] sm:text-[10px] my-[2px]'>Pattimattom , Kerala , India , 683562</p>
                                            </div>
                                        </div>

                                        <div className='flex gap-4 '>
                                            <GiFilmProjector className='h-[1.7rem] w-[1.7rem] m-1 text-[#f6ae2d]' />
                                            <div className='flex flex-col tracking-wider'>
                                                <h2 className='text-xs sm:text-base text-[#f6ae2d]'>JMAX By Gejo Theatre</h2>
                                                <p className='text-[8px] sm:text-[10px] my-[2px]'>Pattimattom , Kerala , India , 683562</p>
                                            </div>
                                        </div>

                                        <div className='flex gap-4 '>
                                            <GiFilmProjector className='h-[1.7rem] w-[1.7rem] m-1 text-[#f6ae2d]' />
                                            <div className='flex flex-col tracking-wider'>
                                                <h2 className='text-xs sm:text-base text-[#f6ae2d]'>JMAX By Gejo Theatre</h2>
                                                <p className='text-[8px] sm:text-[10px] my-[2px]'>Pattimattom , Kerala , India , 683562</p>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </>
                        }
                        
                        
                        <div className='w-[100%] mx-auto'>
                        <ScaleLoader loading={false}  color='#f6ae2d' height={20} />
                        </div>
                </motion.div>
            </div>,
            document.getElementById("trailer-modal")
          )
    }else{
        return null
    }
}

export default SearchModal
