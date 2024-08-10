import { Loader } from '@googlemaps/js-api-loader';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router'
import { Toaster, toast } from 'sonner'
import {  resetAdminActions } from '../../../features/admin/adminSlice';
import {approveTheatre, blockUnblockTheatres} from '../../../features/admin/adminActions'
import { ScaleLoader } from 'react-spinners';
import ConfirmModal from './ConfirmModal';

function TheatreSingleView() {
    const MAPS_API_KEY = process.env.REACT_APP_MAPS_API_KEY;
    const [theatre,setTheatre] = useState(null);

    const [isOpen,setIsOpen] = useState(false);

    const searchParams = useParams()

    const {theatresData,adminToken,error,loading,message} = useSelector(state=>state.admin);
    const dispatch = useDispatch();

    useEffect(()=>{
      
        const theatreID = searchParams.id
        if(theatresData){
            setTheatre(...theatresData.filter(theatre=>theatre.id === theatreID))
        } 
    },[theatresData])

    useEffect(()=>{
      if(message){
        toast.success(message);
        dispatch(resetAdminActions())
        return
      }
      if(error){
        error.length > 0 &&
        error.map(err=>{
          toast.error(err)
        })
        dispatch(resetAdminActions())
      return
    }
        if(theatre){
            loads()
        }
    },[theatre,error,message])

    const handleBlockUnblock = (theatreid)=>{
        dispatch(blockUnblockTheatres({theatreid,token:adminToken}))
    }

    const handleApproval = (theatreid)=>{
      dispatch(approveTheatre({theatreid,token:adminToken}))
    }

    const loads = async ()=>{
        try {
            const loader = new Loader({
                apiKey: MAPS_API_KEY,
                version: "weekly",
              });
            const { Map  } = await loader.importLibrary("maps");
            const { AdvancedMarkerElement } = await loader.importLibrary('marker')

            if(theatre.location?.coordinates?.length > 0){
                const position = {lat:theatre.location?.coordinates[0] , lng:theatre.location?.coordinates[1] }
                const map = new Map(document.getElementById("mapShow"), {
                    center: position,
                    zoom: 18,
                    mapId: process.env.REACT_APP_MAP_ID
                });
                const marker = new AdvancedMarkerElement({
                    map: map,
                    position: position,
                  });
            }
            
        }catch(error){
            console.log(error.message);
        }
    }

  return (
<div className='pt-28 lg:pl-56 min-h-[100vh] bg-[#15121B]'>
      <Toaster richColors />
      <div className='p-12'>
        {   theatre &&
            <div className='flex flex-col gap-10 '>
            <h2 className='text-[#f6ae2d] font-semibold text-4xl'>{theatre.name}</h2>
            <h4 className='text-white font-medium text-xl'>Email : &nbsp;  {theatre.email}</h4>
            
            <div className='w-[90%]  mx-auto flex flex-wrap gap-12 '>
            {
              theatre.images && theatre.images.length > 0 &&
              theatre.images.map((image,i)=>{
                return (
                    <img key={i} src={image} alt="" className='max-w-[30%] aspect-square object-contain bg-black border-black' /> 
                )
              })
            }
            </div>

            <h4 className='text-white font-medium text-xl'>Location :  &nbsp; {theatre.address?.completeLocation}</h4>
            {
                theatre.location ?
                <div className='w-[90%] h-[20rem] mx-auto' id='mapShow'>
                </div>
            : <div className='w-[90%] h-[20rem] flex justify-center items-center text-white mx-auto'>
                <h6>NO LOCATION UPDATED.</h6>
              </div>
            }
            <div className='flex flex-col gap-4 items-center xl:flex-row xl:justify-evenly w-[70%] mx-auto'>
                        {
                          theatre.isBlocked ?
                        <button onClick={()=>setIsOpen("UNBLOCK")} className='bg-[#f6ae2d] w-[100%] tracking-widest  text-black px-6 py-2 rounded-sm font-semibold'>UnBlock</button>
                          :
                        <button onClick={()=>setIsOpen("BLOCK")} className='bg-[#f6ae2d] w-[100%] tracking-widest  text-black px-6 py-2 rounded-sm font-semibold'>Block</button>
                        }
            </div>
            <div className='flex flex-col gap-4 items-center xl:flex-row xl:justify-evenly w-[70%] mx-auto'>
                        {
                          !theatre.isVerified &&
                        <button onClick={()=>handleApproval(theatre.id)} disabled={loading} className='bg-[#f6ae2d] w-[100%] tracking-widest  text-black px-6 py-2 rounded-sm font-semibold'>Approve</button>
                        }
            </div>
            <ScaleLoader loading={loading}  color='#f6ae2d' height={20} />
            
            {
              isOpen &&
              <ConfirmModal isOpen={isOpen} set={setIsOpen} theatre={theatre} handleAction={handleBlockUnblock} />
            }
            </div>
            
        }
      </div>
    </div>
  )
}

export default TheatreSingleView
