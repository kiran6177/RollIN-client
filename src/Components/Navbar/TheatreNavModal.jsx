import React from 'react'
import { createPortal } from 'react-dom';
import { FaSearch, FaUserCircle } from 'react-icons/fa';
import { IoIosClose } from 'react-icons/io';
import { NavLink } from 'react-router-dom';
import PinLogo from '../../assets/pin-logo.png'
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const outerContainerVariant = {
    hidden:{
        opacity:0
    },
    visible:{
        opacity:1,
        transition:{
            duration:0.1,
            delayChildren:0.2
        }
    },
    exit:{
        opacity:0,
        transition:{
            duration:0.1
        }
    }
} 

const slideInVariant = {
    hidden:{
        x:'100vw'
    },
    visible:{
        x:0,
        transition:{
            duration:0.4
        }
    },
    exit:{
        x:'100vw',
        transition:{
            duration:0.3
        }
    }
}

function TheatreNavModal({isOpen,set}) {
    const {theatreToken} = useSelector(state=>state.theatre);


    if(isOpen){
        return createPortal(
            <motion.div 
            variants={outerContainerVariant}
            initial="hidden"
            animate="visible"
            className=" w-[100%] flex flex-col items-end bg-[rgba(0,0,0,0.6)] fixed top-0 right-0 h-[100%] z-30 max-h-full">
              <motion.div
              variants={slideInVariant}
              className="bg-[#F6AE2D] w-[65%] sm:w-[45%] md:w-[35%]  min-h-[150px] h-[20%]">
                  <IoIosClose onClick={()=>set(false)} className="absolute right-3 top-3 w-[2rem] h-[2rem]"/>
                  <h3 className="font-semibold text-2xl p-5 tracking-widest">Menu</h3>
                  {
                    theatreToken && 
                    <>    
                    <div className=" flex items-center px-6 py-2  gap-3">
                        <FaSearch/>
                        <NavLink className={'font-medium tracking-wider text-sm'}>Search</NavLink>
                    </div>  
                    <div className=" flex items-center px-6 py-2 gap-3">
                        <FaUserCircle/>
                        <NavLink to={'/theatre/profile'} className={'font-medium tracking-wider text-sm'}>Profile</NavLink>
                    </div>
                    </>
                  }
              </motion.div>
              <motion.div
              variants={slideInVariant}
              className="bg-[#15121B] w-[65%] sm:w-[45%] md:w-[35%] scrollbar h-[80%] overflow-y-scroll p-6 ">
                {!theatreToken ? 
                <><div className="text-white flex items-center py-5">
                    <img src={PinLogo} alt="" className="w-8" /> 
                    <NavLink to={'/theatre/login'} className={'font-medium tracking-widest text-sm '}>LOGIN</NavLink>
                </div>
                    <div className="text-white flex items-center py-5">
                    <img src={PinLogo} alt="" className="w-8" /> 
                    <NavLink to={'/theatre/signup'} className={'font-medium tracking-widest text-sm '}>REGISTER</NavLink>
                </div></>
                :
                <>
                
                <div className="text-white flex items-center py-5">
                    <img src={PinLogo} alt="" className="w-8" />
                    <NavLink to={'/theatre/login'} className={'font-medium tracking-widest text-sm '}>Movies</NavLink>
                </div>
                <div className="text-white flex items-center py-5">
                    <img src={PinLogo} alt="" className="w-8" />
                    <NavLink to={'/theatre/screens'} className={'font-medium tracking-widest text-sm '}>Screens</NavLink>
                </div>
                <div className="text-white flex items-center py-5">
                    <img src={PinLogo} alt="" className="w-8" />
                    <NavLink to={'/theatre/bookings'} className={'font-medium tracking-widest text-sm '}>Bookings</NavLink>
                </div>
                <div className="text-white flex items-center py-5">
                    <img src={PinLogo} alt="" className="w-8" />
                    <NavLink to={'/theatre/notifications'} className={'font-medium tracking-widest text-sm '}>Notifications</NavLink>
                </div>
                </>
                }
              </motion.div>
            </motion.div>,
            document.getElementById('nav-modal'));
    }else{
        return null;
    }
}

export default TheatreNavModal
