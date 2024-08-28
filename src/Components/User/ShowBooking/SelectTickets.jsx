import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { IoIosClose } from 'react-icons/io'
import van from '../../../assets/van.png'
import car from '../../../assets/car.png'
import scooter from '../../../assets/scooter.png'
import bike from '../../../assets/bike.png'
import auto from '../../../assets/auto.png'
import bigcar from '../../../assets/bigcar.png'

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

  const images = [scooter,bike,auto,car,bigcar,bigcar,bigcar,van,van,van]

function SelectTickets({isOpen,set,setTicketCount}) { 
    const [selectedTicket,setSelectedTicket] = useState(1);
    const [image,setImage] = useState(scooter);
    const [tempImage,setTempImage] = useState(null);
    const [timeoutId,setTimeoutId] = useState(null);

    const handleMouseEnter = (val)=>{
        if(selectedTicket != val ){
            const id = setTimeout(()=>{
                setTempImage(images[parseInt(val) - 1])
            },300)
            setTimeoutId(id)
        }
    }

    const handleMouseLeave = ()=>{
        if(timeoutId){
            clearTimeout(timeoutId)
            setTimeoutId(null)
            setTempImage(null)
        }
    }

    const handleClick = (val)=>{
        setImage(images[parseInt(val) - 1])
        setSelectedTicket(parseInt(val))
    }


    if(isOpen){ 
        return createPortal(
            <div className='w-[100%] h-[100vh] fixed top-0 pt-32 md:pt-26 flex items-center justify-center bg-[#00000091]'>
                <motion.div
                variants={confirmVarinat}
                initial="hidden"
                animate="visible"
                className='bg-black text-white w-[80%] sm:w-[65%] lg:w-[40%] border-2 border-[#f6ae2d] rounded-md p-4 md:p-8 flex flex-col gap-16 justify-between items-center fixed min-h-[55vh] '>
                      <IoIosClose onClick={()=>set(false)} className="absolute cursor-pointer font-medium right-3 top-3 w-[2rem] h-[2rem]"/>
                        <div className='w-[100%] flex flex-col items-center gap-6'>
                            <h2 className='tracking-wider text-[#f6ae2d] text-sm sm:text-base'>How Many Seats ?</h2>
                            <div 
                            className='w-[75%] sm:w-[50%] '>
                                <AnimatePresence mode='wait'>
                                <motion.img 
                                key={tempImage ? tempImage : image}
                                initial={{x:-100}}
                                animate={{x:0}}
                                exit={{x:100}}
                                transition={{duration:0.2,ease:'easeInOut'}} 
                                src={tempImage ? tempImage : image} alt="" width={'100%'} className='object-contain aspect-[4/3]' />
                                </AnimatePresence>
                            </div>
                            <div className='flex justify-evenly w-[90%] text-sm '>
                                <p onMouseOver={()=>handleMouseEnter(1)} onMouseOut={handleMouseLeave} onClick={()=>handleClick(1)} className={selectedTicket === 1 ? ' border-2 border-[#f6ae2d] w-[2rem] h-[2rem]  flex items-center justify-center rounded-full transition-all duration-150 ease-in-out cursor-pointer font-medium' :' w-[2rem] h-[2rem]  flex items-center justify-center rounded-full hover:bg-[#f6ae2d] hover:text-black  transition-all duration-150 ease-in-out  cursor-pointer font-medium'}>1</p>
                                <p onMouseOver={()=>handleMouseEnter(2)}  onMouseOut={handleMouseLeave}  onClick={()=>handleClick(2)} className={selectedTicket === 2 ? ' border-2 border-[#f6ae2d] w-[2rem] h-[2rem]  flex items-center justify-center rounded-full transition-all duration-150 ease-in-out cursor-pointer font-medium' :' w-[2rem] h-[2rem]  flex items-center justify-center rounded-full hover:bg-[#f6ae2d] hover:text-black  transition-all duration-150 ease-in-out  cursor-pointer font-medium'}>2</p>
                                <p onMouseOver={()=>handleMouseEnter(3)}  onMouseOut={handleMouseLeave} onClick={()=>handleClick(3)} className={selectedTicket === 3 ? ' border-2 border-[#f6ae2d] w-[2rem] h-[2rem]  flex items-center justify-center rounded-full transition-all duration-150 ease-in-out cursor-pointer font-medium' :' w-[2rem] h-[2rem]  flex items-center justify-center rounded-full hover:bg-[#f6ae2d] hover:text-black  transition-all duration-150 ease-in-out  cursor-pointer font-medium'}>3</p>
                                <p onMouseOver={()=>handleMouseEnter(4)}  onMouseOut={handleMouseLeave} onClick={()=>handleClick(4)} className={selectedTicket === 4 ? ' border-2 border-[#f6ae2d] w-[2rem] h-[2rem]  flex items-center justify-center rounded-full transition-all duration-150 ease-in-out cursor-pointer font-medium' :' w-[2rem] h-[2rem]  flex items-center justify-center rounded-full hover:bg-[#f6ae2d] hover:text-black  transition-all duration-150 ease-in-out  cursor-pointer font-medium'}>4</p>
                                <p onMouseOver={()=>handleMouseEnter(5)}  onMouseOut={handleMouseLeave} onClick={()=>handleClick(5)} className={selectedTicket === 5 ? ' border-2 border-[#f6ae2d] w-[2rem] h-[2rem]  flex items-center justify-center rounded-full transition-all duration-150 ease-in-out cursor-pointer font-medium' :' w-[2rem] h-[2rem]  flex items-center justify-center rounded-full hover:bg-[#f6ae2d] hover:text-black  transition-all duration-150 ease-in-out  cursor-pointer font-medium'}>5</p>
                                <p onMouseOver={()=>handleMouseEnter(6)}  onMouseOut={handleMouseLeave} onClick={()=>handleClick(6)} className={selectedTicket === 6 ? ' border-2 border-[#f6ae2d] w-[2rem] h-[2rem]  flex items-center justify-center rounded-full transition-all duration-150 ease-in-out cursor-pointer font-medium' :' w-[2rem] h-[2rem]  flex items-center justify-center rounded-full hover:bg-[#f6ae2d] hover:text-black  transition-all duration-150 ease-in-out  cursor-pointer font-medium'}>6</p>
                                <p onMouseOver={()=>handleMouseEnter(7)}  onMouseOut={handleMouseLeave} onClick={()=>handleClick(7)} className={selectedTicket === 7 ? ' border-2 border-[#f6ae2d] w-[2rem] h-[2rem]  flex items-center justify-center rounded-full transition-all duration-150 ease-in-out cursor-pointer font-medium' :' w-[2rem] h-[2rem]  flex items-center justify-center rounded-full hover:bg-[#f6ae2d] hover:text-black  transition-all duration-150 ease-in-out  cursor-pointer font-medium'}>7</p>
                                <p onMouseOver={()=>handleMouseEnter(8)}  onMouseOut={handleMouseLeave} onClick={()=>handleClick(8)} className={selectedTicket === 8 ? ' border-2 border-[#f6ae2d] w-[2rem] h-[2rem]  flex items-center justify-center rounded-full transition-all duration-150 ease-in-out cursor-pointer font-medium' :' w-[2rem] h-[2rem]  flex items-center justify-center rounded-full hover:bg-[#f6ae2d] hover:text-black  transition-all duration-150 ease-in-out  cursor-pointer font-medium'}>8</p>
                                <p onMouseOver={()=>handleMouseEnter(9)}  onMouseOut={handleMouseLeave} onClick={()=>handleClick(9)} className={selectedTicket === 9 ? ' border-2 border-[#f6ae2d] w-[2rem] h-[2rem]  flex items-center justify-center rounded-full transition-all duration-150 ease-in-out cursor-pointer font-medium' :' w-[2rem] h-[2rem]  flex items-center justify-center rounded-full hover:bg-[#f6ae2d] hover:text-black  transition-all duration-150 ease-in-out  cursor-pointer font-medium'}>9</p>
                                <p onMouseOver={()=>handleMouseEnter(10)} onMouseOut={handleMouseLeave}  onClick={()=>handleClick(10)} className={selectedTicket === 10 ? ' border-2 border-[#f6ae2d] w-[2rem] h-[2rem]  flex items-center justify-center rounded-full transition-all duration-150 ease-in-out cursor-pointer font-medium' :' w-[2rem] h-[2rem]  flex items-center justify-center rounded-full hover:bg-[#f6ae2d] hover:text-black  transition-all duration-150 ease-in-out  cursor-pointer font-medium'}>10</p>
                            </div>
                            <button onClick={()=>setTicketCount(selectedTicket)} className='bg-[#f6ae2d] border-2 border-[#f6ae2d] text-black px-4 py-1 text-sm md:text-base md:py-2 rounded-sm w-[70%] font-medium tracking-widest hover:bg-black hover:text-white transition-all duration-150 ease-linear'>SELECT SEATS</button>
                        </div>
                </motion.div>
            </div>,
            document.getElementById("trailer-modal")
          )
    }else{
        return null
    }
}

export default SelectTickets
