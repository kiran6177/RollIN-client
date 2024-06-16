import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Toaster } from 'sonner'
import { resetAdminActions } from '../../../features/admin/adminSlice';
import { adminGetUsers, blockUnblockUsers} from '../../../features/admin/adminActions'
import ConfirmModal from './ConfirmModal';

function UsersView() {

  const {adminToken,usersData} = useSelector(state=>state.admin);
  const dispatch = useDispatch();
  const [isOpen,setIsOpen] = useState(false)

  useEffect(()=>{
    dispatch(adminGetUsers(adminToken))
    dispatch(resetAdminActions())
  },[])

  const handleBlockUnblock = (userid)=>{
    console.log(userid);
    dispatch(blockUnblockUsers({userid,token:adminToken}))
  }

  return (
    <div className='pt-28 lg:pl-56 min-h-[100vh] bg-[#15121B]'>
      <Toaster richColors />
      <div className='p-12'>
      <h2 className='text-white font-semibold text-4xl'>Users</h2>
      <table className='hidden lg:table border-collpase  border border-[#f6ae2d] rounded-md  w-[100%] bg-black text-white text-center my-10'>
        <thead className='border-collpase border border-[#f6ae2d] '>
          <tr key="main-head" className='h-[4rem] bg-[#f6ae2d] text-black '>
          <th className='border-collpase border border-[#f6ae2d] font-semibold  w-[10%]' >S. No</th>
          <th className='border-collpase border border-[#f6ae2d] font-semibold  w-[20%]' >Name</th>
          <th className='border-collpase border border-[#f6ae2d] font-semibold  w-[25%]' >Email</th>
          <th className='border-collpase border border-[#f6ae2d] font-semibold  w-[20%]' >Mobile</th>
          <th className='border-collpase border border-[#f6ae2d] font-semibold  ' >Action</th>
          </tr>          
        </thead>
        <tbody>
          {
            (usersData && usersData.length > 0) ?
            usersData.map((user,i)=>{
              return (
                <tr key={user.id} className='h-[8rem] xl:h-[4rem]'>
                    <td className='border-collpase border border-[#f6ae2d] rounded-md ' >{i+1}</td>
                    <td className='border-collpase border border-[#f6ae2d] rounded-md ' >{user.firstname + " " + user.lastname}</td>
                    <td className='border-collpase border border-[#f6ae2d] rounded-md ' >{user.email}</td>
                    <td className='border-collpase border border-[#f6ae2d] rounded-md ' >{user.mobile}</td>
                    <td className='border-collpase border border-[#f6ae2d] rounded-md ' >
                      <div className='flex flex-col gap-4 items-center xl:flex-row xl:justify-evenly '>
                        {
                          user.isVerified ?
                        <button onClick={()=>setIsOpen(`BLOCK|${user.id}`)} className='bg-[#f62d2d] text-black px-6 py-2 rounded-sm font-medium'>Block</button>
                          :
                        <button onClick={()=>setIsOpen(`UNBLOCK|${user.id}`)} className='bg-[#3af62d] text-black px-6 py-2 rounded-sm font-medium'>Unblock</button>
                        }
                      </div>
                    </td>
                </tr>
              )
            })
            : 
            <tr key={"emptymain"} className='h-[8rem] xl:h-[4rem]'><td className='border-collpase border border-[#f6ae2d] rounded-md ' colSpan={5}>NO USERS</td></tr>
          }
        </tbody>
      </table>

      <table className='table lg:hidden border-collpase  border border-[#f6ae2d] rounded-md  w-[100%] bg-black text-white text-center my-10'>
        <tbody>
        {
            (usersData && usersData.length > 0) ?
            usersData.map((user,i)=>{
              return (
                <React.Fragment key={user.id}>
                  <tr className='h-[4rem]' key={user.id+"sno"}><td className='w-[50%] border-collpase border border-[#f6ae2d] bg-[#f6ae2d] text-black font-semibold'>S.No</td><td className='w-[50%] border-collpase border border-[#f6ae2d] rounded-md '>{i+1}</td></tr>
                  <tr className='h-[4rem]' key={user.id+"name"}><td className='w-[50%] border-collpase border border-[#f6ae2d] bg-[#f6ae2d] text-black font-semibold'>Name</td><td className='w-[50%] border-collpase border border-[#f6ae2d] rounded-md '>{user.firstname + " " + user.lastname}</td></tr>
                  <tr className='h-[4rem]' key={user.id+"email"}><td className='w-[50%] border-collpase border border-[#f6ae2d] bg-[#f6ae2d] text-black font-semibold '>Email</td><td className='w-[50%] border-collpase border border-[#f6ae2d] rounded-md '>{user.email}</td></tr>
                  <tr className='h-[4rem]' key={user.id+"mobile"}><td className='w-[50%] border-collpase border border-[#f6ae2d] bg-[#f6ae2d] text-black font-semibold  '>Mobile</td><td className='w-[50%] border-collpase border border-[#f6ae2d] rounded-md '>{user.mobile}</td></tr>
                  <tr className='h-[6rem]' key={user.id+"action"}><td className='w-[50%] border-collpase border border-[#f6ae2d] bg-[#f6ae2d] text-black font-semibold  '>Action</td><td className='w-[50%] border-collpase border border-[#f6ae2d] rounded-md '>
                    <div className='flex flex-col gap-4 items-center xl:flex-row xl:justify-evenly '>
                        {
                          user.isVerified ?
                        <button onClick={()=>setIsOpen(`BLOCK|${user.id}`)}  className='bg-[#f62d2d] text-black px-6 py-2 rounded-sm font-medium'>Block</button>
                          :
                        <button onClick={()=>setIsOpen(`UNBLOCK|${user.id}`)} className='bg-[#3af62d] text-black px-6 py-2 rounded-sm font-medium'>Unblock</button>
                        }
                    </div></td></tr>
                  <tr className='h-[4rem]' key={user.id+"space"}><td className='w-[50%] border-collpase border border-[#f6ae2d] rounded-md '></td><td className='w-[50%] border-collpase border border-[#f6ae2d] rounded-md '></td></tr>
                </React.Fragment>              
                    )
            })
          : <tr className='h-[4rem]' key={"empty"}><td className='w-[50%] border-collpase border border-[#f6ae2d] rounded-md ' colSpan={2}>NO USERS</td></tr>
        }
        </tbody>
      </table>

      </div>
      {
        isOpen &&
        <ConfirmModal isOpen={isOpen} set={setIsOpen}  handleAction={handleBlockUnblock} />
      }
    </div>
  )
}

export default UsersView
