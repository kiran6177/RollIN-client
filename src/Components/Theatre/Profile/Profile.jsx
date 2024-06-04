import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Toaster } from 'sonner';
import { logoutTheatre, theatreLogout } from '../../../features/theatre/theatreSlice';

function Profile() {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [hide,setHide] = useState(true);

    const {theatreToken,theatreData} = useSelector(state=>state.theatre);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        if(!theatreToken){
            navigate('/theatre/login',{replace:true})
            return
        }
        if(!theatreData?.isVerified || theatreData?.isBlocked){
            navigate('/theatre/login',{replace:true})
            return
        } 
    },[theatreToken,theatreData])

    const handleProfile = (e)=>{
        e.preventDefault();
        console.log(name,email,password);
    }

    const handleLogout = ()=>{
        dispatch(theatreLogout(theatreToken))
        dispatch(logoutTheatre())
    }

  return (
    <div className='min-h-[100vh] relative flex justify-center items-center pt-32 pb-12 h-auto login-bg'>
        <div className='bg-[#15121B] top-0 absolute h-[100%] w-[100%]'></div>
        <Toaster richColors />
      <div  className='flex flex-col items-center  gap-6 border-2 border-[#F6AE2D] rounded-md bg-black backdrop-blur-sm w-[80%] md:w-[69%] lg:w-[62%] xl:w-[55%] 2xl:w-[45%] py-12'>
            <div className='w-[90%] flex flex-col sm:flex-row items-center justify-between'>
                <h3 className='font-semibold text-white tracking-widest'>YOUR PROFILE</h3>
              <button onClick={handleLogout} className='text-xs sm:text-sm border-2 border-[#f6ae2d] bg-[#F6AE2D] px-4 sm:px-8 py-1 rounded-sm font-semibold tracking-widest my-5 hover:bg-[black] hover:text-white transition-all duration-150 ease-in-out'>LOGOUT</button>            
            </div>
            <div className="w-[90%] md:w-[85%]">
                <label className='text-white text-xs tracking-widest'>Theatre Name</label>
                <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className='w-[100%] my-2 p-2 border-2 rounded-md bg-black text-white border-[#f6ae2d]'/>
            </div>
            <div className="w-[90%] md:w-[85%]">
                <label className='text-white text-xs tracking-widest'>Email</label>
                <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} className='w-[100%] my-2 p-2 border-2 rounded-md bg-black text-white border-[#f6ae2d]'/>
            </div>
            <div className="w-[90%] flex flex-col sm:flex-row items-center justify-between md:w-[85%]">
                <div className='w-[100%] sm:w-[70%]'>
                    <label className='text-white text-xs tracking-widest'>Location</label>
                    <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className='w-[100%] my-2 p-2 border-2 rounded-md bg-black text-white border-[#f6ae2d]'/>
                </div>
                <button className='bg-[#f6ae2d] w-[100%] font-medium tracking-wider sm:tracking-normal sm:font-normal sm:w-[25%] mt-5 text-xs py-2 rounded-md px-3'>CHANGE LOCATION</button>
            </div>
            <h5 className='text-start w-[90%] font-semibold text-[#f6ae2d] tracking-widest'>ADDRESS</h5>
            <div className="w-[90%] md:w-[85%]">
                <label className='text-white text-xs tracking-widest'>Street</label>
                <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} className='w-[100%] my-2 p-2 border-2 rounded-md bg-black text-white border-[#f6ae2d]'/>
            </div>
            <div className="w-[90%] md:w-[85%]">
                <label className='text-white text-xs tracking-widest'>Landmark</label>
                <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} className='w-[100%] my-2 p-2 border-2 rounded-md bg-black text-white border-[#f6ae2d]'/>
            </div>
            <div className="w-[90%] md:w-[85%]">
                <label className='text-white text-xs tracking-widest'>City</label>
                <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} className='w-[100%] my-2 p-2 border-2 rounded-md bg-black text-white border-[#f6ae2d]'/>
            </div>
            <div className="w-[90%] md:w-[85%]">
                <label className='text-white text-xs tracking-widest'>State</label>
                <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} className='w-[100%] my-2 p-2 border-2 rounded-md bg-black text-white border-[#f6ae2d]'/>
            </div>
            <div className="w-[90%] md:w-[85%]">
                <label className='text-white text-xs tracking-widest'>Pincode</label>
                <input type="number" value={email} onChange={(e)=>setEmail(e.target.value)} className='w-[100%] my-2 p-2 border-2 rounded-md bg-black text-white border-[#f6ae2d]'/>
            </div>
            {hide || <button type='submit' onClick={handleProfile} className='bg-[#F6AE2D] text-black border-2 border-black rounded-md px-6 md:px-14 py-2 flex justify-center gap-5 w-[90%] md:w-[85%] font-semibold text-lg tracking-widest'>
                UPDATE 
            </button>}
      </div>
    </div>

  )
}

export default Profile
