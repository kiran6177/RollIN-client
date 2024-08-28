import React, { Suspense, lazy, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { IoIosClose } from 'react-icons/io'
import ModalSkelton from './ModalSkelton';
import { useDispatch, useSelector } from 'react-redux';
import { resetActions } from '../../../features/user/userSlice';
import { Toaster, toast } from 'sonner';
import { ScaleLoader } from 'react-spinners';
import { useNavigate } from 'react-router';
import { userEmailLogin } from '../../../features/user/userActions';
const OtpModal = lazy(()=>import('./OtpModal'));

function EmailModal({showMail,set}) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const [showOtp,setShowOTP] = useState(false);
    const [email,setEmail] = useState('')
    const [emailError,setEmailError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {userData,loading} = useSelector(state=>state.user)

    useEffect(()=>{
        if(userData?.id){
            setShowOTP(true)
            dispatch(resetActions())
            return
        }

    },[userData])

    const handleEmailSubmit = ()=>{
        console.log(email);
        if(email.trim() === '' ){
            toast.error('Enter a valid Email.');
        }else if(!emailRegex.test(email)){
            toast.error('Invalid Email Format!');
        }else{
            dispatch(userEmailLogin(email))
        }
    }
  return createPortal(
        <div className='w-[100%] h-[100vh] fixed top-0 pt-26 flex items-center justify-center bg-[#00000091]'>
            <Toaster richColors />
            {
            showMail ?
            showOtp ?
                <Suspense fallback={<ModalSkelton/>}>
                   <OtpModal set={set} setShow={setShowOTP} />
               </Suspense>    
            :
            <div className='bg-black text-white w-[85%] md:w-[65%] lg:w-[35%] border-2 border-[#f6ae2d] my-8 rounded-md p-8 flex flex-col items-center justify-between  fixed min-h-[65vh] md:min-h-[75vh] '>
            <IoIosClose onClick={()=>{set(false);setShowOTP(false)}} className="absolute cursor-pointer right-3 top-3 w-[2rem] h-[2rem]"/>
                <div className='w-[90%] flex flex-col gap-16'>
                  <h3 className='text-center tracking-wider text-xl'>LOGIN WITH EMAIL</h3>
                    <div className="w-[100%]">
                        <label className='text-white text-xs mb-2'>Enter your email</label>
                        <input type="text" value={email} onChange={(e)=>{
                            setEmail(e.target.value);
                            if(e.target.value.trim() === '' ){
                                setEmailError('Enter a valid Email.');
                            }else if(!emailRegex.test(e.target.value)){
                                setEmailError('Invalid Email Format!');
                            }else{
                                setEmailError('')
                            }
                            }} className=' my-3 w-[100%] py-2 border-2 border-[#f6ae2d] bg-black px-4 rounded-md'/>
                        {emailError && <p className='text-[#ef4b4b] text-xs font-extralight tracking-wider'>{emailError}</p>}
                    </div>
                </div>
                <button onClick={handleEmailSubmit} disabled={loading} className='bg-[#f6ae2d] w-[90%] text-black py-3 rounded-md tracking-widest font-semibold'>CONTINUE</button>
                <ScaleLoader loading={loading} height={20} color='#f6ae2d' />
            </div>
            :
            <></>
            }
        </div>
  ,document.getElementById("email-modal"))
}

export default EmailModal
