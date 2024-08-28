import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom';
import { ScaleLoader } from 'react-spinners';
import { Toaster, toast } from 'sonner';
import { motion } from 'framer-motion';
import { IoIosClose } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MdChair } from 'react-icons/md';
import { theatreEditTier } from '../../../features/theatreFeat/theatreFeatAction';
import { resetTheatreFeatActions } from '../../../features/theatreFeat/theatreFeatSlice';

const confirmVarinat = {
    hidden:{
      scale:0
    },
    visible:{
      scale:1,
      transition:{
        type:"spring",
        bounce:0.5
      }
    }
  }

  const Letters = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
  ];

function SaveModal({isOpen,set,setUpdate,tierData,layout}) {
    const [searchParams] = useSearchParams();
    const screen_id = searchParams.get('screen_id');
    const tier_id = searchParams.get('tier_id');
    const {loading,message} = useSelector(state=>state.theatreFeat);

    const [layouts,setLayouts] = useState([])

    const dispatch = useDispatch()
    const {theatreToken} = useSelector(state=>state.theatre);
    const {theatreScreenData} = useSelector(state=>state.theatreFeat)
    const navigate = useNavigate()

    useEffect(()=>{
        console.log(screen_id,tier_id);
        console.log(tierData,layout);
        if(layout){
            let layoutArr = Object.entries(layout).map(([objKey,objValue])=>{
                return {
                    [objKey]:objValue
                }
            })
            setLayouts(layoutArr)
            return
        }
    },[tierData,layout])

    useEffect(()=>{
        if(message === 'Layout Configured Successfully.'){
            set(false)
            toast.success(message)
            dispatch(resetTheatreFeatActions())
            setTimeout(()=>{
                navigate(`/theatre/screendetail?id=${screen_id}`)
            },1000)
            return
        }
    },[message])

    const handleIdentifierChange = (value,key,index)=>{
        let updatedLayouts = layouts.map((obj,i)=>{
            let objKey = Object.keys(obj)[0];
            let objValue = obj[objKey];
            console.log(objKey,objValue);
            if(key === objKey && index === i){
                return {
                    [value]:objValue
                }
            }else{
                return {
                    [objKey]:objValue
                }
            }
        })
        setLayouts(updatedLayouts)
    }

    const handleConfirm = ()=>{

        if(tierData && layouts.length > 0){
            let keysArr = []
            let keySet = new Set();
            for(let obj of layouts){
                let key = Object.keys(obj)[0]
                if(!isNaN(parseInt(key)) || key.toString().trim() === ''){
                    toast.error('Please select Identifiers!!')
                    return
                }
                keysArr.push(key)
                keySet.add(key)
            }
            let existingKeys = []
            if(tierData?.layout && tierData?.layout.length > 0){
                for(let obj of tierData.layout){
                    let key = Object.keys(obj)[0]
                    existingKeys.push(key)
                }
            }
            let screenData ;
            if(theatreScreenData?.length > 0){
                for(let screen of theatreScreenData){
                    if(screen_id == screen._id){
                        screenData = screen;
                        break;
                    }
                }
            }
            let keysFromTiers = []
            if(screenData && screenData?.tiers?.length > 0){
                for(let tier of screenData.tiers){
                    if(tier?.layout?.length > 0){
                        for(let obj of tier.layout){
                            let key = Object.keys(obj)[0]
                            keysFromTiers.push(key)
                        }
                    }
                }
            }
            let inValidKeys = keysFromTiers.filter(key=>!existingKeys.includes(key))
            if(keysArr?.length > 0 && inValidKeys?.length > 0){
                for(let newKey of keysArr){
                    if(inValidKeys.includes(newKey)){
                        toast.error(`Invalid Identifier : ${newKey} !!`)
                        return
                    }
                }
            }
            if(keySet.size !== keysArr.length){
                toast.error('Duplicate Identifiers!!')
            }else{
                tierData.layout = layouts
                let tierdata = {...tierData,
                    layout:layouts
                }
                console.log(tierdata);
                const data = {screen_id,tier_id,tierdata}
                dispatch(theatreEditTier({data,token:theatreToken}))
            }
        }
    }

    if(isOpen){ 
        return createPortal(
            <div className='w-[100%] h-[100vh] fixed top-0 pt-32 md:pt-26 flex items-center justify-center bg-[#00000091]'>
              <Toaster richColors />
                <motion.div
                variants={confirmVarinat}
                initial="hidden"
                animate="visible"
                className='bg-black text-white w-[80%] sm:w-[65%] lg:w-[45%] xl:w-[35%] border-2 border-[#f6ae2d] rounded-md p-8 flex flex-col gap-16 justify-center items-center fixed min-h-[70vh] '>
                      <IoIosClose onClick={()=>{set(false)}} className="absolute cursor-pointer right-3 top-3 w-[2rem] h-[2rem]"/>
                        <h1 className='font-medium text-lg tracking-wider text-center'>Configure Layout</h1>
                       
                        <div className='w-[100%] flex flex-col items-center gap-1 min-h-[20vh]'>
                            <h6 className='text-sm mb-4'>Choose Identifier</h6>
                        {
                            layouts && layouts.length > 0 && layouts.map((obj,i)=>{
                                let key = Object.keys(obj)[0];
                                let value = obj[key]
                                return(
                                <div key={key+i} className='flex h-[100%] w-[100%] items-center'>
                                    <div className='text-white text-xs'>
                                    <select value={key} onChange={(e)=>{handleIdentifierChange(e.target.value,key,i)}} className='bg-black scrollbar-none w-[2.5rem] text-ellipsis overflow-hidden whitespace-nowrap' name="" id="">
                                        <option value="">Choose</option>
                                        {
                                            Letters.map(letter=>{
                                                
                                                return(
                                                    <option key={letter} value={letter}>{letter}</option>
                                                )
                                            })
                                        }
                                        </select>
                                    
                                    </div>
                                    <div key={key+i} style={{gridTemplateColumns:`repeat(${value?.length},1fr)`}} className={`grid w-[100%]`}> 
                                        {value.map((seats,i)=>{
                                            return(
                                                <div key={key+i}  className={` aspect-square flex justify-center items-center`}>
                                                    {seats === 1 && <MdChair className='text-[#f6ae2d] w-[60%] h-[60%]' /> }
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                                )
                            })
                        }
                        </div>

                        <div className='w-[100%] flex items-center justify-center gap-8'>
                            <button onClick={()=>{handleConfirm()}} disabled={loading} className={loading? 'bg-[#cb9635d6] border-2 border-[#f6ae2d] text-black px-8 py-2 rounded-md hover:bg-black hover:text-white transition-all duration-200 ease-in-out' :'bg-[#f6ae2d] border-2 border-[#f6ae2d] text-black px-8 py-2 rounded-md hover:bg-black hover:text-white transition-all duration-200 ease-in-out'}>CONFIRM</button>
                            <button onClick={()=>set(false)} disabled={loading} className={loading ? 'bg-[#cb9635d6] border-2 border-[#f6ae2d] text-black px-8 py-2 rounded-md hover:bg-black hover:text-white transition-all duration-200 ease-in-out' :'bg-[#f6ae2d] border-2 border-[#f6ae2d] text-black px-8 py-2 rounded-md hover:bg-black hover:text-white transition-all duration-200 ease-in-out'}>CANCEL</button>
                        </div>
                        <div className='w-[100%] mx-auto'>
                        <ScaleLoader loading={loading}  color='#f6ae2d' height={20} />
                        </div>
                </motion.div>
            </div>,
            document.getElementById("trailer-modal")
          )
    }else{
        return null
    }
}

export default SaveModal
