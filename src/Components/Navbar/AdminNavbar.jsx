import React, { lazy, Suspense, useState } from 'react'
import { RxHamburgerMenu } from 'react-icons/rx'
import logo from '../../assets/logo.png'
import { NavLink, useNavigate } from 'react-router-dom'
import { FaSearch, FaUserCircle } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import LoadingSpinner from '../Loaders/LoadingSpinner'
const AdminNavModal = lazy(()=>import('./AdminNavModal')) 

function AdminNavbar() {
  const [isOpen,setIsOpen] = useState(false);
  const {adminToken} = useSelector(state=>state.admin);
  const navigate = useNavigate();

  const handleProfile = ()=>{
    navigate('/admin/profile')
  }

  return (
    <>
    <div className='flex justify-between h-[6rem] items-center bg-black fixed z-20 w-[100vw]'>

      <div className='w-[50%] min-[480]:w-[45%] h-[100%] sm:w-[50%] flex items-center gap-14 pl-5 text-white'>
        <div className='h-[100%] w-[100%] sm:w-[40%] md:w-[35%] flex items-center'>
          <img src={logo} alt="" />
        </div>
        {/* <NavLink className={'font-normal tracking-widest hidden lg:block'}>Movies</NavLink>
        <NavLink className={'font-normal tracking-widest hidden lg:block'}>Screens</NavLink> */}
      </div>
      
      <div className='w-[45%] sm:w-[50%] flex justify-end items-center gap-6 md:gap-14 pr-12 lg:pr-20 xl:pr-28 2xl:pr-32'>

          { adminToken ? 
          <>
          <FaSearch className='text-white w-[1.7rem] h-[1.7rem] hidden lg:block ' />
          <FaUserCircle onClick={handleProfile} className='text-white w-[1.7rem] h-[1.7rem] hidden lg:block ' /></>:
           <NavLink to={'/admin/login'} className='text-white w-[1.7rem] h-[1.7rem] hidden lg:block '>LOGIN</NavLink>}
          <RxHamburgerMenu onClick={()=>setIsOpen(true)} className='text-white w-[1.7rem] h-[1.7rem] block opacity-100 lg:hidden lg:opacity-0 transition-all duration-500 ease-in-out' />
      </div>
      
    </div>  
      <Suspense fallback={<LoadingSpinner/>}>
        <AdminNavModal isOpen={isOpen} set={setIsOpen} />
      </Suspense>
    </>
  )
}

export default AdminNavbar
