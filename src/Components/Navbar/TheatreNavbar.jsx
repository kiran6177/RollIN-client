import React, { useState } from 'react'
import { FaSearch, FaUserCircle } from 'react-icons/fa';
import { RxHamburgerMenu } from 'react-icons/rx';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';
import TheatreNavModal from './TheatreNavModal';
import logo from '../../assets/logo.png'


function TheatreNavbar() {
    const [isOpen,setIsOpen] = useState(false);
    const {theatreToken} = useSelector(state=>state.theatre);
    const navigate = useNavigate();
  
    const handleProfile = ()=>{
      navigate('/theatre/profile')
    }
  
    return (
      <>
      <div className='flex justify-between h-[6rem] items-center bg-black fixed z-20 w-[100vw]'>
  
        <div className='w-[50%] min-[480]:w-[45%] h-[100%] sm:w-[50%] flex items-center gap-14 pl-5 text-white'>
          <div className='h-[100%] w-[100%] sm:w-[40%] md:w-[35%] flex items-center'>
            <NavLink to={'/theatre'}><img src={logo} alt="" /></NavLink>
          </div>
          {theatreToken && <><NavLink className={'font-normal tracking-widest hidden lg:block'}>Movies</NavLink>
          <NavLink className={'font-normal tracking-widest hidden lg:block'}>Screens</NavLink></>}
        </div>
        
        <div className='w-[45%] sm:w-[50%] flex justify-end items-center gap-6 md:gap-14 pr-12 lg:pr-20 xl:pr-26 2xl:pr-30'>
  
            { theatreToken ? 
            <>
            <FaSearch className='text-white w-[1.7rem] h-[1.7rem] hidden lg:block ' />
            <FaUserCircle onClick={handleProfile} className='text-white w-[1.7rem] h-[1.7rem] hidden lg:block ' /></>:
             <>
             <NavLink to={'/theatre/login'} className='text-white w-[1.7rem] h-[1.7rem] hidden lg:block '>LOGIN</NavLink>
             <NavLink to={'/theatre/signup'} className='text-white w-[1.7rem] h-[1.7rem] hidden lg:block '>REGISTER</NavLink>
             </>}
            <RxHamburgerMenu onClick={()=>setIsOpen(true)} className='text-white w-[1.7rem] h-[1.7rem] block opacity-100 lg:hidden lg:opacity-0 transition-all duration-500 ease-in-out' />
        </div>
        
      </div>  
      <TheatreNavModal isOpen={isOpen} set={setIsOpen} />
      </>
    )
}

export default TheatreNavbar
