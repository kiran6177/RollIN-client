import React, { useEffect, useRef, useState } from 'react'
import { Toaster } from 'sonner'
import PersonCard from './PersonCard'
import { useDispatch, useSelector } from 'react-redux'
import { adminGetPersonsFromDB } from '../../../features/movie/movieActions'
import InfiniteScroll from 'react-infinite-scroll-component'
import { ScaleLoader } from 'react-spinners'
import { resetPersons } from '../../../features/movie/movieSlice'

function PersonHome() {
    const {adminToken} = useSelector(state=>state.admin)
    const {personData} = useSelector(state=>state.movie)
    const [page,setPage] = useState(1);
    const dispatch = useDispatch()

    const scrollRef = useRef(null)

    useEffect(()=>{
        dispatch(resetPersons())
        dispatch(adminGetPersonsFromDB({page:page,token:adminToken}))
    },[])

    useEffect(()=>{
        if(personData?.length > 0){
          setPage((prev)=>prev+1)
        }
      },[personData])

    const nextPage = ()=>{
        console.log("next",page);
        dispatch(adminGetPersonsFromDB({page,token:adminToken}))
      }

  return (
    <div className='pt-28 lg:pl-56 min-h-[100vh] bg-[#15121B]'>
      <Toaster richColors />
        <div className='p-8 sm:p-12 w-[95%] mx-auto'>
            <h2 className='text-white font-semibold text-lg sm:text-2xl lg:text-4xl my-5'>PERSON</h2>
                <div ref={scrollRef} className='my-6 mx-auto flex flex-wrap gap-6 justify-evenly '>
                {
                    personData &&  personData.length > 0 ?
                    <InfiniteScroll dataLength={personData?.length} scrollThreshold={'10px'} scrollableTarget={scrollRef} next={nextPage} loader={<ScaleLoader className='absolute -bottom-[6rem] ' color='#f6ae2d'/>} hasMore={true} className='my-6 py-4 px-2 mx-auto flex flex-wrap gap-7 relative  justify-evenly scrollbar-none'>
                    {
                    personData.map((person,i)=>{
                    return (
                        <PersonCard key={person?._id + i} person={person} type={'crew'}/>
                    )
                    })
                    }
                    </InfiniteScroll>
                    : <div className='text-white tracking-widest'> NO PERSONS FOUND.</div>
                }
                </div>
        </div>
    </div>
  )
}

export default PersonHome

