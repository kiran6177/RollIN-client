import React, {  useEffect,  useRef,  useState } from 'react'
import { createPortal } from 'react-dom'
import { IoIosClose } from 'react-icons/io'
import { Loader } from "@googlemaps/js-api-loader";
import { useSelector } from 'react-redux';



function ProfileMap({isOpen,set,chooseAddress}) {
    const [position,setPosition] = useState(null);
    const [addresses,setAddresses] = useState([]);
    const MAPS_API_KEY = process.env.REACT_APP_MAPS_API_KEY;
    const dataObjects = useRef();
    const {theatreData} = useSelector(state=>state.theatre);


    useEffect(()=>{
        if(position !== null){
            loads()
            return
        }
        if(theatreData){
            setPosition({lat:theatreData?.location.coordinates[0],lng:theatreData?.location.coordinates[1]})
            return
        }
    },[position])
    
    
      
      const loads = async ()=>{
        try {
            const loader = new Loader({
                apiKey: MAPS_API_KEY,
                version: "weekly",
              });
            const { Map  } = await loader.importLibrary("maps");
            const { AdvancedMarkerElement } = await loader.importLibrary('marker')

            const map = new Map(document.getElementById("profileMap"), {
                center: position,
                zoom: 18,
                mapId: process.env.REACT_APP_MAP_ID
              });

              const { InfoWindow } = await loader.importLibrary('streetView');
              const info =  new InfoWindow({
                position:position
              })

              const marker = new AdvancedMarkerElement({
                map: map,
                position: position,
              });

              map.addListener('click',(e)=>{
                const latitude = e.latLng.lat();
                const longitude = e.latLng.lng()
                setPosition({lat:latitude,lng:longitude})
              })

              const { Geocoder } = await loader.importLibrary('geocoding');
              const geocoder = new Geocoder();
              const res = await geocoder.geocode({location:{lat:position.lat,lng:position.lng}})
              console.log(res);
              if(res.results[0]){
                 dataObjects.current = res.results.filter(ress=> ress.formatted_address.split(',').length > 3 && ress.formatted_address);
                console.log(dataObjects)

                setAddresses(dataObjects.current.map(data=>data.formatted_address));
                info.setContent(`<p style="color:black;">${res.results[0].formatted_address}</p>`);
                info.open(map, marker);
              }else{
                info.setContent(`<p style="color:red;">No address data available.</p>`);
                info.open(map, marker);
              }
              return {
                map , marker
              }
            
        } catch (error) {
            console.log(error);
        }
      }

  
    if(isOpen){
        
            return createPortal(
                <div className='w-[100%] h-[100vh] fixed top-0 pt-26 flex items-center justify-center bg-[#00000091]'>
                  <div className='bg-black text-white w-[90%] sm:w-[75%] lg:w-[65%] xl:w-[50%] border-2 border-[#f6ae2d] rounded-md p-8 flex flex-col gap-5 fixed min-h-[60vh] '>
                  <IoIosClose onClick={()=>set(false)} className="absolute cursor-pointer right-3 top-3 w-[2rem] h-[2rem]"/>
                    <h1 className='font-semibold'>Drop a pin</h1>
                    <div className='w-[90%] h-[15rem] sm:h-[20rem] mx-auto' id='profileMap'>

                    </div>
                    <div className='w-[100%] flex flex-col items-center justify-center'>
                      {
                        addresses.length === 0 &&
                        <div className=' flex items-center  text-black w-[90%] h-[3rem] bg-white rounded-sm border-2 border-black' >
                          <p className='mx-5'>Choose location from Map. </p>      
                        </div>
                      }
                        {
                          addresses.length > 0 &&
                          <div className=' overflow-scroll scrollbar scrollbar-thin-[#f6ae2d] flex flex-col justify-start text-black w-[90%] h-[7rem] '>
                            {
                              addresses.map((address,i)=>{
                                return (
                                  <div key={i} onClick={()=>{
                                    chooseAddress(address,{lat:dataObjects.current[i].geometry.location.lat(),lng:dataObjects.current[i].geometry.location.lng()});
                                    set(false)
                                  }} className='min-h-[3rem] flex items-center bg-white rounded-sm  ml-[1.5px] mt-[1px] border-black w-[100%]'>
                                    <p className='mx-5 w-[100%]  text-ellipsis overflow-hidden'>{address}</p>
                                  </div>
                                )
                              })
                            }
                            
                          </div>
                        }
                        

                    </div>
                  </div>
                </div>
              ,document.getElementById('profile-modal'))
         
    }else{
        return null
    }
  
}

export default ProfileMap
