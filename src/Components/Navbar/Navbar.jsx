import React, { useState } from 'react'
import logo from '../../assets/logo.png'
import { NavLink, useNavigate } from 'react-router-dom'
import { FaSearch , FaUserCircle, FaChevronRight  } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import NavModal from './NavModal';

function Navbar() {
  const [isOpen,setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [bgChange,setBgChange] = useState(false)

  const handleProfile = ()=>{
    navigate('/profile')
  }
  const handleScroll = ()=>{
    if(window.scrollY > 10){
      setBgChange(true)
    }else{
      setBgChange(false)
    }
  }
  window.addEventListener('scroll',handleScroll)

  return (
    <>
    <div className={bgChange ? 'flex justify-between h-[6rem] items-center bg-black fixed z-20 w-[100vw] transition-all duration-300 ease-in-out' :'flex justify-between h-[6rem] items-center bg-gradient-to-b from-black fixed z-20 w-[100vw] transition-all duration-300 ease-in-out'}>

      <div className='w-[50%] min-[480]:w-[45%] h-[100%] sm:w-[50%] flex items-center gap-14 pl-5 text-white'>
        <div className='h-[100%] w-[100%] sm:w-[40%] md:w-[35%] flex items-center'>
          <img src={logo} alt="" />
        </div>
        <NavLink className={'font-normal tracking-widest hidden lg:block'}>Movies</NavLink>
        <NavLink className={'font-normal tracking-widest hidden lg:block'}>Screens</NavLink>
      </div>
      
      <div className='w-[45%] sm:w-[50%] flex justify-end items-center gap-6 md:gap-14 pr-12'>
          <select className='hidden sm:block border rounded-full text-sm sm:text-md px-2 sm:px-5 py-2 font-medium  '>
            <option value="" key="">Choose City</option>
            <option value="">Kochi</option>
          </select>
          <FaSearch className='text-white w-[1.5rem] h-[1.5rem]'  />
          <FaUserCircle onClick={handleProfile} className='text-white w-[1.7rem] h-[1.7rem] hidden lg:block ' />
          <RxHamburgerMenu onClick={()=>setIsOpen(true)} className='text-white w-[1.7rem] h-[1.7rem] block opacity-100 lg:hidden lg:opacity-0 transition-all duration-500 ease-in-out' />
      </div>
      
    </div>  
    <div className='fixed z-10 mt-20 bg-black w-[100%]  text-[#F6AE2D] px-5 py-2 block sm:hidden'>
        <button className='flex items-center'>
          Choose City <FaChevronRight/>
        </button>
    </div>
    <NavModal isOpen={isOpen} set={setIsOpen} />
    </>
  )
}

export default Navbar
