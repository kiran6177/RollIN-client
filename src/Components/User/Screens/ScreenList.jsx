import React, { lazy, Suspense, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userGetTheatres } from '../../../features/userTheatres/userTheatreActions'
import ScreenBoxSkelton from '../../../Skelton/ScreenBoxSkelton';
const ScreenBox = lazy(()=>import('./ScreenBox'));
const ScreenMapModal = lazy(()=>import('./ScreenMapModal'));

function ScreenList() {
    const [isOpen,setIsOpen] = useState(false);
    const {allTheatresData} = useSelector(state=>state.userTheatre)
    const [theatreTo,setTheatreTo] = useState(null)
    const dispatch = useDispatch()

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
                        <Suspense key={theatre?._id} fallback={<ScreenBoxSkelton/>}>
                            <ScreenBox  setTheatreTo={setTheatreTo} setIsOpen={setIsOpen} theatre={theatre}/>
                        </Suspense>
                    )
                })
            }
            </div>
        </div>
        <Suspense><ScreenMapModal isOpen={isOpen} theatre={theatreTo} set={setIsOpen} /></Suspense>
    </div>
  )
}

export default ScreenList
