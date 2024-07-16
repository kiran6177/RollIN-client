import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { Toaster } from 'sonner'
import oppen from '../../../assets/MV5BOWMyNTA2M2UtMmZkNC00ZWE5LThjZGItODcxNGU2MDBhYTk1XkEyXkFqcGdeQXVyOTU0NjY5MzM@._V1_.jpg'
import pinlogo from '../../../assets/pin-logo.png'
import MovieCard2 from '../Movies/MovieCard2';
import { setSinglePerson } from '../../../features/movie/movieSlice';
import { userGetPerson } from '../../../features/userMovies/userMovieActions';

function PersonDetail() {
    const dispatch = useDispatch()
    const [searchParams] = useSearchParams()
    const personid = searchParams.get("person_id")
    const [personData,setPersonData] = useState(null);

    const {allPersonData} = useSelector(state=>state.userMovie)
    useEffect(()=>{
        console.log(personid);
        if(allPersonData?.length > 0){
            let personFound = false;
            allPersonData.forEach(person=>{
                if(person._id == personid){
                    setPersonData(person)
                    personFound = true;
                }
            })
            if(!personFound){
                dispatch(userGetPerson({person_id:personid}))
            }
        }else{
            dispatch(userGetPerson({person_id:personid}))
        }
    },[allPersonData]) 

  return (
    <div className='pt-28  min-h-[100vh] bg-[#15121B]'>
        <Toaster richColors />
            <div className='mt-4 w-[80%] lg:w-[90%]  px-8 py-16  rounded-md  mx-auto overflow-hidden'>
                <div className='flex flex-col lg:flex-row items-center  lg:justify-center gap-12 lg:gap-20'>
                    <div className='h-[15rem] sm:h-[18rem] rounded-full hover:scale-[1.05] transition-all duration-200 ease-in-out overflow-hidden w-[15rem] sm:w-[18rem] border-2 border-[#15121B] shadow-[0px_0px_75px_rgba(246,174,45,0.75)] '>
                        <img src={personData?.profile_path} alt="" className='w-[100%] object-cover mx-auto'/>
                    </div>
                    <div className='text-white w-[100%] text-xs sm:text-sm lg:text-base lg:w-[60%] flex flex-col gap-8'>
                        <div className='flex my-4'>
                            <h2 className='text-xl tracking-widest font-semibold md:text-3xl'>{personData?.name}</h2>
                        </div>

                        <div className='flex justify-between'>
                            <h6 className='w-[30%] text-[#f6ae2d]'>GENDER</h6>
                            <h6 className='text-start w-[50%]'>{personData?.gender}</h6>
                        </div>
                        <div className='flex justify-between'>
                            <h6 className='w-[30%] text-[#f6ae2d]'>BORN</h6>
                            <h6 className='text-start w-[50%]'>{personData?.birthday.toString().split('T')[0]}</h6>
                        </div>
                        <div className='flex justify-between'>
                            <h6 className='w-[30%] text-[#f6ae2d]'>BIRTHPLACE</h6>
                            <h6 className='text-start w-[50%]'>{personData?.birth_place}</h6>
                        </div>
                        <div className='flex justify-between'>
                            <h6 className='w-[30%] text-[#f6ae2d]'>OCCUPATION</h6>
                            <h6 className='text-start w-[50%]'>{personData?.department}</h6>
                        </div>

                    </div>
                </div>
                <div className='my-20'>
                    <div className='h-[2rem] flex gap-1 sm:gap-4'>
                      <img src={pinlogo} alt="" className='object-cover h-full' />
                      <h1 className='text-base sm:text-lg font-medium tracking-wider text-white'>ABOUT</h1>
                    </div>
                    <div className='text-xs leading-8 md:text-base md:leading-10 text-white'>
                    {personData?.biography ? personData.biography : 'NOT AVAILBALE'}
                    </div>
                </div>
                <div className='mt-20'>
                    <div className='h-[2rem] flex gap-1 sm:gap-4'>
                      <img src={pinlogo} alt="" className='object-cover h-full' />
                      <h1 className='text-base sm:text-lg font-medium tracking-wider text-white'>Popular Movies</h1>
                    </div>
                    <div className='flex gap-6 overflow-x-scroll p-6 snap-x scrollbar-none'>
                        {   personData?.moviesOfPerson && personData.moviesOfPerson.length > 0 &&
                            personData.moviesOfPerson.map(movie=>{
                                return(
                                    <MovieCard2 key={movie?._id} movie={movie}/>
                                )
                            })
                        }

                    </div>
                </div>
            </div> 
    </div>
  )
} 

export default PersonDetail
