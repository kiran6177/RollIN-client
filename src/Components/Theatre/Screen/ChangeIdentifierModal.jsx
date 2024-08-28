import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { IoIosClose } from 'react-icons/io'
import { Toaster, toast } from 'sonner'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { MdChair } from 'react-icons/md'
import { theatreChangeTierOrder } from '../../../features/theatreFeat/theatreFeatAction'
import { resetTheatreFeatActions } from '../../../features/theatreFeat/theatreFeatSlice'
import ModalLoader from '../../Loaders/ModalLoader'


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

function ChangeIdentifierModal({isOpen,set}) {

    const {loading,theatreScreenData,message} = useSelector(state=>state.theatreFeat);
    const {theatreToken} = useSelector(state=>state.theatre);
    const [tiers,setTiers] = useState([])
    const [searchParams] = useSearchParams();
    const screen_id = searchParams.get('id');

    const dispatch = useDispatch()

    useEffect(()=>{
        if(theatreScreenData?.length > 0){
            theatreScreenData.map(screen=>{
                if(screen_id == screen._id){
                    setTiers([...screen.tiers].reverse())
                }
            })
            return
        }
    },[theatreScreenData])

    useEffect(()=>{
        if(message){
            toast.success(message)
            set(false)
            dispatch(resetTheatreFeatActions())
            return
        }
    },[message])

    const handleIdentifierChange = (value,key,index,tierId)=>{
        const updatedTiers = tiers.map(tier=>{
            if(tierId == tier._id){
                const updatedLayout = tier.layout.map((obj,i)=>{
                    let objKey = Object.keys(obj)[0];
                    let objValue = obj[objKey];
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
                return {
                    ...tier,
                    layout:updatedLayout
                }
            }
            return tier
        })
        setTiers(updatedTiers)
    }

    const handleConfirm = ()=>{
        if(tiers?.length > 0){
            let keysArr = []
            let keySet = new Set();
            tiers.map(tier=>{
                for(let obj of tier.layout){
                    let key = Object.keys(obj)[0]
                    keysArr.push(key)
                    keySet.add(key)
                }
            })

            if(keySet.size !== keysArr.length){
                toast.error('Duplicate Identifiers!!')
                return
            }
            console.log("VALIDDD",[...tiers].reverse());
            const data = {tiers:[...tiers].reverse(),screen_id,key:'Identifier'}
            dispatch(theatreChangeTierOrder({data,token:theatreToken}))
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
                        <h1 className='font-medium text-lg tracking-wider text-center'>Change Identfiers</h1>
                        <div className='w-[100%] flex flex-col  gap-1 min-h-[20vh]'>
                            {
                                tiers?.length > 0 && tiers.map(tier=>{
                                    return(
                                        tier?.layout && tier?.layout.length > 0 && tier?.layout.map((obj,i)=>{
                                            let key = Object.keys(obj)[0];
                                            let value = obj[key]
                                            return(
                                            <div key={key+i} className='flex h-[100%] w-[100%] items-center'>
                                                <div className='text-white text-xs'>
                                                <select value={key} onChange={(e)=>{handleIdentifierChange(e.target.value,key,i,tier?._id)}} className='bg-black scrollbar-none w-[2.5rem] text-ellipsis overflow-hidden whitespace-nowrap' name="" id="">
                                                    <option value={key}>{key}</option>
                                                    {
                                                        Letters.map(letter=>{
                                                            if(letter !== key){
                                                                return(
                                                                    <option key={letter} value={letter}>{letter}</option>
                                                                )
                                                            }
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
                                    )
                                })
                            }
                        </div>
                        <div className='w-[100%] flex flex-col md:flex-row md:items-center justify-center gap-2 md:gap-8'>
                            <button onClick={()=>{handleConfirm()}} disabled={loading} className={loading? 'bg-[#cb9635d6] border-2 border-[#f6ae2d] text-black px-8 py-2 rounded-md text-sm md:text-base hover:bg-black hover:text-white transition-all duration-200 ease-in-out' :'bg-[#f6ae2d] border-2 border-[#f6ae2d] text-black px-8 py-2 rounded-md text-sm md:text-base hover:bg-black hover:text-white transition-all duration-200 ease-in-out'}>CONFIRM</button>
                            <button onClick={()=>set(false)} disabled={loading} className={loading ? 'bg-[#cb9635d6] border-2 border-[#f6ae2d] text-black px-8 py-2 rounded-md text-sm md:text-base hover:bg-black hover:text-white transition-all duration-200 ease-in-out' :'bg-[#f6ae2d] border-2 border-[#f6ae2d] text-black px-8 py-2 rounded-md text-sm md:text-base hover:bg-black hover:text-white transition-all duration-200 ease-in-out'}>CANCEL</button>
                        </div>
                        {loading &&
                            <ModalLoader loading={loading} />
                        }
                </motion.div>
            </div>,
            document.getElementById("trailer-modal")
          )
    }else{
        return null
    }
}

export default ChangeIdentifierModal
