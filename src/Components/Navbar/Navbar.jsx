import React, { lazy, Suspense,  useEffect, useState } from 'react'
import logo from '../../assets/logo.png'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { FaSearch , FaUserCircle  } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { FiChevronDown } from "react-icons/fi";
import NavModal from './NavModal';
import SelectCity from './SelectCity';
import { useDispatch, useSelector } from 'react-redux';
import { useSocket } from '../../hooks/socket';
import { updateUnread } from '../../features/user/userSlice';
import { AnimatePresence } from 'framer-motion';
import LoadingProgress from '../Loaders/LoadingProgress';
const SearchModal =  lazy(()=>import('./SearchModal'));
const NotificationToast = lazy(()=>import('../Notifications/NotificationToast'));

function Navbar({hide}) {
  const [isOpen,setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [bgChange,setBgChange] = useState(false)

  const [showSelectCity,setShowSelectCity] = useState(false);
  const [showSearch,setShowSearch] = useState(false); 
  const {unread} = useSelector(state=>state.user)

  const [showNotification,setShowNotification] = useState(false);
  const [isLoading,setIsLoading] = useState(false);

  const dispatch = useDispatch()
  const socket = useSocket();
  const {key} = useLocation();

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
    if(isLoading){
      setBgChange(true)
    }else{
      setBgChange(false)
    }
  },[isLoading])

  useEffect(()=>{
    console.log("loading....");
    setIsLoading(true);
    
  },[key])

  useEffect(()=>{
    if(!localStorage.getItem("city")){
      setShowSelectCity(true)
    }
  },[])

  useEffect(()=>{
    const handleNewNotification = (notification)=>{
      console.log("NEW",notification);
      dispatch(updateUnread(notification))
      setShowNotification(notification);
      setTimeout(()=>{
        setShowNotification(false)
      },6000)
    }
    socket?.on('new-notifications',handleNewNotification)

    return ()=>{
      socket?.off('new-notifications',handleNewNotification)
    }
  },[socket])

  window.addEventListener('scroll',handleScroll)

  return (
    <>
    <div className={bgChange || hide ? 'flex justify-between h-[6rem] items-center bg-black fixed z-20 w-[100vw] transition-all duration-300 ease-in-out ' :'flex justify-between h-[6rem] items-center bg-gradient-to-b from-black fixed z-20 w-[100vw] transition-all duration-300 ease-in-out'}>

      <div className='w-[50%] min-[480]:w-[45%] h-[100%] sm:w-[50%] flex items-center gap-14 pl-5 text-white'>
        <div className='h-[100%] w-[100%] sm:w-[40%] md:w-[35%] flex items-center'>
          <img onClick={()=>navigate('/')} src={logo} alt="" className='cursor-pointer' />
        </div>
        <NavLink to={'/movies'} className={'font-normal tracking-widest hidden lg:block'}>Movies</NavLink>
        <NavLink to={'/screens'} className={'font-normal tracking-widest hidden lg:block'}>Screens</NavLink>
      </div>
      
      <div className='w-[45%] sm:w-[50%] flex justify-end items-center gap-6 md:gap-14 pr-5 md:pr-12'>
          <button onClick={()=>setShowSelectCity(true)} className='hidden sm:flex border items-center gap-2 rounded-full text-sm sm:text-md px-2 sm:px-5 py-2 font-medium  bg-white'>
            {localStorage.getItem("city") ? JSON.parse(localStorage.getItem('city'))?.name?.split(',')[0] :'Choose City' }<FiChevronDown/>
          </button>
          <FaSearch onClick={()=>setShowSearch(true)} className='text-white w-[1.5rem] h-[1.5rem]'  />
          <div className='relative'>
          <FaUserCircle onClick={handleProfile} className='text-white w-[1.7rem] h-[1.7rem] hidden lg:block ' />
          {unread && <p className='bg-red-500 absolute -top-2 -right-2 w-[1.4rem] h-[1.4rem] rounded-full text-white font-semibold flex items-center justify-center text-xs p-2'>{unread?.length}</p>}
          <RxHamburgerMenu onClick={()=>setIsOpen(true)} className='text-white w-[1.7rem] h-[1.7rem] block opacity-100 lg:hidden lg:opacity-0 transition-all duration-500 ease-in-out' />
          </div>
      </div>
      <button onClick={()=>setShowSelectCity(true)} className='flex sm:hidden items-center gap-1 absolute bottom-[6px] tracking-wide left-8 text-white text-xs'>
        <IoLocationSharp/>{localStorage.getItem("city") ? JSON.parse(localStorage.getItem('city'))?.name?.split(',')[0] :'Choose City' }
        </button>
    </div>  
        
    {isLoading && <LoadingProgress setIsLoading={setIsLoading} />}
    <Suspense >
      <SearchModal isOpen={showSearch} set={setShowSearch} />
    </Suspense>
    <NavModal isOpen={isOpen} set={setIsOpen} />
    <SelectCity isOpen={showSelectCity} set={setShowSelectCity} />
    <AnimatePresence>    {showNotification && <Suspense><NotificationToast notification={showNotification} /></Suspense>} </AnimatePresence>
    </>
  )
}

export default Navbar
