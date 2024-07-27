import React, { lazy, Suspense, useEffect, useState } from 'react'
import logo from '../../assets/logo.png'
import { NavLink, useNavigate } from 'react-router-dom'
import { FaSearch , FaUserCircle, FaChevronRight  } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { FiChevronDown } from "react-icons/fi";
import NavModal from './NavModal';
import SelectCity from './SelectCity';
import { useDispatch } from 'react-redux';
import { userGetBannerMovies } from '../../features/userMovies/userMovieActions';
const SearchModal =  lazy(()=>import('./SearchModal'));

function Navbar({hide}) {
  const [isOpen,setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [bgChange,setBgChange] = useState(false)

  const [showSelectCity,setShowSelectCity] = useState(false);
  const [showSearch,setShowSearch] = useState(false);

  const dispatch = useDispatch()

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

  useEffect(()=>{
    if(!localStorage.getItem("city")){
      setShowSelectCity(true)
    }
  },[])

  window.addEventListener('scroll',handleScroll)

  return (
    <>
    <div className={bgChange || hide ? 'flex justify-between h-[6rem] items-center bg-black fixed z-20 w-[100vw] transition-all duration-300 ease-in-out' :'flex justify-between h-[6rem] items-center bg-gradient-to-b from-black fixed z-20 w-[100vw] transition-all duration-300 ease-in-out'}>

      <div className='w-[50%] min-[480]:w-[45%] h-[100%] sm:w-[50%] flex items-center gap-14 pl-5 text-white'>
        <div className='h-[100%] w-[100%] sm:w-[40%] md:w-[35%] flex items-center'>
          <img onClick={()=>navigate('/')} src={logo} alt="" className='cursor-pointer' />
        </div>
        <NavLink to={'/movies'} className={'font-normal tracking-widest hidden lg:block'}>Movies</NavLink>
        <NavLink to={'/screens'} className={'font-normal tracking-widest hidden lg:block'}>Screens</NavLink>
      </div>
      
      <div className='w-[45%] sm:w-[50%] flex justify-end items-center gap-6 md:gap-14 pr-12'>
          <button onClick={()=>setShowSelectCity(true)} className='hidden sm:flex border items-center gap-2 rounded-full text-sm sm:text-md px-2 sm:px-5 py-2 font-medium  bg-white'>
            {localStorage.getItem("city") ? JSON.parse(localStorage.getItem('city'))?.name?.split(',')[0] :'Choose City' }<FiChevronDown/>
          </button>
          <FaSearch onClick={()=>setShowSearch(true)} className='text-white w-[1.5rem] h-[1.5rem]'  />
          <FaUserCircle onClick={handleProfile} className='text-white w-[1.7rem] h-[1.7rem] hidden lg:block ' />
          <RxHamburgerMenu onClick={()=>setIsOpen(true)} className='text-white w-[1.7rem] h-[1.7rem] block opacity-100 lg:hidden lg:opacity-0 transition-all duration-500 ease-in-out' />
      </div>
      
    </div>  
    <div className='fixed z-10 mt-24 bg-black w-[100%]  text-[#F6AE2D] px-5 py-2 block sm:hidden'>
        <button  className='flex items-center'>
          Choose City <FaChevronRight/>
        </button>
    </div>
    <Suspense>
      <SearchModal isOpen={showSearch} set={setShowSearch} />
    </Suspense>
    <NavModal isOpen={isOpen} set={setIsOpen} />
    <SelectCity isOpen={showSelectCity} set={setShowSelectCity} />
    </>
  )
}

export default Navbar
