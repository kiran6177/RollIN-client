import React, {  lazy, Suspense, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import pinlogo from '../../../assets/pin-logo.png'
import { FaRegCalendar } from 'react-icons/fa';
import { MdOutlineTimer } from 'react-icons/md';
import { AnimatePresence , motion } from 'framer-motion';
import { userGetBannerMovies, userGetMoviesByGenre } from '../../../features/userMovies/userMovieActions';
import { IoMdPlayCircle } from 'react-icons/io';
import { userGetRecommendedMovies, userGetUpcomingMovies } from '../../../features/userBooking/userBookingActions';
import MovieCard2Skelton from '../../../Skelton/MovieCard2Skelton';
const TrailerModal = lazy(()=>import('../Movies/TrailerModal'));
const MovieCard2 = lazy(()=>import('../../User/Movies/MovieCard2'))

function Home() {
    const {userData,userToken,socket} = useSelector(state=>state.user);
    const {bannerMovies,moviesByGenre} = useSelector(state=>state.userMovie)
    const {upcomingMovies,recommendedMovies} = useSelector(state=>state.userBooking)
    const navigate = useNavigate()
    const [index,setIndex] = useState(0)
    const [showTrailer,setShowTrailer] = useState(false);
    const dispatch = useDispatch()


    useEffect(()=>{
      if(localStorage.getItem('city')){
        const loc = JSON.parse(localStorage.getItem('city')).loc;
        dispatch(userGetBannerMovies({location:loc}))
        dispatch(userGetMoviesByGenre({location:loc}))
        dispatch(userGetUpcomingMovies({data:{location:loc},token:userToken}))
        dispatch(userGetRecommendedMovies({data:{location:loc},token:userToken}))
      }else{
        dispatch(userGetBannerMovies())
        dispatch(userGetMoviesByGenre())
      }
      
    },[])

    useEffect(()=>{
      if(bannerMovies && moviesByGenre){
        window.scrollTo(0,0)  
      }
    },[bannerMovies,moviesByGenre])

    useEffect(()=>{
        let timer;
        if(showTrailer){
          clearInterval(timer)
          return
        }
        if(bannerMovies){
          console.log("TIMER STARTED");
          timer = setInterval(()=>{
            setIndex(prev => (prev === (bannerMovies?.length - 1) ? 0 : prev + 1));
          },6000)
  
        }
        return ()=>{
          clearInterval(timer)
        }
    },[showTrailer,bannerMovies])

  return (
    <div className='pt-2 bg-[#15121B] '>
        <div className='relative text-white min-h-[25vh] sm:h-[55vh] md:h-[60vh] lg:h-[70vh] xl:h-[80vh] overflow-hidden'>
          {
            bannerMovies &&
          <AnimatePresence mode='wait'>

          <motion.div
          key={bannerMovies[index]?._id}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 , delay:0.10 ,ease : 'easeInOut'}}
          className='w-[100%] h-[100%]'>
          <div className='absolute bg-gradient-to-t from-[#15121b] w-[100%] to-transparent min-h-[90%] bottom-0 '></div>
            <motion.div 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.10 ,ease : 'easeInOut'}}  
            className='hidden mx-16 md:flex flex-col gap-4 absolute md:bottom-[1rem] lg:bottom-[2rem] xl:bottom-[6rem] '>
              <h2 className='text-xl  tracking-wider drop-shadow-2xl lg:text-4xl font-semibold '>{bannerMovies[index]?.title}</h2>
              <div className=' flex gap-1 flex-wrap md:gap-8 '>
                  <h5 className='text-[12px] sm:text-xs lg:text-sm h-[2rem] gap-3 flex items-center'><img src={pinlogo} alt="" className='object-cover h-[100%]'  />{bannerMovies[index]?.genres[0] ? bannerMovies[index]?.genres[0] : '' }{bannerMovies[index]?.genres[1] ?" / "+ bannerMovies[index]?.genres[1] : '' }{bannerMovies[index]?.genres[2] ?" / "+ bannerMovies[index]?.genres[2] : '' }</h5>
                  <h5 className='text-[12px] sm:text-xs lg:text-sm h-[2rem] gap-3 flex items-center'><FaRegCalendar className='text-[#f6ae2d] w-[2rem] h-[1.2rem]' />{bannerMovies[index]?.release_date.split('-')[0]}</h5>
                  <h5 className='text-[12px] sm:text-xs lg:text-sm h-[2rem] gap-3 flex items-center'><MdOutlineTimer className='text-[#f6ae2d] w-[2rem] h-[1.2rem]' />{bannerMovies[index]?.runtime + " min"}</h5>
              </div> 
                {
                (!bannerMovies[index]?.isDislocated && !bannerMovies[index]?.isDisabled) && 
                <div className='flex w-[100%]'>
                  {bannerMovies[index]?.isAssigned ? <button onClick={()=>navigate(`/moviewithscreens?movie_id=${bannerMovies[index]?._id}`)} className='w-[80%] text-black font-medium tracking-widest border-2 border-black m-2 bg-[#f6ae2d] text-xs px-6 sm:px-10  md:px-12  lg:px-20 py-1 md:py-3 rounded-full'>BOOK TICKETS</button> : <button onClick={()=>{}} className='w-[80%] text-black font-medium tracking-widest border-2 border-black m-2 bg-[#f6ae2d] text-xs px-6 sm:px-10  md:px-12  lg:px-20 py-1 md:py-3 rounded-full'>SET REMINDER</button>}
                  <button onClick={()=>navigate(`/moviedetail?movie_id=${bannerMovies[index]?._id}`)}  className=' text-black font-medium tracking-widest border-2 border-black m-2 bg-[#f6ae2d] text-xs px-2 sm:px-6  md:px-8  lg:px-10 py-1 md:py-3 rounded-full'>MORE</button>
                </div>
                }
            </motion.div>
            <IoMdPlayCircle onClick={()=>setShowTrailer(true)} className='absolute text-[#9d9d9d8a] h-[2rem] md:h-[3rem] w-[2rem] md:w-[3rem] left-[49%] top-[48%] hover:text-white hover:scale-[1.1] transition-all duration-150 ease-in-out '/>
            <div className='mt-24 md:mt-0  mx-auto aspect-video w-[100%]'>
            <img src={bannerMovies[index]?.backdrop_path}  alt="" className=' object-cover w-[100%]' />
            </div>
          <Suspense fallback={<MovieCard2Skelton/>} >
            <TrailerModal isOpen={showTrailer} set={setShowTrailer} videoKey={bannerMovies[index]?.video_link} />
          </Suspense>
          </motion.div>
          </AnimatePresence>
          }
        </div>
        <div className='block md:hidden'>
          {
            bannerMovies &&
          <AnimatePresence mode='wait'>
          <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.10 ,ease : 'easeInOut'}} 
           className='mx-6 flex flex-col gap-4 text-white'>
          <h2 className='text-xl  tracking-wider drop-shadow-2xl lg:text-4xl font-semibold '>{bannerMovies[index]?.title}</h2>
          {/* <div className=' flex gap-1 flex-wrap md:gap-8 '>
              <h5 className='text-[12px] sm:text-xs lg:text-sm h-[2rem] gap-3 flex items-center'><img src={pinlogo} alt="" className='object-cover h-[100%]'  />{bannerMovies[index]?.genres[0] ? bannerMovies[index]?.genres[0] : '' }{bannerMovies[index]?.genres[1] ?" / "+ bannerMovies[index]?.genres[1] : '' }{bannerMovies[index]?.genres[2] ?" / "+ bannerMovies[index]?.genres[2] : '' }</h5>
              <h5 className='text-[12px] sm:text-xs lg:text-sm h-[2rem] gap-3 flex items-center'><FaRegCalendar className='text-[#f6ae2d] w-[2rem] h-[1.2rem]' />{bannerMovies[index]?.release_date.split('-')[0]}</h5>
              <h5 className='text-[12px] sm:text-xs lg:text-sm h-[2rem] gap-3 flex items-center'><MdOutlineTimer className='text-[#f6ae2d] w-[2rem] h-[1.2rem]' />{bannerMovies[index]?.runtime + " min"}</h5>
          </div> */}
          { 
          (!bannerMovies[index]?.isDislocated && !bannerMovies[index]?.isDisabled) && 
          <div className='flex flex-col sm:flex-row w-[65%] sm:w-[50%]'>
            {bannerMovies[index]?.isAssigned ? <button onClick={()=>navigate(`/moviewithscreens?movie_id=${bannerMovies[index]?._id}`)} className='  text-black font-medium tracking-widest border-2 border-black m-2 bg-[#f6ae2d] text-xs px-6 sm:px-10  md:px-12  lg:px-20 py-[6px] md:py-3 rounded-full'>BOOK TICKETS</button> : <button onClick={()=>navigate(`/moviewithscreens?movie_id=${bannerMovies[index]?._id}`)} className='  text-black font-medium tracking-widest border-2 border-black m-2 bg-[#f6ae2d] text-xs px-6 sm:px-10  md:px-12  lg:px-20 py-[6px] md:py-3 rounded-full'>SET REMINDER</button>}
            <button onClick={()=>navigate(`/moviedetail?movie_id=${bannerMovies[index]?._id}`)}  className='  text-black font-medium tracking-widest border-2 border-black m-2 bg-[#f6ae2d] text-xs px-2 sm:px-6  md:px-8  lg:px-10 py-[6px] md:py-3 rounded-full'>MORE</button>
          </div>
          }
        </motion.div>
        </AnimatePresence>
          }

        </div>


      <div className='mx-16 py-12'>
      {
          upcomingMovies?.length > 0 &&
          <div className='my-12'>
              <div className='h-[2rem] flex gap-1 sm:gap-4'>
                <img src={pinlogo} alt="" className='object-cover h-full' />
                <h1 className='text-base sm:text-lg font-medium tracking-wide text-white'>Upcoming Movies</h1>
              </div>
            <div className='flex gap-6 overflow-x-scroll py-6 snap-x scrollbar-none'>
              {
                upcomingMovies.map((movie,i)=>{
                  return(
                    movie?.isDislocated ||
                    <Suspense key={movie.movie_id+i} fallback={<MovieCard2Skelton/>} >
                      <MovieCard2   movie={movie} />
                    </Suspense>
                  )
                })
                }
            </div>
          </div>
        }
        {
          recommendedMovies?.length > 0 &&
          <div className='my-12'>
              <div className='h-[2rem] flex gap-1 sm:gap-4'>
                <img src={pinlogo} alt="" className='object-cover h-full' />
                <h1 className='text-base sm:text-lg font-medium tracking-wide text-white'>Recommended Movies</h1>
              </div>
            <div className='flex gap-6 overflow-x-scroll py-6 snap-x scrollbar-none'>
              {
                recommendedMovies.map((movie,i)=>{
                  return(
                    movie?.isDislocated ||
                    <Suspense key={movie.movie_id+i} fallback={<MovieCard2Skelton/>} >
                      <MovieCard2   movie={movie} />
                    </Suspense>
                  )
                })
                }
            </div>
          </div>
        }
        {
          moviesByGenre && moviesByGenre.length > 0 && 
          moviesByGenre.map((genreObj,i)=>{
            return(
              genreObj?.movies && genreObj.movies.length > 0 && 
                <div key={genreObj.genre?.name+genreObj.genre?.id+i} className='my-12'>
                  <div className='h-[2rem] flex gap-1 sm:gap-4'>
                    <img src={pinlogo} alt="" className='object-cover h-full' />
                    <h1 className='text-base sm:text-lg font-medium tracking-wide text-white'>{genreObj?.genre?.name} Movies</h1>
                  </div>
                <div className='flex gap-6 overflow-x-scroll py-6 snap-x scrollbar-none'>
                  {
                    genreObj.movies.map(movie=>{
                      return(
                        <Suspense key={movie.movie_id+i} fallback={<MovieCard2Skelton/>} >
                          <MovieCard2   movie={movie} />
                        </Suspense>
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
  )
}

export default Home
