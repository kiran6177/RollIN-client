import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Toaster, toast } from 'sonner';
import { resetAdminActions } from '../../../features/admin/adminSlice';
import MovieCard from '../Movies/MovieCard';

function Home() {
    const {adminData,adminToken,message} = useSelector(state=>state.admin);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
      if(!adminToken){
        navigate('/admin/login',{replace:true})
        return
      }
      if(message){
        toast.success(message);
        dispatch(resetAdminActions());
        return
      }
    },[adminToken,message])

  return (
    <div className='pt-28 lg:pl-56 min-h-[100vh] bg-[#15121B]'>
      <Toaster richColors />
      <div className='p-12'>
      <h2 className='text-white font-semibold text-4xl'>Welcome {adminData && adminData.name}</h2>
      </div>
    </div>
  )
}

export default Home
