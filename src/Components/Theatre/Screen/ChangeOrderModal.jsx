import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { IoIosClose } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { Toaster, toast } from 'sonner';
import { insertionSortForTiers } from '../../../utils/sorting'
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

function ChangeOrderModal({isOpen,set}) {

    const {loading,theatreScreenData,message} = useSelector(state=>state.theatreFeat)
    const {theatreToken} = useSelector(state=>state.theatre)
    const [tiers,setTiers] = useState([]);
    const [searchParams] = useSearchParams();
    const screen_id = searchParams.get('id');

    const dispatch = useDispatch()

    useEffect(()=>{
        if(theatreScreenData?.length > 0){
            theatreScreenData.map(screen=>{
                if(screen._id == screen_id){
                    setTiers(screen.tiers)
                }
            })
        }
    },[theatreScreenData])

    useEffect(()=>{
        if(message === 'Order Changed Successfully.'){
            toast.success(message)
            set(false)
            dispatch(resetTheatreFeatActions())
            return
        }
    },[message])


    const handleOrderChange = (value,tierId)=>{
        theatreScreenData.map(screen=>{
            if(screen._id == screen_id){
                setTiers(prev=> prev.map(tier=>{
                    if(tier._id == tierId){
                        return{
                            ...tier,
                            order:value ? parseInt(value) : ''
                        }
                    }
                    return tier
                }))
            }
        })
    }

    const handleConfirm = ()=>{
        let existOrder = new Set();
        for(let tier of tiers){
            if(tier.order < 1){
                toast.error('Invalid Order Range!!')
                return
            }
            if(tier.order > tiers.length){
                toast.error('Invalid Order Range!!')
                return
            }
            if(existOrder.has(tier.order)){
                toast.error('Duplicate Order!!')
                return
            }
            existOrder.add(tier.order)
        }
        const sortedTier = insertionSortForTiers([...tiers])
        console.log("SORTED",sortedTier);
        const data = {screen_id,tiers:sortedTier}
        dispatch(theatreChangeTierOrder({data,token:theatreToken}))
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
                        <h1 className='font-medium text-lg tracking-wider text-center'>Change Layout Order</h1>
                        <div className='w-[100%] flex flex-col  gap-1 min-h-[20vh]'>
                            {tiers?.length > 0 && tiers.map(tier=>{
                                return(
                                <div key={tier?._id} className='flex justify-evenly my-3'> 
                                    <h2 className='text-[#f6ae2d] text-xs md:text-base w-[50%]'>{tier?.name}</h2>
                                    <input type="number" value={tier?.order} onChange={(e)=>handleOrderChange(e.target.value,tier?._id)} className='w-[40%] md:w-[20%] text-xs md:text-base px-2 border-2 border-[#f6ae2d] rounded-sm bg-black'  />
                                </div>
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

export default ChangeOrderModal
