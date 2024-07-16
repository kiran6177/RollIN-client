import React, { useEffect, useState } from 'react'
import usePlacesAutocomplete ,{ getGeocode , getLatLng } from 'use-places-autocomplete';

function AutoSearch({set}) {

    const [placeArr,setPlaceArr] = useState([])

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
        if(value){
            clearSuggestions()
            return
        }
      },[value])

      useEffect(()=>{
        if(data?.length > 0){
            console.log("LOC",data);
            setPlaceArr(data.map(eachObj=>{
                if(eachObj?.structured_formatting?.main_text){
                    return {
                        name:eachObj.structured_formatting.main_text + ' , ' + eachObj?.structured_formatting?.secondary_text,
                        description:eachObj?.description
                    }
                }
            }))
        }
      },[data])

      const handleLocationSelect = async (name,desc)=>{
        const res = await getGeo(desc)
        console.log("ressss",res);
        localStorage.setItem('city',JSON.stringify({name,loc:res}))
        window.location.href = '/'
        set(false)
      }

  return (
    <div className='relative w-[80%]'>
        <input type="text" placeholder='Search Your City'  value={value} onChange={(e)=>setValue(e.target.value)} className='text-sm border-2 border-[#f6ae2d] bg-black px-4 py-3 w-[100%] rounded-sm'  />
        { (placeArr?.length > 0 && value !== "") &&
        <div className='absolute w-[100%] scrollbar-none border-l-[1px] border-b-[1px] border-r-[1px] border-[#f6ae2d] rounded-sm shadow-[0px_0px_25px_rgba(246,174,45,0.3)] bg-black text-[#f6ae2d] max-h-[10rem] overflow-y-scroll'>
            {
                placeArr.map((place,i)=>{
                    return (
                        <h1 key={i} onClick={()=>handleLocationSelect(place?.name,place?.description)} className='px-4 tracking-wider text-xs py-4 font-normal border-b-[1px] border-[#f6ae2d]'>{place?.name}</h1>
                    )
                })
            }
        </div>}
    </div>
  )
}

export default AutoSearch
