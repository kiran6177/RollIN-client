import { Loader } from '@googlemaps/js-api-loader';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router'
import { Toaster } from 'sonner'
import { blockUnblockTheatres } from '../../../features/admin/adminSlice';

function TheatreSingleView() {
    const MAPS_API_KEY = process.env.REACT_APP_MAPS_API_KEY;
    const [theatre,setTheatre] = useState(null);
    const searchParams = useParams()

    const {theatresData,adminToken} = useSelector(state=>state.admin);
    const dispatch = useDispatch();

    useEffect(()=>{
        const theatreID = searchParams.id
        if(theatresData){
            setTheatre(...theatresData.filter(theatre=>theatre.id === theatreID))
        } 
    },[theatresData])

    useEffect(()=>{
        if(theatre){
            loads()
        }
    },[theatre])

    const handleBlockUnblock = (theatreid)=>{
        dispatch(blockUnblockTheatres({theatreid,token:adminToken}))
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
                        <button onClick={()=>handleBlockUnblock(theatre.id)} className='bg-[#f6ae2d] w-[100%] tracking-widest  text-black px-6 py-2 rounded-sm font-semibold'>UnBlock</button>
                          :
                        <button onClick={()=>handleBlockUnblock(theatre.id)} className='bg-[#f6ae2d] w-[100%] tracking-widest  text-black px-6 py-2 rounded-sm font-semibold'>Block</button>
                        }
                      </div>
            </div>
        }
      </div>
    </div>
  )
}

export default TheatreSingleView
