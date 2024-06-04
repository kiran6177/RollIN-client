import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { ScaleLoader } from 'react-spinners';
import { Toaster, toast } from 'sonner';
import { resetTheatreActions, theatreLoginOtpVerify, theatreRegisterOtpVerify, theatreResendOtp } from '../../../features/theatre/theatreSlice';

function Otp() {
    const [one,setOne] = useState('');
    const [two,setTwo] = useState('');
    const [three,setThree] = useState('');
    const [four,setFour] = useState('');
    const [five,setFive] = useState('');
    const [six,setSix] = useState('');

    const [enable,setEnable] = useState(true);

    const oneRef = useRef();
    const twoRef = useRef();
    const threeRef = useRef();
    const fourRef = useRef();
    const fiveRef = useRef();
    const sixRef = useRef();


    const {theatreData,theatreToken, loading ,error ,message ,success} = useSelector(state=>state.theatre);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    useEffect(()=>{
        console.log("use");
        if(one && two && three && four && five && six){
            setEnable(false)
        }else{
            setEnable(true)
        }
        
        if(!theatreData && error && error[0] === 'Registration completed. You are under verfication.'){
            toast.success(error[0])
            setTimeout(()=>{
                navigate('/theatre/login',{replace:true})
                  localStorage.removeItem('otpTime')
                dispatch(resetTheatreActions())
            },1200)
            return
        }
        if(error && error.length){
            error.map(err=>{
                toast.error(err)
            })
            dispatch(resetTheatreActions())
            return
        }
        if(!theatreData){
            if(success){
                toast.success('Registered Successfully.')
                setTimeout(()=>{
                    navigate('/theatre/login',{replace:true})
                    localStorage.removeItem('otpTime')
                    dispatch(resetTheatreActions())
                },1200)
                return
            }else{
                navigate('/theatre/login',{replace:true})
                return
            }
        }
        if(theatreData?.isAccepted === true){
            navigate('/theatre/login',{replace:true})
            return
        }
        if(theatreToken){
            navigate('/theatre',{replace:true})
            return
        }
    },[one,two,three,four,five,six,theatreData,error])


    const [time,setTime] = useState(60);
    const [hide,setHide] = useState(false)

    useEffect(()=>{
        if(message=== 'OTP Resend Successfully.'){
            toast.success(message);
            localStorage.setItem('otpTime',60);
            setHide(false);
            dispatch(resetTheatreActions())
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
        console.log(theatreData.id);
        dispatch(theatreResendOtp({id:theatreData.id}))
    }

    const handleOTP = (e)=>{ 
        e.preventDefault();
        console.log(one,two,three,four,five,six);
        const otp = parseInt(one+two+three+four+five+six)
        if(theatreData.type === 'login'){
            console.log("log");
            dispatch(theatreLoginOtpVerify({id:theatreData.id,otp}))
        }else{
            console.log("reg");
            dispatch(theatreRegisterOtpVerify({id:theatreData.id,otp}))
        }
    }

  return (
<div className='min-h-[100vh] relative flex justify-center items-center pt-32 pb-12 h-auto login-bg'>
        <div className='bg-[#15121B] top-0 absolute h-[100%] w-[100%]'></div>
        <Toaster richColors />
      <form onSubmit={handleOTP} className='flex flex-col items-center justify-between sm:h-[25rem]  gap-6 border-2 border-[#F6AE2D] rounded-md bg-black backdrop-blur-sm w-[80%] md:w-[69%] lg:w-[55%] xl:w-[45%] 2xl:w-[35%] py-14'>
            <h3 className='font-semibold text-white text-lg sm:text-xl tracking-widest'>OTP VERIFICATION</h3>            
            <div className='text-white'>
                <h6>00 : {time < 10 ? `0${time}` : time}</h6>
            </div>
            <div className="w-[80%] md:w-[70%]">
                <label className='text-white text-xs tracking-widest'>Enter your OTP</label>
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
            
            <button type='submit'  disabled={enable} className={enable?' bg-[#a27728cc] text-black border-2 border-black rounded-md px-6 md:px-14 py-2 flex justify-center gap-5 w-[80%] md:w-[70%] font-semibold text-lg tracking-widest'  : 'bg-[#F6AE2D] text-black border-2 border-black rounded-md px-6 md:px-14 py-2 flex justify-center gap-5 w-[80%] md:w-[70%] font-semibold text-lg tracking-widest'}>
                VERIFY 
            </button>
            {hide && <p onClick={handleResend} className='text-[#f1b649] hover:text-[#f6ae2d] '>RESEND OTP</p>}
            <ScaleLoader loading={loading} height={20} color='#f6ae2d' />
      </form>
    </div>

  )
}

export default Otp
