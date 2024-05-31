import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Toaster, toast } from 'sonner'
import { adminLogin } from '../../../features/admin/adminSlice';
import { useNavigate } from 'react-router';

function Login() {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    const [validateError,setValidateError] = useState('')

    const dispatch = useDispatch();
    const {adminToken} = useSelector(state=>state.admin);
    const navigate = useNavigate();

    useEffect(()=>{
        if(adminToken){
            navigate('/admin',{replace:true})
            return
        }
    },[adminToken])


    const handleAdminLogin = (e)=>{

        e.preventDefault()
        if(email.trim() == '' || password.trim() == ''){
            toast.error('Please fill all the fields.')
        }else if(!emailRegex.test(email)){
            toast.error('Email is Invalid!!')
        }else if(!passwordRegex.test(password)){
            toast.error('Password is Invalid!!')
        }else{
            dispatch(adminLogin({email,password}))
        }
    }

  return (
    <div className='min-h-[100vh] relative flex justify-center items-center pt-32 pb-12 h-auto login-bg'>
        <Toaster richColors />
      <form onSubmit={handleAdminLogin} className='flex flex-col items-center z-10  gap-5 border-2 border-[#F6AE2D] rounded-md bg-black backdrop-blur-sm w-[80%] md:w-[69%] lg:w-[55%] xl:w-[45%] 2xl:w-[35%] py-12'>
            <h3 className='font-semibold text-white tracking-widest text-xl'>ADMIN LOGIN</h3>
            
            <div className="w-[80%] md:w-[70%]">
                <label className='text-white text-xs '>Email</label>
                <input type="text" value={email} onChange={(e)=>{
                        setEmail(e.target.value); 
                        if(!emailRegex.test(email)){
                            toast.error('Email is Invalid!!')
                        }}}
                className='w-[100%] p-3 border-2 text-sm rounded-md  border-[#f6ae2d] bg-black text-white'/>
            </div>
            <div className="w-[80%] md:w-[70%]">
                <label className='text-white text-xs '>Password</label>
                <input type="password" value={password} onChange={(e)=>{
                    setPassword(e.target.value);
                    if(!passwordRegex.test(password)){
                        toast.error('Password is Invalid!!')
                    }
                    }} className='w-[100%] p-3 border-2 text-sm rounded-md border-[#f6ae2d] bg-black text-white'/>
            </div>
            {validateError && <p></p>}
            <button type='submit' className='bg-[#F6AE2D] text-black border-2 tracking-widest border-black rounded-md px-6 md:px-14 py-2 flex justify-center gap-5 w-[80%] md:w-[70%] font-medium text-lg'>
                LOGIN 
            </button>
      </form>
      <div className='bg-[#15121B] top-0 absolute h-[100%] w-[100%]'></div>
    </div>
  )
}

export default Login
