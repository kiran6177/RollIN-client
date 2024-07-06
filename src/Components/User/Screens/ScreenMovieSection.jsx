import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userGetSingleTheatre } from '../../../features/userTheatres/userTheatreActions'
import ScreenImageModal from './ScreenImageModal'
import { FaInfoCircle } from "react-icons/fa";

function ScreenMovieSection() {
    const [searchParams] = useSearchParams()
    const dispatch = useDispatch()
    const theatre_id = searchParams.get("theatre_id")
    const {theatresDetailData} = useSelector(state=>state.userTheatre)

    const [showImage,setShowImage] = useState(false)
    const [singleTheatre,setSingleTheatre] = useState(null);

    const [movieShows,setMovieShows] = useState(null)
    useEffect(()=>{
        if(theatresDetailData?.length > 0){
            let theatreFound = false;
            for(let theatre of theatresDetailData){
                if(theatre._id == theatre_id){
                    setSingleTheatre(theatre)
                    theatreFound = true;
                    break;
                }
            }
            if(!theatreFound){
            dispatch(userGetSingleTheatre({theatre_id}))
            }
        }else{
            dispatch(userGetSingleTheatre({theatre_id}))
        }
    },[theatresDetailData]) 

    // useEffect(()=>{
    //     if(singleTheatre?.screenData?.length > 0){
    //         let movieWithShowtimes = {};
    //         singleTheatre.screenData.forEach(screen=>{
    //             if(screen?.running_movies?.length > 0 && screen?.showtimes?.length > 0){
    //                 screen.running_movies.forEach(movie=>{
    //                     let showTimes = []
    //                     screen.showtimes.forEach(show=>{
    //                         if(show.movie_id == movie.movie_id){
    //                             showTimes.push(show)
    //                         }
    //                     })
    //                     if(movieWithShowtimes[movie._id]){
    //                         movieWithShowtimes[movie._id].shows.push(showTimes)
    //                     }else{
    //                         movieWithShowtimes[movie._id] = {
    //                             ...movie,
    //                             shows:showTimes
    //                         }
    //                     }
    //                 })
    //             }
    //         })
    //         console.log(movieWithShowtimes);
    //     }
    // },[singleTheatre])


    useEffect(()=>{
        if(singleTheatre?.screenData?.length > 0){
            let moviesWithShowTimes = {}
            let showTimeWithMovie = {}
            singleTheatre.screenData.forEach(screen=>{
                if(screen?.showtimes?.length > 0){
                    screen.showtimes.forEach(show=>{
                        const showData = {...show,screen_id:screen._id}
                        if(showTimeWithMovie[show.movie_id]){
                            showTimeWithMovie[show.movie_id].push(showData)
                        }else{
                            showTimeWithMovie[show.movie_id] = [showData]
                        }
                    })
                }
            })

            singleTheatre.screenData.forEach(screen=>{
                if(screen?.showtimes?.length > 0){
                    screen.running_movies.forEach(movie=>{
                        const show = showTimeWithMovie[movie.movie_id] || []
                        if(!moviesWithShowTimes[movie.movie_id]){
                            moviesWithShowTimes[movie.movie_id] = {
                                ...movie,
                                shows:show
                            }
                        }
                    })
                }
            })
            console.log(moviesWithShowTimes);
            // setMovieShows(moviesWithShowTimes)
        }
    },[singleTheatre])

  return (
    <div className='py-10 bg-[#15121B] '>
        <div className='pt-28 px-12  min-h-[10rem] '>
            <div className='border-2 border-[#f6ae2d] rounded-sm bg-black '>
                <div className='border-b-2 border-[#f6ae2d] py-6 px-10 flex flex-col gap-4'>
                    <h5 className='text-[#f6ae2d] text-3xl sm:text-4xl font-semibold tracking-widest flex gap-5 items-center'>{singleTheatre?.name} <FaInfoCircle onClick={()=>setShowImage(true)} className='text-[#cdcdcdd7] w-[1.3rem] hover:text-white transition-all duration-150 ease' /> </h5>
                    <h6 className='text-white text-md sm:text-base'>{singleTheatre?.address?.completeLocation}</h6>
                    
                    
                </div>
                <div className='bg-[#cc9329] px-4 py-3 flex gap-5 items-center text-xs md:text-sm tracking-widest overflow-x-scroll'>
                    <span className=' border-2 h-[2rem] px-3 -rotate-90 bg-black rounded-md text-white flex items-center border-black '>JUL</span>
                    <button className='flex flex-col items-center border-2 border-black rounded-md bg-[#f6ae2d]  px-3 py-7 '><span className='font-medium'>WED</span><span className='font-medium'>24</span></button>
                    <button className='flex flex-col items-center border-2 border-[#f6ae2d] rounded-md bg-black text-white  px-3 py-7 '><span className='font-medium'>WED</span><span className='font-medium'>24</span></button>
                    <button className='flex flex-col items-center border-2 border-[#f6ae2d] rounded-md bg-black text-white  px-3 py-7 '><span className='font-medium'>WED</span><span className='font-medium'>24</span></button>
                    <button className='flex flex-col items-center border-2 border-[#f6ae2d] rounded-md bg-black text-white  px-3 py-7 '><span className='font-medium'>WED</span><span className='font-medium'>24</span></button>
                    <button className='flex flex-col items-center border-2 border-[#f6ae2d] rounded-md bg-black text-white  px-3 py-7 '><span className='font-medium'>WED</span><span className='font-medium'>24</span></button>
                </div>
                <div className='text-white py-8 px-8 flex flex-col gap-5'>
                    
                    {
                        movieShows &&
                        Object.entries(movieShows).map(([movie_id,showData])=>{
                            return(
                                <div key={movie_id} className='flex flex-col md:flex-row gap-4 md:gap-0 border-2 rounded-sm border-[#f6ae2d] p-6 shadow-[0px_0px_25px_rgba(246,175,46,0.3)]'>
                                    <div className='w-[45%] lg:w-[25%] flex flex-col gap-1'>
                                        <h1 className='text-[#f6ae2d] tracking-widest font-medium text-base cursor-pointer' >{showData?.title}</h1>
                                        <h3 className='text-[10px] sm:text-xs'>{showData?.language}</h3>
                                    </div>
                                    <div className='flex flex-wrap gap-7'> 
                                        {
                                            showData?.shows?.length > 0 && showData?.shows.map(show=>{
                                                return(
                                                    <p key={show?._id} className='border-2 flex items-center p-2 lg:p-3 text-xs sm:text-sm rounded-md tracking-wider'>{show?.showtime}</p>
                                                )
                                            })
                                        }

                                    </div>
                                </div>
                            )
                        })
                    }
                    

                </div>
            </div>
            <ScreenImageModal isOpen={showImage} set={setShowImage} theatre={singleTheatre} />
        </div>
    </div>
  )
}

export default ScreenMovieSection
