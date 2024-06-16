import React, { useEffect, useState } from 'react'
import { Toaster, toast } from 'sonner'
import oppenbanner from '../../../assets/MM-1207 Oppenheimer.jpg'
import pinlogo from '../../../assets/pin-logo.png'
import { FaRegCalendar } from 'react-icons/fa'
import { MdOutlineTimer } from "react-icons/md";
import { FaLanguage } from 'react-icons/fa6'
import { useAnimate } from 'framer-motion'
import CastIcon from './CastIcon'
import MovieCard2 from './MovieCard2'
import { IoMdPlayCircle } from "react-icons/io";
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { adminAddMovieToDB, adminGetTMDBMovieDetail } from '../../../features/movie/movieActions'
import TrailerModal from './TrailerModal'
import ReleaseModal from './ReleaseModal'
import { resetMovieActions } from '../../../features/movie/movieSlice'

function MovieDetail() {
  const [scope,animate] = useAnimate();
  const [scope1,animate1] = useAnimate();
  const [searchParams] = useSearchParams()
  const  {addMoviesData,singleMovieDetail,error,moviesData} = useSelector(state=>state.movie);
  const {adminToken} = useSelector(state=>state.admin);
  let movieid = searchParams.get("id");

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showTrailer,setShowTrailer] = useState(false);
  const [showConfirm,setShowConfirm] = useState(false);

  useEffect(()=>{
    window.scrollTo(0,0)
  },[singleMovieDetail])

  useEffect(()=>{
    console.log(movieid);
    dispatch(adminGetTMDBMovieDetail({movieid,token:adminToken}))
  },[movieid])

  useEffect(()=>{
    if(error && error.length > 0){
      error.map(err=>toast.error(err))
      dispatch(resetMovieActions())
    }

  },[error])

  const handleAddMovie = ()=>{
    console.log("hvjvj");
    animate("button",{x:[0,'54%']})
    animate1("button",{x:[0,'54%']})
    setTimeout(()=>{setShowConfirm(true)},250)
  }

  const dispactchAddMovie = (release_date)=>{
    console.log(release_date);
    dispatch(adminAddMovieToDB({movieid,release_date,token:adminToken})) 
  }

  return (
    <>
    <div className='pt-28 lg:pl-56 min-h-[100vh] bg-[#15121B]'>
    <Toaster richColors />
    <div className='mt-4 w-[80%] lg:w-[90%] border-2 border-[#f6ae2d] rounded-md bg-black mx-auto overflow-hidden'>
      <div className='relative '>
        <div className='absolute inset-x-0 -bottom-0 bg-gradient-to-t from-black to-transparent h-[90%]'></div>
        <div className='absolute  bottom-[2rem] lg:bottom-[8rem] xl:bottom-[15rem] hidden sm:flex flex-col gap-2 md:gap-6 my-4 lg:my-0 lg:gap-0 lg:flex-row lg:justify-between w-[100%]'>
          <div className='text-white  pl-10 flex flex-col gap-1 md:gap-4 drop-shadow-[2px_2px_10px_rgba(0,0,0,1)]'>
              <h2 className='text-xl lg:text-4xl font-semibold'>{singleMovieDetail?.title}</h2>
              <div className=' flex gap-1 flex-wrap md:gap-8'>
              <h5 className='text-[12px] sm:text-xs lg:text-sm h-[2rem] gap-3 flex items-center'><img src={pinlogo} alt="" className='object-cover h-[100%]'  />{singleMovieDetail?.genres[0] ? singleMovieDetail.genres[0].name:""}{singleMovieDetail?.genres[1] ?" / "+singleMovieDetail.genres[1].name:""}{singleMovieDetail?.genres[2] ? " / "+singleMovieDetail.genres[2].name:""}</h5>
              <h5 className='text-[12px] sm:text-xs lg:text-sm h-[2rem] gap-3 flex items-center'><FaRegCalendar className='text-[#f6ae2d] w-[2rem] h-[1.2rem]' />{singleMovieDetail?.release_date?.split('-')[0]}</h5>
              <h5 className='text-[12px] sm:text-xs lg:text-sm h-[2rem] gap-3 flex items-center'><MdOutlineTimer className='text-[#f6ae2d] w-[2rem] h-[1.2rem]' />{singleMovieDetail?.runtime+" min"}</h5>
              </div>
              <div className='h-[2rem] flex gap-8'>
              <h5 className='text-xs lg:text-sm  h-[2rem] gap-3 flex items-center'><FaLanguage className='text-[#f6ae2d] w-[2rem] h-[1.2rem]' />{singleMovieDetail?.language}</h5>
              </div>
          </div>
          <div  className='text-white pl-10 lg:pr-10 text-sm sm:text-md lg:text-xl flex items-start gap-2 drop-shadow-[2px_2px_10px_rgba(0,0,0,1)]'>
              <h3 className='text-[#f6ae2d] font-semibold'>Rating : </h3>
              <h3>{parseInt(singleMovieDetail?.rating)} / 10</h3>
          </div>
        </div>
        <div ref={scope} className='hidden sm:block absolute -bottom-8 lg:bottom-[2rem] xl:bottom-[8rem]  mx-8 md:mx-12 border-2 border-[#f6ae2d] bg-black w-[15rem] sm:w-[17rem] md:w-[20rem] lg:w-[25rem] rounded-full overflow-hidden'>
        <button onClick={handleAddMovie} className=' text-black font-medium tracking-widest border-2 border-black m-2 bg-[#f6ae2d] text-xs px-6 sm:px-10  md:px-12  lg:px-20 py-1 md:py-3 rounded-full'>ADD MOVIE</button>
        </div>
        <IoMdPlayCircle onClick={()=>setShowTrailer(true)} className='absolute text-[#9d9d9d8a] h-[2rem] md:h-[3rem] w-[2rem] md:w-[3rem] left-[47%] top-[32%] hover:text-white hover:scale-[1.1] transition-all duration-150 ease-in-out '/>
        <img src={singleMovieDetail?.backdrop_path} width={"100%"} alt="" />
      </div>
 
      <div className=' '>
        <div className='sm:hidden flex flex-col gap-2 md:gap-6 my-4 lg:my-0 lg:gap-0 lg:flex-row lg:justify-between w-[100%]'>
          <div className='text-white  px-8 flex flex-col gap-1 md:gap-4 drop-shadow-[2px_2px_10px_rgba(0,0,0,1)]'>
              <h2 className='text-xl lg:text-4xl font-semibold'>{singleMovieDetail?.title}</h2>
              <div className=' flex gap-1 flex-wrap md:gap-8'>
              <h5 className='text-[12px] sm:text-xs lg:text-sm h-[2rem] gap-3 flex items-center'><img src={pinlogo} alt="" className='object-cover h-[100%]'  />{singleMovieDetail?.genres[0] ? singleMovieDetail.genres[0].name:""}{singleMovieDetail?.genres[1] ?" / "+singleMovieDetail.genres[1].name:""}{singleMovieDetail?.genres[2] ? " / "+singleMovieDetail.genres[2].name:""}</h5>
              <h5 className='text-[12px] sm:text-xs lg:text-sm h-[2rem] gap-3 flex items-center'><FaRegCalendar className='text-[#f6ae2d] w-[2rem] h-[1.2rem]' />{singleMovieDetail?.release_date?.split('-')[0]}</h5>
              <h5 className='text-[12px] sm:text-xs lg:text-sm h-[2rem] gap-3 flex items-center'><MdOutlineTimer className='text-[#f6ae2d] w-[2rem] h-[1.2rem]' />{singleMovieDetail?.runtime+" min"}</h5>
              </div>
              <div className='h-[2rem] flex gap-8'>
              <h5 className='text-xs lg:text-sm  h-[2rem] gap-3 flex items-center'><FaLanguage className='text-[#f6ae2d] w-[2rem] h-[1.2rem]' />{singleMovieDetail?.language}</h5>
              </div>
          </div>
          <div  className='text-white pl-8 lg:pr-10 text-sm sm:text-md lg:text-xl flex items-start gap-2 drop-shadow-[2px_2px_10px_rgba(0,0,0,1)]'>
              <h3 className='text-[#f6ae2d] font-semibold'>Rating : </h3>
              <h3>{parseInt(singleMovieDetail?.rating)} / 10</h3>
          </div>
        </div>
        <div ref={scope1} className='block sm:hidden  mx-8 sm:mx-16 border-2 border-[#f6ae2d] bg-black w-[12rem] sm:w-[17rem] md:w-[20rem] lg:w-[25rem] rounded-full overflow-hidden'>
        <button onClick={handleAddMovie} className=' text-black font-medium tracking-widest border-2 border-black m-2 bg-[#f6ae2d] text-[10px] px-5 sm:px-10  md:px-12  lg:px-20 py-1 md:py-3 rounded-full'>ADD MOVIE</button>
        </div>
      </div>

      <div className='px-8 sm:px-10 mt-6 lg:mt-0'>

        <div className='py-10 text-white flex flex-col gap-4 w-[95%] '>
          <div className='h-[2rem] flex gap-1 sm:gap-4'>
            <img src={pinlogo} alt="" className='object-cover h-full' />
            <h1 className='text-base sm:text-lg font-medium tracking-wide'>About the Movie</h1>
          </div>
            <div className='text-xs leading-8 md:text-base md:leading-10 '>
              {singleMovieDetail?.overview}
            </div>
        </div>

        <div className='py-10 text-white flex flex-col gap-4 w-[100%] '>
          <div className='h-[2rem] flex gap-1 sm:gap-4'>
            <img src={pinlogo} alt="" className='object-cover h-full' />
            <h1 className='text-base sm:text-lg font-medium tracking-wide'>Cast</h1>
          </div>

          <div className='flex gap-8 overflow-x-scroll p-6 snap-x scrollbar-none'>
            {
              singleMovieDetail?.cast && singleMovieDetail.cast.length > 0 &&
              singleMovieDetail?.cast.map((person,i)=>{
                  return (<CastIcon key={person.person_id + i} person={person} type="cast" />)
              })
            }
          </div>
 
        </div>

        <div className='py-10 text-white flex flex-col gap-4 w-[100%] '>
          <div className='h-[2rem] flex gap-1 sm:gap-4'>
            <img src={pinlogo} alt="" className='object-cover h-full' />
            <h1 className='text-base sm:text-lg font-medium tracking-wide'>Crew</h1>
          </div>

          <div className='flex gap-8 overflow-x-scroll p-6 snap-x scrollbar-none'>
          {
              singleMovieDetail?.crew && singleMovieDetail.crew.length > 0 &&
              singleMovieDetail?.crew.map((person,i)=>{
                  return (<CastIcon key={person.person_id + i} person={person} type="crew" />)
              })
            }

          </div>

        </div>

        <div className='py-10 text-white flex flex-col gap-4 w-[95%] '>
          <div className='h-[2rem] flex gap-1 sm:gap-4'>
            <img src={pinlogo} alt="" className='object-cover h-full' />
            <h1 className='text-base sm:text-lg font-medium tracking-wide'>You might also like</h1>
          </div>
            <div className='flex gap-6 overflow-x-scroll p-6 snap-x scrollbar-none'>
              {
                addMoviesData ? addMoviesData.length > 0 &&
                addMoviesData.map((movie,i)=>{
                  if(movie.movie_id != movieid ){
                    return <MovieCard2 key={movie.movie_id+i} movie={movie} />
                  }
                  return null
                })
                :
                moviesData ? moviesData.length > 0 &&
                moviesData.map((movie,i)=>{
                  if(movie.movie_id != movieid ){
                    return <MovieCard2 key={movie.movie_id+i} movie={movie} />
                  }
                  return null
                }) : ''
              }
            </div>
        </div>
        
      </div>
      
    </div>
    </div> 
    <TrailerModal isOpen={showTrailer} set={setShowTrailer} videoKey={singleMovieDetail?.video_link} />
    <ReleaseModal isOpen={showConfirm} set={setShowConfirm} handleAction={dispactchAddMovie}/>
    </>
  )
}
  
export default MovieDetail
