import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { logoutAdmin } from '../../../features/admin/adminSlice';
import { adminLogout } from '../../../features/admin/adminActions';

function Profile() {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [mobile,setMobile] = useState('');
    const [hide,setHide] = useState(true);

    const dispatch = useDispatch();
    const {adminData,adminToken} = useSelector(state=>state.admin);
    const navigate = useNavigate();

    useEffect(()=>{
        if(!adminToken){
            navigate('/admin/login')
        }
        if(adminData){
            setName(adminData.name);
            setEmail(adminData.email);
            setMobile(adminData.mobile);
        }
    },[adminToken,adminData])

    const handleLogout = ()=>{
        dispatch(logoutAdmin());
        dispatch(adminLogout(adminToken))
    }
    const changePassword = ()=>{

    }
    const handleEdit = ()=>{

    }
  return (
    <div className='pt-28 lg:pl-56 min-h-[100vh] flex flex-col items-center justify-center bg-[#15121B]'>
      <div className='p-12  w-[100%] md:w-[80%] lg:w-[90%]'>
        <h2 className='text-white font-semibold text-center text-2xl sm:text-4xl'>Admin Profile</h2>
        <div className='my-10 border-2 border-[#F6AE2D] rounded-md bg-black py-10 px-6 sm:px-16'>
              <div className="w-[100%] ">
                  <label className='text-white text-xs '>Name</label>
                  <input type="text" value={name} onChange={(e)=>{setName(e.target.value);setHide(false)}} className='w-[100%] p-3 border-2 text-sm rounded-md  border-[#f6ae2d] bg-black text-white'/>
              </div>
              <div className="w-[100%] ">
                  <label className='text-white text-xs '>Email</label>
                  <input type="text" value={email} onChange={(e)=>{setEmail(e.target.value);setHide(false)}} className='w-[100%] p-3 border-2 text-sm rounded-md  border-[#f6ae2d] bg-black text-white'/>
              </div>
              <div className="w-[100%] ">
                  <label className='text-white text-xs '>Mobile</label>
                  <input type="text" value={mobile} onChange={(e)=>{setMobile(e.target.value);setHide(false)}} className='w-[100%] p-3 border-2 text-sm rounded-md  border-[#f6ae2d] bg-black text-white'/>
              </div>
          <div className='flex flex-col lg:flex-row justify-around'>
              <button onClick={changePassword} className='text-sm sm:text-md border-2 border-[#f6ae2d] bg-[#F6AE2D] px-4 sm:px-12 py-2 rounded-sm font-semibold tracking-widest my-5 hover:bg-[black] hover:text-white transition-all duration-150 ease-in-out'>Change Password</button>
              <button onClick={handleLogout} className='text-sm sm:text-md border-2 border-[#f6ae2d] bg-[#F6AE2D] px-4 sm:px-12 py-2 rounded-sm font-semibold tracking-widest my-5 hover:bg-[black] hover:text-white transition-all duration-150 ease-in-out'>LOGOUT</button>            
          </div>
          <div className='flex flex-col lg:flex-row justify-around'>
          <button onClick={handleEdit} className={hide ?'hidden opacity-0' : 'opacity-1 border-2 border-[#f6ae2d] bg-[#F6AE2D] px-4 sm:px-12 py-2 rounded-sm font-semibold tracking-widest my-5 hover:bg-[black] hover:text-white transition-all duration-150 ease-in-out'}>EDIT</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
