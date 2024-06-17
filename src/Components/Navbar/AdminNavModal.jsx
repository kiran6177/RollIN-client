import React from 'react'
import { createPortal } from 'react-dom';
import { NavLink } from 'react-router-dom';
import PinLogo from '../../assets/pin-logo.png'
import { IoIosClose } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { FaSearch, FaUserCircle } from 'react-icons/fa';
import {  motion } from 'framer-motion';

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

function AdminNavModal({isOpen,set}) {

    const {adminToken} = useSelector(state=>state.admin)

    if(isOpen){
        return createPortal(
                <motion.div 
                variants={outerContainerVariant}
                initial="hidden"
                animate="visible"
                exit="exit"
                className=" w-[100%] flex flex-col items-end bg-[rgba(0,0,0,0.6)] fixed top-0 right-0 h-[100%] z-30 max-h-full">
                    <motion.div
                    variants={slideInVariant}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="bg-[#F6AE2D] w-[65%] sm:w-[45%] md:w-[35%]  min-h-[150px] h-[20%]">
                        <IoIosClose onClick={()=>set(false)} className="absolute right-3 top-3 w-[2rem] h-[2rem]"/>
                        <h3 className="font-semibold text-2xl p-5 tracking-widest">Menu</h3>
                        {
                            adminToken && 
                            <>    
                            <div className=" flex items-center px-6 py-2  gap-3">
                                <FaSearch/>
                                <NavLink className={'font-medium tracking-wider text-sm'}>Search</NavLink>
                            </div>  
                            <div className=" flex items-center px-6 py-2 gap-3">
                                <FaUserCircle/>
                                <NavLink to={'/admin/profile'} className={'font-medium tracking-wider text-sm'}>Profile</NavLink>
                            </div>
                            </>
                        }
                    </motion.div>
                    <motion.div
                    variants={slideInVariant}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="bg-[#15121B] w-[65%] sm:w-[45%] md:w-[35%] scrollbar h-[80%] overflow-y-scroll p-6 ">
                        {!adminToken ? <div className="text-white flex items-center py-5">
                            <img src={PinLogo} alt="" className="w-8" /> 
                            <NavLink to={'/admin/login'} className={'font-medium tracking-widest text-sm '}>LOGIN</NavLink>
                        </div>:
                        <>
                        <div className="text-white flex items-center py-5">
                            <img src={PinLogo} alt="" className="w-8" />
                            <NavLink to={'/admin/login'} className={'font-medium tracking-widest text-sm '}>Dashboard</NavLink>
                        </div>
                        <div className="text-white flex items-center py-5">
                            <img src={PinLogo} alt="" className="w-8" />
                            <NavLink to={'/admin/users'} className={'font-medium tracking-widest text-sm '}>Users</NavLink>
                        </div>
                        <div className="text-white flex items-center py-5">
                            <img src={PinLogo} alt="" className="w-8" />
                            <NavLink to={'/admin/movies'} className={'font-medium tracking-widest text-sm '}>Movies</NavLink>
                        </div>
                        <div className="text-white flex items-center py-5">
                            <img src={PinLogo} alt="" className="w-8" />
                            <NavLink to={'/admin/theatres'} className={'font-medium tracking-widest text-sm '}>Theatres</NavLink>
                        </div>
                        <div className="text-white flex items-center py-5">
                            <img src={PinLogo} alt="" className="w-8" />
                            <NavLink to={'/admin/persons'} className={'font-medium tracking-widest text-sm '}>Persons</NavLink>
                        </div>
                        </>
                        }
                    </motion.div>
                </motion.div>
            ,
            document.getElementById('nav-modal'));
    }else{
        return null;
    }
}

export default AdminNavModal
