import React, {  lazy, Suspense, useEffect, useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import { TfiEmail } from "react-icons/tfi";
import { useDispatch, useSelector } from 'react-redux';
import { useGoogleLogin } from '@react-oauth/google'
import {  resetActions } from '../../../features/user/userSlice';
import { useLocation, useNavigate } from 'react-router';
import { Toaster ,toast } from 'sonner'
import { googleAuth } from '../../../features/user/userActions';
import LoadingSpinner from '../../Loaders/LoadingSpinner';
const EmailModal = lazy(()=>import('./EmailModal')) ;

function Login() {
  const [showMail,setShowMail] = useState(false);
  const dispatch = useDispatch();
  const {userData,userToken,message,error} = useSelector(state=>state.user);
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(()=>{
      if(error){
        if(error.length > 0){
          error.map(err=>{
            toast.error(err)
          })
        }
        dispatch(resetActions())
        return
      }
      if(userToken){
        if(location.state?.redirectURL){
          navigate(location.state.redirectURL)
        }else{
          navigate('/')
        }
        return
      }
      if(message && message == 'Logout Successfully.'){
        toast.success(message)
        dispatch(resetActions())
        return
      }
    },[userToken,message,error])

  const handleGoogleAuth = useGoogleLogin({
        onSuccess: (tokenResponse) => {
          dispatch(googleAuth(tokenResponse))
        }
      })
  
  const handleEmailAuth = ()=>{
    setShowMail(true)
  }

  return (
    <>
    <div className='min-h-[90vh] relative flex justify-center items-center pt-32 pb-12 h-auto login-bg'>
        <div className='bg-[#15121B] top-0 absolute h-[100%] w-[100%]'></div>
        <Toaster richColors />
      <div className='flex flex-col items-center  gap-5 border-2 border-[#F6AE2D] rounded-md bg-black backdrop-blur-sm w-[80%] md:w-[69%] lg:w-[55%] xl:w-[45%] 2xl:w-[35%] py-12'>
            <h3 className='font-semibold text-white tracking-widest'>Get Started</h3>
            <button onClick={handleGoogleAuth} type='button' className='bg-white border-2 border-black rounded-md px-6 md:px-14 py-2 flex items-center justify-between md:justify-normal md:gap-5 w-[80%] md:w-[70%] font-medium text-sm md:text-lg'>
                <FcGoogle className='w-[1.5rem] h-[1.5rem]'/>
                Continue With Google
            </button>
            <button type='button' onClick={handleEmailAuth} className='bg-white border-2 border-black rounded-md px-6 md:px-14 py-2 flex items-center justify-between md:justify-normal md:gap-5 w-[80%] md:w-[70%] font-medium text-sm md:text-lg'>
                <TfiEmail className='w-[1.5rem] h-[1.5rem]'/>
                Continue With Email
            </button>
            <p className='text-white'>OR</p>
            <div className="w-[80%] md:w-[70%]">
                <label className='text-white text-xs'>Enter Mobile Number</label>
                <input type="text" className='w-[100%] py-2 px-2 border-2 rounded-md'/>
            </div>
            <button className='bg-[#F6AE2D] text-black border-2 border-black rounded-md px-6 md:px-14 py-2 flex justify-center gap-5 w-[80%] md:w-[70%] font-medium text-lg'>
                Continue 
            </button>
      </div>
    </div>
    {showMail && 
      <Suspense fallback={<LoadingSpinner/>}>
        <EmailModal showMail={showMail} set={setShowMail} />
      </Suspense>
      }
    </>
  )
}

export default Login
