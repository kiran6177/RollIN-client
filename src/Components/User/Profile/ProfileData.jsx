import React, { lazy, Suspense, useEffect, useReducer, useRef, useState } from 'react'
import unknown from '../../../assets/Unknown_person.jpg'
import { logoutUser, resetActions } from '../../../features/user/userSlice';
import { userEditEmail, userEditProfile, userLogout } from '../../../features/user/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { profileReducer } from './ProfileReducer';
import { LuImagePlus } from "react-icons/lu";
import { toast, Toaster } from 'sonner';
import { useNavigate } from 'react-router';
import { useSocket } from '../../../hooks/socket';
const UpdateOtpModal = lazy(()=> import('./UpdateOtpModal'));

function ProfileData() {
    const dispatch = useDispatch()
    const {userToken,userData,message,loading,error} = useSelector(state=>state.user)
    const [showEdit,setShowEdit] = useState(false);
    const [showUpdate,setShowUpdate] = useState(false);
    const [image,setImage] = useState('')
    const imageRef = useRef(null);
    const navigate = useNavigate();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    const [showOtp,setShowOtp] = useState(false);
    const socket = useSocket();

    const [profileState,profileDispatch] = useReducer(profileReducer,{firstname:'',lastname:'',email:'',mobile:0,street:'',landmark:'',city:'',state:'',pincode:0})

    useEffect(()=>{
        if(userData){
            profileDispatch({type:'FIRSTNAME',payload:userData?.firstname})
            profileDispatch({type:'LASTNAME',payload:userData?.lastname})
            profileDispatch({type:'EMAIL',payload:userData?.email})
            profileDispatch({type:'MOBILE',payload:userData?.mobile})
            profileDispatch({type:'STREET',payload:userData?.address?.street})
            profileDispatch({type:'LANDMARK',payload:userData?.address?.landmark})
            profileDispatch({type:'CITY',payload:userData?.address?.city})
            profileDispatch({type:'STATE',payload:userData?.address?.state})
            profileDispatch({type:'PINCODE',payload:userData?.address?.pincode})
            setImage(userData?.image)
        }
    },[userData])

    useEffect(()=>{
      if(error?.length > 0){
        error.map(err=>toast.error(err))
        dispatch(resetActions())
        return
      }
      if(message === 'Profile Updated Successfully.'){
        toast.success(message)
        dispatch(resetActions())
        setShowUpdate(false)
        return
      }
      if(message === 'OTP is sent to your email.'){
        toast.success(message)
        dispatch(resetActions())
        setShowOtp(true)
        return
      }
      if(message === 'Email Updated Successfully.'){
        toast.success(message)
        dispatch(resetActions())
        setShowOtp(false)
        localStorage.removeItem('otpTime')
        setShowEdit(false)
        return
      }
    },[message,error])

    const handleLogout = ()=>{
        socket?.emit('remove-user',userData?.id)
        dispatch(logoutUser())
        dispatch(userLogout(userToken))
    }

    const handleEdit = ()=>{
      console.log(imageRef.current.files[0]);
      console.log(profileState);
      const formdata = new FormData()
      formdata.append('firstname',profileState.firstname)
      formdata.append('lastname',profileState.lastname)
      formdata.append('mobile',profileState.mobile)
      formdata.append('street',profileState.street)
      formdata.append('city',profileState.city)
      formdata.append('state',profileState.state)
      formdata.append('landmark',profileState.landmark)
      formdata.append('pincode',profileState.pincode)
      formdata.append('image',imageRef.current.files[0])
      if(imageRef.current.files[0] && !imageRef.current.files[0]?.type.startsWith('image/')){
        toast.error('Invalid image format!!')
        return
      }
      const data = formdata
      const {
        firstname,
        lastname,
        mobile,
        street,
        landmark,
        city,
        state,
        pincode
      } = profileState;
      if(!firstname || !lastname || !mobile){
        toast.error('Please fill required fields!!')
      }else if(!/^[A-Za-z\s]+$/.test(firstname)){
        toast.error('Please enter valid firstname!!')
      }
      else if(!/^[A-Za-z\s]+$/.test(lastname)){
        toast.error('Please enter valid lastname!!')
      }else if(!/^\d+$/.test(mobile)){
        toast.error('Please enter valid mobile number!!')
      }else{
        if(!street && !landmark && !city && !pincode && !state){
          dispatch(userEditProfile({data,token:userToken})) 
        }else{
          let validated = true;
          if(street && !/^[A-Za-z\s()]+$/.test(street)){
            toast.error('Please enter valid street!!')
            validated = false
          }
          if(city && !/^[A-Za-z\s()]+$/.test(city)){
            toast.error('Please enter valid city!!')
            validated = false
          }
          if(state && !/^[A-Za-z\s]+$/.test(state)){
            toast.error('Please enter valid state!!')
            validated = false
          }
          if(landmark && !/^[A-Za-z\s]+$/.test(landmark)){
            toast.error('Please enter valid landmark!!')
            validated = false
          }
          if(pincode && !/^\d{6}$/.test(pincode)){
            toast.error('Please enter valid pincode!!')
            validated = false
          }
          if(validated){
          dispatch(userEditProfile({data,token:userToken})) 
          }
        }
      }
    }

    const handleImageSelect = ()=>{
      setImage(URL.createObjectURL(imageRef.current.files[0]))
      setShowUpdate(true)
    }

    const handleEditEmail = ()=>{
      console.log(profileState.email);
      if(profileState.email.trim() === ''){
        toast.error('Please enter a valid email!!')
      }else if(!emailRegex.test(profileState.email)){
          toast.error('Invalid email format!!')
      }else{
        dispatch(userEditEmail({data:{email:profileState.email},token:userToken}))
      }
    }

  return (
    <>
    <div className='border-2 border-[#f6ae2d] mt-12 w-[100%] md:w-[70%] lg:w-[50%] mx-auto rounded-md  bg-black'>
      <Toaster richColors />
          <div className='w-[100%] px-8 flex items-end border-b-2 border-[#f6ae2d] h-[7rem] relative bg-gradient-to-l from-[#f6b02deb] to-transparent '>
            <div className='w-[4rem] rounded-full overflow-hidden absolute -bottom-3 border-[1px] border-[#f6ae2d] '>
              <img src={image ? image :unknown} alt="" className='object-cover aspect-square' />
            </div>
            <div onClick={()=>imageRef.current.click()} className='absolute -bottom-[1.1rem] text-black cursor-pointer  left-[4.5rem]  bg-[#f6ae2d] p-[6px] rounded-full'>
            <LuImagePlus className='w-[1rem] h-[1rem]' />
            </div>
            <input type="file" ref={imageRef} onChange={handleImageSelect} className='hidden' />
            <h2 className='text-white ml-[5rem] text-center mb-1 flex gap-3 justify-between items-center text-lg tracking-widest'>{userData?.firstname + " " + userData?.lastname }</h2>
          </div>
          <div className='px-10 sm:px-14 py-8 flex flex-col gap-3'>
            <h2 className='text-white tracking-wider '>Account Details</h2>
            <div className='flex flex-col gap-2 my-4'>
              <label className='text-[#f6ae2d] text-sm tracking-widest font-light'>Email</label>
              <div className='text-white flex flex-col sm:flex-row justify-between sm:items-center gap-4 sm:gap-0'>
                <h2 className='tracking-wide'>{profileState?.email}</h2> 
                {!showEdit ?<button onClick={()=>setShowEdit(true)} className='border-[1px] border-[#f6ae2d] text-xs tracking-wider rounded-2xl px-3 py-1'>EDIT</button>
                : <button onClick={handleEditEmail} className='border-[1px] border-[#f6ae2d] text-xs tracking-wider rounded-2xl px-3 py-1'>SAVE</button>}
              </div>
              {showEdit && <input type="text" value={profileState.email} onChange={(e)=>{profileDispatch({type:'EMAIL',payload:e.target.value});}} className='p-2 bg-black border-2 border-[#f6ae2d] rounded-md text-white' />}
            </div>
            <div className='flex flex-col gap-2'>
              <label className='text-[#f6ae2d] text-sm tracking-widest font-light'>Mobile</label>
              <input type="number" value={profileState.mobile} onChange={(e)=>{profileDispatch({type:'MOBILE',payload:e.target.value});setShowUpdate(true);}} className='p-2 bg-black border-2 border-[#f6ae2d] rounded-md text-white' />
            </div>
            <div className='flex flex-col gap-2'>
              <label className='text-[#f6ae2d] text-sm tracking-widest font-light'>Firstname</label>
              <input type="text" value={profileState?.firstname} onChange={(e)=>{profileDispatch({type:'FIRSTNAME',payload:e.target.value});setShowUpdate(true);}} className='p-2 bg-black border-2 border-[#f6ae2d] rounded-md text-white' />
            </div>
            <div className='flex flex-col gap-2'>
              <label className='text-[#f6ae2d] text-sm tracking-widest font-light'>Lastname</label> 
              <input type="text" value={profileState?.lastname} onChange={(e)=>{profileDispatch({type:'LASTNAME',payload:e.target.value});setShowUpdate(true);}} className='p-2 bg-black border-2 border-[#f6ae2d] rounded-md text-white' />
            </div>
            <h2 className='text-white tracking-wider mt-6'>Address (Optional)</h2>
            <div className='flex flex-col gap-2'>
              <label className='text-[#f6ae2d] text-sm tracking-widest font-light'>Street</label>
              <input type="text" value={profileState.street} onChange={(e)=>{profileDispatch({type:'STREET',payload:e.target.value});setShowUpdate(true);}} className='p-2 bg-black border-2 border-[#f6ae2d] rounded-md text-white' />
            </div>
            <div className='flex flex-col gap-2'>
              <label className='text-[#f6ae2d] text-sm tracking-widest font-light'>Landmark</label>
              <input type="text" value={profileState.landmark} onChange={(e)=>{profileDispatch({type:'LANDMARK',payload:e.target.value});setShowUpdate(true);}} className='p-2 bg-black border-2 border-[#f6ae2d] rounded-md text-white' />
            </div>
            <div className='flex flex-col gap-2'>
              <label className='text-[#f6ae2d] text-sm tracking-widest font-light'>City</label>
              <input type="text" value={profileState.city} onChange={(e)=>{profileDispatch({type:'CITY',payload:e.target.value});setShowUpdate(true);}} className='p-2 bg-black border-2 border-[#f6ae2d] rounded-md text-white' />
            </div>
            <div className='flex flex-col gap-2'>
              <label className='text-[#f6ae2d] text-sm tracking-widest font-light'>State</label>
              <input type="text" value={profileState.state} onChange={(e)=>{profileDispatch({type:'STATE',payload:e.target.value});setShowUpdate(true);}} className='p-2 bg-black border-2 border-[#f6ae2d] rounded-md text-white' />
            </div>
            <div className='flex flex-col gap-2'>
              <label className='text-[#f6ae2d] text-sm tracking-widest font-light'>Pincode</label>
              <input type="number" value={profileState.pincode} onChange={(e)=>{profileDispatch({type:'PINCODE',payload:e.target.value});setShowUpdate(true);}} className='p-2 bg-black border-2 border-[#f6ae2d] rounded-md text-white' />
            </div>
          {showUpdate && <button onClick={handleEdit} disabled={loading} className={loading ? 'mt-8 border-2 border-[#f6ae2d] bg-[#f6b02dca] px-12 py-2 rounded-sm font-semibold tracking-widest  ' :'mt-8 border-2 border-[#f6ae2d] bg-[#F6AE2D] px-12 py-2 rounded-sm font-semibold tracking-widest  hover:bg-[black] hover:text-white transition-all duration-150 ease-in-out'}>UPDATE</button>}
          <button onClick={handleLogout} disabled={loading} className={loading ? 'mt-8 border-2 border-[#f6ae2d] bg-[#f6b02dca] px-12 py-2 rounded-sm font-semibold tracking-widest  ' :'mt-8 border-2 border-[#f6ae2d] bg-[#F6AE2D] px-12 py-2 rounded-sm font-semibold tracking-widest  hover:bg-[black] hover:text-white transition-all duration-150 ease-in-out'}>LOGOUT</button>
          </div>
        </div>
        {showOtp && <Suspense><UpdateOtpModal isOpen={showOtp} set={setShowOtp} /></Suspense>}
    </>
  )
}

export default ProfileData
