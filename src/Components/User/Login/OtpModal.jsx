import React, { useEffect, useRef, useState } from 'react'
import { IoIosClose } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux';
import { resetActions } from '../../../features/user/userSlice';
import { ScaleLoader } from 'react-spinners';
import { Toaster, toast } from 'sonner';
import { userResendOtp, userVerifyOtp } from '../../../features/user/userActions';

function OtpModal({set,setShow}) {
    const [one,setOne] = useState('');
    const [two,setTwo] = useState('');
    const [three,setThree] = useState('');
    const [four,setFour] = useState('');
    const [five,setFive] = useState('');
    const [six,setSix] = useState('');

    const [enable,setEnable] = useState(true);

    const [time,setTime] = useState(60);
    const [hide,setHide] = useState(false)

    const oneRef = useRef();
    const twoRef = useRef();
    const threeRef = useRef();
    const fourRef = useRef();
    const fiveRef = useRef();
    const sixRef = useRef();

    const dispatch = useDispatch();
    const {userData,loading,error,message} = useSelector(state=>state.user);

    useEffect(()=>{
        if(one && two && three && four && five && six){
            setEnable(false)
        }else{
            setEnable(true)
        }
    },[one,two,three,four,five,six])


    useEffect(()=>{
        if(error){
            if(error.length > 0){
                error.map(err=>{
                    if(err === 'Ooops. OTP timed out!!'){
                        toast.error(err+" Login again.")
                        setShow(false)
                    }else{
                        toast.error(err)
                    }
                })
            }
            dispatch(resetActions())
            return
        }
    },[error])

    useEffect(()=>{
        if(message=== 'OTP Resend Successfully.'){
            toast.success(message);
            localStorage.setItem('otpTime',60);
            setHide(false);
            dispatch(resetActions())
            return
        }
        let inter;
        if(!hide){
            const storedTime = localStorage.getItem('otpTime');
            if(storedTime){
              setTime(parseInt(storedTime))
            }else{
              localStorage.setItem('otpTime',60);
            }
        
             inter = setInterval(()=>{
              setTime((prev)=>{
                if(prev > 0){
                  let newtime = prev - 1;
                  localStorage.setItem('otpTime',newtime)
                  return newtime
                }else{
                  clearInterval(inter)
                  // localStorage.removeItem('otpTime')
                  setHide(true)
                  return 0
                }
              })
            },1000)
            
      
        }

        return ()=>{
            clearInterval(inter)
            // localStorage.removeItem('otpTime')
        }
      
    },[hide,message])

    function focusAndValidate(setfn,nextRef,value){
        if(value.length === 0){
           setfn(value)
       }else if(value.length <= 1){
           setfn(value)
           nextRef.current.focus()
       }else{
           nextRef.current.focus()
       }
   }

   const handleResend = ()=>{
        dispatch(userResendOtp(userData.id))
   }

   const handleOtpSubmit = (e)=>{
    e.preventDefault()
    console.log(one,two,three,four,five,six);
    const otp = parseInt(one+two+three+four+five+six)
    dispatch(userVerifyOtp({id:userData?.id,otp}))
   }

  return (
    <form onSubmit={handleOtpSubmit} className='bg-black text-white w-[80%] sm:w-[65%] lg:w-[45%] xl:w-[35%] border-2 border-[#f6ae2d] rounded-md py-8 px-5 md:p-8 flex flex-col items-center justify-between  fixed min-h-[65vh] md:min-h-[75vh] '>
        <Toaster richColors />
        <IoIosClose onClick={()=>set(false)} className="absolute cursor-pointer right-3 top-3 w-[2rem] h-[2rem]"/>
            <div className='w-[90%] flex flex-col gap-16'>
              <h3 className='text-center tracking-wider text-xl'>LOGIN WITH EMAIL</h3>
              <div className='text-white'>
                <h6>00 : {time < 10 ? `0${time}` : time}</h6>
                </div>
              <div className='flex flex-col'>
                <label className='text-sm'>Enter your OTP</label>
                <div className='flex justify-between'>
                    <input type="text" ref={oneRef} value={one} onChange={(e)=>{
                        focusAndValidate(setOne,twoRef,e.target.value)
                    }} className='text-center   w-[15%] sm:w-[13%] my-2 p-1 sm:p-2 border-2 rounded-md bg-black text-white border-[#f6ae2d]'/>
                    <input type="text" ref={twoRef} value={two} onChange={(e)=>{
                        focusAndValidate(setTwo,threeRef,e.target.value)
                    }} className='text-center   w-[15%] sm:w-[13%] my-2 p-1 sm:p-2 border-2 rounded-md bg-black text-white border-[#f6ae2d]'/>
                    <input type="text" ref={threeRef} value={three} onChange={(e)=>{
                        focusAndValidate(setThree,fourRef,e.target.value)
                    }} className='text-center   w-[15%] sm:w-[13%] my-2 p-1 sm:p-2 border-2 rounded-md bg-black text-white border-[#f6ae2d]'/>
                    <input type="text" ref={fourRef} value={four} onChange={(e)=>{
                        focusAndValidate(setFour,fiveRef,e.target.value)
                    }} className='text-center   w-[15%] sm:w-[13%] my-2 p-1 sm:p-2 border-2 rounded-md bg-black text-white border-[#f6ae2d]'/>
                    <input type="text" ref={fiveRef} value={five} onChange={(e)=>{
                        focusAndValidate(setFive,sixRef,e.target.value)
                    }} className='text-center   w-[15%] sm:w-[13%] my-2 p-1 sm:p-2 border-2 rounded-md bg-black text-white border-[#f6ae2d]'/>
                    <input type="text" ref={sixRef} value={six} onChange={(e)=>{
                        if(e.target.value.length === 0){
                            setSix(e.target.value)
                        }else if(e.target.value.length <= 1){
                            setSix(e.target.value)
                            sixRef.current.blur()
                        }
                    }} className='text-center   w-[15%] sm:w-[13%] my-2 p-1 sm:p-2 border-2 rounded-md bg-black text-white border-[#f6ae2d]'/>
                    </div>
                </div>
            </div>
        <button disabled={enable} className={enable ? 'bg-[#f6b02dc6] w-[90%] text-black py-3 rounded-md tracking-widest font-semibold' :'bg-[#f6ae2d] w-[90%] text-black py-3 rounded-md tracking-widest font-semibold'}>CONTINUE</button>
        {hide && <p onClick={handleResend} className='text-[#f1b649] hover:text-[#f6ae2d] '>RESEND OTP</p>}
        <ScaleLoader loading={loading} height={20} color='#f6ae2d' />
    </form>
  )
}

export default OtpModal
