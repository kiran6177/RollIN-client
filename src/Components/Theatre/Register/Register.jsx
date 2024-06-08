import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Toaster, toast } from 'sonner';
import { resetTheatreActions, theatreGoogleAuth, theatreSignup } from '../../../features/theatre/theatreSlice';
import { useNavigate } from 'react-router';
import { ScaleLoader } from 'react-spinners';
import { FcGoogle } from 'react-icons/fc';
import { useGoogleLogin } from '@react-oauth/google';

function Register() {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const [nameError,setNameError] = useState('');
    const [emailError,setEmailError] = useState('');
    const [passwordError,setPasswordError] = useState('');

    const dispatch = useDispatch();
    const {success,error,loading} = useSelector(state=>state.theatre);
    const navigate = useNavigate();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    useEffect(()=>{
        if(success){
            navigate('/theatre/otpverification',{replace:true});
            dispatch(resetTheatreActions())
            return
        }
        if(error){
            error.map(err=>{
                toast.error(err)
            })
            return
        }
    },[success,error])

    const handleRegister = (e)=>{
        e.preventDefault();
        console.log(name,email,password);
        if(name.trim() === '' && email.trim() === ''  && password.trim() === ''){
            toast.error('Please fill the fields.');
        }else if(name.trim() === ''){
            toast.error('Enter a valid Name.');
        }else if(email.trim() === '' ){
            toast.error('Enter a valid Email.');
        }else if(!emailRegex.test(email)){
            toast.error('Invalid Email Format!');
        }else if(password.trim() === ''){
            toast.error('Enter a valid Password.');
        }else if(!passwordRegex.test(password)){
            toast.error('Password should contain alphabets and digits.');
        }else{
            dispatch(theatreSignup({name,email,password}))
        }
    }
    const handleGoogleAuth = useGoogleLogin({
        onSuccess: (tokenResponse) =>{
          dispatch(theatreGoogleAuth(tokenResponse))
        }
    })

  return (
    <div className='min-h-[100vh] relative flex justify-center items-center pt-32 pb-12 h-auto login-bg'>
        <div className='bg-[#15121B] top-0 absolute h-[100%] w-[100%]'></div>
        <Toaster richColors />
      <form onSubmit={handleRegister} className='flex flex-col items-center  gap-6 border-2 border-[#F6AE2D] rounded-md bg-black backdrop-blur-sm w-[80%] md:w-[69%] lg:w-[55%] xl:w-[45%] 2xl:w-[35%] py-12'>
            <h3 className='font-semibold text-white tracking-widest'>THEATRE REGISTER</h3>
            <div className="w-[80%] md:w-[70%]">
                <label className='text-white text-xs tracking-widest'>Name</label>
                <input type="text" value={name} onChange={(e)=>{
                    setName(e.target.value);
                    if(e.target.value.trim() === ''){
                        setNameError('Enter a valid Name.');
                    }else{
                        setNameError('')
                    }
                    }} className='w-[100%] my-2 p-2 border-2 rounded-md bg-black text-white border-[#f6ae2d]'/>
                {nameError && <p className='text-[#ef4b4b] text-xs font-extralight tracking-wider'>{nameError}</p>}
            </div>
            <div className="w-[80%] md:w-[70%]">
                <label className='text-white text-xs tracking-widest'>Email</label>
                <input type="text" value={email} onChange={(e)=>{
                    setEmail(e.target.value);
                    if(e.target.value.trim() === '' ){
                        setEmailError('Enter a valid Email.');
                    }else if(!emailRegex.test(e.target.value)){
                        setEmailError('Invalid Email Format!');
                    }else{
                        setEmailError('')
                    }
                    }} className='w-[100%] my-2 p-2 border-2 rounded-md bg-black text-white border-[#f6ae2d]'/>
                {emailError && <p className='text-[#ef4b4b] text-xs font-extralight tracking-wider'>{emailError}</p>}
            </div>
            <div className="w-[80%] md:w-[70%]">
                <label className='text-white text-xs tracking-widest'>Password</label>
                <input type="password" value={password} onChange={(e)=>{
                    setPassword(e.target.value);
                    if(e.target.value.trim() === ''){
                        setPasswordError('Enter a valid Password.');
                    }else if(!passwordRegex.test(e.target.value)){
                        setPasswordError('Password should contain alphabets and digits.');
                    }else{
                        setPasswordError('')
                    }
                    }} className='w-[100%] my-2 p-2 border-2 rounded-md bg-black text-white border-[#f6ae2d]'/>
                {passwordError && <p className='text-[#ef4b4b] text-xs font-extralight tracking-wider'>{passwordError}</p>}
            </div>
            <button type='submit' disabled={loading} className={loading? 'bg-[#cd952e] text-black border-2 border-black rounded-md px-6 md:px-14 py-2 flex justify-center gap-5 w-[80%] md:w-[70%] font-semibold text-lg tracking-widest' :'bg-[#F6AE2D] text-black border-2 border-black rounded-md px-6 md:px-14 py-2 flex justify-center gap-5 w-[80%] md:w-[70%] font-semibold text-lg tracking-widest'}>
                REGISTER 
            </button>
            <button type='button' onClick={handleGoogleAuth} className='bg-white border-2 border-black rounded-md px-6 md:px-14 py-2 flex items-center gap-5 w-[80%] md:w-[70%] font-medium text-sm md:text-lg'>
                <FcGoogle className='w-[1.5rem] h-[1.5rem]'/>
                Continue With Google
            </button>
            <ScaleLoader loading={loading} color='#f6ae2d' height={20} />
      </form>
    </div>

  )
}

export default Register
