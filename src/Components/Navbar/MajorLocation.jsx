import React, { useEffect } from 'react'
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';

function MajorLocation({src,name,set}) {

    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions
      } = usePlacesAutocomplete({
        debounce:400
      });

      const getGeo = async (desc)=>{
        try{
            const res = await getGeocode({address:desc})
            console.log(res);
            const {lat , lng } = getLatLng(res[0])
            console.log(lat,lng);
            return {
                lat,
                lng
            }
        }catch(err){
            console.log(err.message);
        }
      }
      useEffect(()=>{
        if(data?.length > 0){
            console.log("MAJOR",data);
            const name = data[0]?.structured_formatting?.main_text;
            getLocData(name,data[0]?.description)
        }
      },[data])

      const getLocData = async (name,desc)=>{
        const res = await getGeo(desc)
        console.log("MAJ RESS",res);
        localStorage.setItem('city',JSON.stringify({name,loc:res}))
        window.location.href = '/'
        set(false)
      }

  return (
    <div onClick={()=>{setValue(name)}} className='w-[2.5rem] mx-4 sm:w-[4rem] flex flex-col overflow-hidden hover:scale-[1.06] transition-all duration-150 ease-linear hover:drop-shadow-[0px_0px_25px_#f6ae2d]'>
        <img src={src} alt="" width={'100% '} className='object-cover aspect-square' />
        <h1 className='text-white text-[10px] sm:text-xs md:text-sm text-center'>{name}</h1>
    </div>
  )
}

export default MajorLocation
