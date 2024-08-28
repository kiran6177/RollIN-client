import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Toaster } from 'sonner'
import {  resetAdminActions } from '../../../features/admin/adminSlice';
import { adminGetTheatres } from '../../../features/admin/adminActions';
import { useNavigate } from 'react-router';

function TheatreView() {

    const {adminToken,theatresData} = useSelector(state=>state.admin);
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
  
    useEffect(()=>{
      dispatch(adminGetTheatres(adminToken))
      dispatch(resetAdminActions())
    },[])

    const viewTheatre = (theatreId)=>{
        navigate(`/admin/theatres/${theatreId}`)
    }

  return (
    <div className='pt-28 lg:pl-56 min-h-[100vh] bg-[#15121B]'>
      <Toaster richColors />
      <div className='p-12'>
      <h2 className='text-white font-semibold text-4xl'>Theatres</h2>
      <table className='hidden lg:table border-collpase  border border-[#f6ae2d] rounded-md  w-[100%] bg-black text-white text-center my-10'>
        <thead className='border-collpase border border-[#f6ae2d] '>
          <tr key="main-head" className='h-[4rem] bg-[#f6ae2d] text-black '>
          <th className='border-collpase border border-[#f6ae2d] text-xs md:text-base font-semibold  w-[7%]' >S. No</th>
          <th className='border-collpase border border-[#f6ae2d] text-xs md:text-base font-semibold  w-[20%]' >Name</th>
          <th className='border-collpase border border-[#f6ae2d] text-xs md:text-base font-semibold  w-[22%]' >Email</th>
          <th className='border-collpase border border-[#f6ae2d] text-xs md:text-base font-semibold  w-[22%]' >Location</th>
          <th className='border-collpase border border-[#f6ae2d] text-xs md:text-base font-semibold  ' >Status</th>
          <th className='border-collpase border border-[#f6ae2d] text-xs md:text-base font-semibold  ' >Action</th>
          </tr>          
        </thead>
        <tbody>
          {
            (theatresData && theatresData.length > 0) ?
            theatresData.map((theatre,i)=>{
              return (
                <tr key={theatre.id} className='h-[8rem] xl:h-[4rem]'>
                    <td className='border-collpase border border-[#f6ae2d] text-xs md:text-base rounded-md ' >{i+1}</td>
                    <td className='border-collpase border border-[#f6ae2d] text-xs md:text-base rounded-md ' >{theatre.name}</td>
                    <td className='border-collpase border border-[#f6ae2d] text-xs md:text-base rounded-md ' >{theatre.email}</td>
                    <td className='border-collpase border border-[#f6ae2d]  rounded-md text-xs' >{theatre.address?.completeLocation}</td>
                    <td className='border-collpase border border-[#f6ae2d] text-xs md:text-base rounded-md ' >
                      <div className='flex flex-col gap-4 items-center xl:flex-row xl:justify-evenly '>
                        {
                          theatre.isVerified ?
                          <p className='bg-[#46ff46] text-black px-6 py-1 rounded-full font-medium'>Approved</p>
                          :
                          <p className='bg-[#fb5151] text-black px-6 py-1 rounded-full font-medium'>Pending</p>
                        }
                      </div>
                    </td>
                    <td className='border-collpase border border-[#f6ae2d] text-xs md:text-base rounded-md ' >
                      <div className='flex flex-col gap-4 items-center xl:flex-row xl:justify-evenly '>
                        <button onClick={()=>viewTheatre(theatre.id)} className='bg-[#f6ae2d] text-black px-6 py-2 rounded-sm font-medium'>View</button>
                      </div>
                    </td>
                </tr>
              )
            })
            :  <tr key={"emptymain"} className='h-[8rem] xl:h-[4rem]'><td className='border-collpase border border-[#f6ae2d] rounded-md ' colSpan={5}>NO THEATRES</td></tr>
          }
        </tbody>
      </table>

      <table className='table lg:hidden border-collpase  border border-[#f6ae2d] rounded-md  w-[100%] bg-black text-white text-center my-10'>
        <tbody>
        {
            (theatresData && theatresData.length > 0) ?
            theatresData.map((theatre,i)=>{
              return (
                <React.Fragment key={theatre.id}>
                  <tr className='h-[4rem]' key={theatre.id+"sno"}><td className='w-[50%] border-collpase border border-[#f6ae2d] text-xs md:text-base bg-[#f6ae2d] text-black font-semibold'>S.No</td><td className='w-[50%] border-collpase border border-[#f6ae2d]  rounded-md text-sm sm:text-lg'>{i+1}</td></tr>
                  <tr className='h-[4rem]' key={theatre.id+"name"}><td className='w-[50%] border-collpase border border-[#f6ae2d] text-xs md:text-base bg-[#f6ae2d] text-black font-semibold'>Name</td><td className='w-[50%] border-collpase border border-[#f6ae2d]  rounded-md text-sm sm:text-lg'>{theatre.name}</td></tr>
                  <tr className='h-[4rem]' key={theatre.id+"email"}><td className='w-[50%] border-collpase border border-[#f6ae2d] text-xs md:text-base bg-[#f6ae2d] text-black font-semibold '>Email</td><td className='w-[50%] border-collpase border border-[#f6ae2d]  rounded-md text-sm sm:text-lg'>{theatre.email}</td></tr>
                  <tr className='h-[4rem]' key={theatre.id+"mobile"}><td className='w-[50%] border-collpase border border-[#f6ae2d] text-xs md:text-base bg-[#f6ae2d] text-black font-semibold  '>Location</td><td className='w-[50%] border-collpase border border-[#f6ae2d]  rounded-md text-xs'>{theatre.address?.completeLocation}</td></tr>
                  <tr className='h-[6rem]' key={theatre.id+"action"}><td className='w-[50%] border-collpase border border-[#f6ae2d] text-xs md:text-base bg-[#f6ae2d] text-black font-semibold  '>Action</td><td className='w-[50%] border-collpase border border-[#f6ae2d]  rounded-md text-sm sm:text-lg'>
                    <div className='flex flex-col gap-4 items-center xl:flex-row xl:justify-evenly '>
                        <button onClick={()=>viewTheatre(theatre.id)}  className='bg-[#f6ae2d] text-black px-6 py-2 rounded-sm font-medium'>View</button>
                    </div></td></tr>
                  <tr className='h-[4rem]' key={theatre.id+"space"}><td className='w-[50%] border-collpase border border-[#f6ae2d] rounded-md '></td><td className='w-[50%] border-collpase border border-[#f6ae2d] rounded-md '></td></tr>
                </React.Fragment>              
                    )
            })
            : <tr className='h-[4rem]' key={"empty"}><td className='w-[50%] border-collpase border border-[#f6ae2d] rounded-md ' colSpan={2}>NO THEATRES</td></tr>
          }
        </tbody>
      </table>

      </div>
    </div>
  )
}

export default TheatreView
