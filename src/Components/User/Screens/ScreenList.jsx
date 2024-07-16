import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userGetTheatres } from '../../../features/userTheatres/userTheatreActions'
import ScreenMapModal from './ScreenMapModal';
import { useNavigate } from 'react-router';

function ScreenList() {
    const [isOpen,setIsOpen] = useState(false);
    const {allTheatresData} = useSelector(state=>state.userTheatre)
    const [theatreTo,setTheatreTo] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
        if(localStorage.getItem('city')){
            const loc = JSON.parse(localStorage.getItem('city')).loc;
            dispatch(userGetTheatres({location:loc}))
        }else{
            dispatch(userGetTheatres())
        }
    },[])

  return (
    <div className='py-10 bg-[#15121B] '>
        <div className='pt-28 px-12  min-h-[10rem]'>
            <h5 className='text-white text-4xl font-semibold tracking-widest'>SCREENS</h5>
            <div className='flex flex-wrap justify-evenly gap-8 my-10'>
            {
                allTheatresData && allTheatresData.length > 0 &&
                allTheatresData.map(theatre=>{
                    return (
                        <div key={theatre?._id}  className=' border-2 border-[#f6ae2d] cursor-pointer rounded-md p-6 w-[90%] sm:w-[45%] md:w-[30%] bg-black flex flex-col gap-6'>
                            <h3 onClick={()=>navigate(`/screenwithmovies?theatre_id=${theatre._id}`)} className='text-[#f6ae2d] font-medium'>{theatre?.name}</h3> 
                            <h6 className='text-white text-xs'>{theatre?.address?.completeLocation}</h6>
                            <button onClick={()=>{setIsOpen(true);setTheatreTo(theatre)}} className='text-right text-[#f6ae2d] text-xs'>View in map</button>
                        </div>
                    )
                })
            }

            </div>
        </div>
        <ScreenMapModal isOpen={isOpen} theatre={theatreTo} set={setIsOpen} />
    </div>
  )
}

export default ScreenList
