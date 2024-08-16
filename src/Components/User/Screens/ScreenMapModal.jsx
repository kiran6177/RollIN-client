import { Loader } from '@googlemaps/js-api-loader';
import React, { useEffect } from 'react'
import { createPortal } from 'react-dom';
import { IoIosClose } from 'react-icons/io';

function ScreenMapModal({isOpen,theatre,set}) {
    const MAPS_API_KEY = process.env.REACT_APP_MAPS_API_KEY;
    useEffect(()=>{
        if(theatre && isOpen){
            loads()
            
        }
    },[theatre,isOpen])

    const loads = async ()=>{
        try {
            const loader = new Loader({
                apiKey: MAPS_API_KEY,
                version: "weekly",
              });
            const { Map  } = await loader.importLibrary("maps");
            const { AdvancedMarkerElement } = await loader.importLibrary('marker')

            if(theatre?.location?.coordinates?.length > 0){
                const position = {lat:theatre?.location?.coordinates[0] , lng:theatre?.location?.coordinates[1] }
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
    if(isOpen){
        
        return createPortal(
            <div className='w-[100%] h-[100vh] fixed top-0 pt-26 flex items-center justify-center bg-[#00000091]'>
              <div className='bg-black text-white w-[90%] sm:w-[75%] lg:w-[65%] xl:w-[50%] border-2 border-[#f6ae2d] rounded-md p-8 flex flex-col gap-5 fixed min-h-[60vh] '>
              <IoIosClose onClick={()=>set(false)} className="absolute cursor-pointer right-3 top-3 w-[2rem] h-[2rem]"/>
                <h1 className='font-semibold text-center text-[#f6ae2d]'>{theatre?.name}</h1>
                {
                theatre?.location ?
                <div className='w-[90%] h-[20rem] mx-auto' id='mapShow'>
                </div>
                : <div className='w-[90%] h-[20rem] flex justify-center items-center text-white mx-auto'>
                    <h6>NO LOCATION UPDATED.</h6>
                </div>
                }
              </div>
            </div>
          ,document.getElementById('profile-modal'))
     
}else{
    return null
}
}

export default ScreenMapModal
