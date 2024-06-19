import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';

const listVariant = {
    hidden:{
        scale:0
    },
    visible:{
        scale:1,
        originY:0,
        transition:{
            duration:0.1,
            when:'beforeChildren',
            staggerChildren:0.25
        }
    },
    exit:{
        scale:0,
        originY:0,
        transition:{
            duration:0.2
        }
    }
}

function Filter({type,data,set}) {
    const [filter,setFilter] = useState('')
    const [hide,setHide] = useState(true);
    useEffect(()=>{
        setFilter(type)
    },[type])
  return (
    <div className='flex flex-col gap-3  '>
        <label className='text-white font-medium'>{type}</label>
        <button onClick={()=>setHide(!hide)} type='button' className='text-black font-medium border-2 border-[#f6ae2d] bg-[#f6ae2d] rounded-md px-6 py-2 min-w-[10rem] text-sm hover:bg-black hover:text-white transition-all duration-250 ease-in-out relative'>{(filter === type) ? `Select ${type}` : filter}
            <AnimatePresence>
            {!hide && 
            <motion.ul
            variants={listVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            className='absolute right-0 top-10 bg-black text-white rounded-sm w-[100%] h-[10rem] overflow-y-scroll z-10'>
                {
                    data && data.length > 0 && data.map(obj=>{
                        return (
                            <motion.li key={obj?.["id"]} onClick={()=>{setFilter(obj?.["name"]);setHide(true);set(obj?.["id"])}} 
                            className='py-4 text-sm px-10 border-2 border-[#f6ae2d] hover:bg-[#f6ae2d] hover:text-black'>{obj?.["name"]}</motion.li>            
                        )
                    })
                }
                
            </motion.ul>}
            </AnimatePresence>
        </button>       
        </div>
  )
}

export default Filter
