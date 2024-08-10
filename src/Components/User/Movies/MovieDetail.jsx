import React, { lazy, Suspense, useEffect, useState } from 'react'
import { FaRegCalendar, FaRegStar, FaStar } from 'react-icons/fa'
import { MdOutlineTimer } from 'react-icons/md'
import { toast, Toaster } from 'sonner'
import { IoMdPlayCircle } from 'react-icons/io'
import TrailerModal from './TrailerModal'
import pinlogo from '../../../assets/pin-logo.png'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userGetBannerMovies, userGetMoviesByGenre, userGetOneMovie, userGetRecommendedMoviesWithLocation, userGetReviews, userGetSingleMovie } from '../../../features/userMovies/userMovieActions'
import { userGetRecommendedMovies, userGetUpcomingMovies } from '../../../features/userBooking/userBookingActions'
import ReviewBox from '../Reviews/ReviewBox'
import ReviewHashtag from '../Reviews/ReviewHashtag'
import AddReviewModal from '../Reviews/AddReviewModal'
import { resetReviewData, resetUserMovieActions } from '../../../features/userMovies/userMovieSlice'
import { userSetReminder } from '../../../features/userTheatres/userTheatreActions'
import { resetUserTheatreActions } from '../../../features/userTheatres/userTheatreSlice'
import CastIconSkelton from '../../../Skelton/CastIconSkelton'
import MovieCard2Skelton from '../../../Skelton/MovieCard2Skelton'
import LoadingSpinner from '../../Loaders/LoadingSpinner'
const MovieCard2 = lazy(()=>import('./MovieCard2')) 
const CastIcon = lazy(()=>import('./CastIcon')) 


function MovieDetail() {
    const [movie,setMovie] = useState(null);
    const [showTrailer,setShowTrailer] = useState(false)
    const [searchParams] = useSearchParams();
    const movie_id = searchParams.get("movie_id");
    const [stars,setStars] = useState(new Array(5).fill(false));

    const {singleMovieDetail,message,reviews,hashtags,loading} = useSelector(state=>state.userMovie)
    const {userData,userToken} = useSelector(state=>state.user);
    const {recommendedMovies} = useSelector(state=>state.userBooking)

    const theatreError = useSelector(state=>state.userTheatre.error)
    const theatreMessage = useSelector(state=>state.userTheatre.message)


    const [showAddReview,setShowAddReview] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        if(!recommendedMovies){
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
        }
    },[recommendedMovies])

    useEffect(()=>{
      if(singleMovieDetail && singleMovieDetail?._id === movie_id){
        console.log(singleMovieDetail);
        setMovie(singleMovieDetail)
        if(singleMovieDetail?.rating){
          console.log(Math.floor(singleMovieDetail.rating/2));
          setStars(prev=>prev.map((each,i)=>{
              if(i < Math.floor(singleMovieDetail.rating/2)){
                  return true
              }
              return false
          }))
         }
        return
      }else{
        if(localStorage.getItem('city')){
          const loc = JSON.parse(localStorage.getItem('city')).loc;
          dispatch(userGetOneMovie({location:loc,movie_id}))
        }else{
            dispatch(userGetOneMovie({movie_id}))
        }
      }
    },[singleMovieDetail])

    useEffect(()=>{
      if(movie && movie?._id !== movie_id){
        if(localStorage.getItem('city')){
            const loc = JSON.parse(localStorage.getItem('city')).loc;
            dispatch(userGetOneMovie({location:loc,movie_id}))
        }else{
            dispatch(userGetOneMovie({movie_id}))
        }
        window.scrollTo(0,0)
      }
      if(movie_id){
        dispatch(resetReviewData())
      }
    },[movie_id])

    useEffect(()=>{
      if(!reviews){
        dispatch(userGetReviews({movie_id}))
      }
    },[reviews])

    useEffect(()=>{
      if(message === "Review added successfully."){
        toast.success(message)
        setShowAddReview(false)
        dispatch(resetUserMovieActions())
      }
    },[message])

    useEffect(()=>{
      if(theatreMessage){
        toast.success(theatreMessage)
        dispatch(resetUserTheatreActions())
      }
      if(theatreError?.length > 0){
        theatreError.map(err=>toast.error(err))
        dispatch(resetUserTheatreActions())
      }
    },[theatreError,theatreMessage])

    const today = new Date()
    today.setHours(0,0,0,0)

    const handleSetReminder = (movie_id)=>{
      if(!userToken){
        toast.error("Please Login to set reminder!!")
        return
      }
      dispatch(userSetReminder({data:{movie_id},token:userToken}))
    }
    if(loading){
      return <LoadingSpinner />
    }else{

      return (
        <div className='pt-0 min-h-[80vh] bg-[#15121B]'>
    <Toaster richColors />
    <div className='relative text-white h-[50vh] sm:h-[55vh] md:h-[60vh] lg:h-[70vh] xl:h-[80vh] overflow-hidden'>
          {
            movie &&

          <div className='w-[100%] h-[100%]'>
          <div className='absolute bg-gradient-to-t from-[#15121b] w-[100%] to-transparent min-h-[90%] bottom-0 '></div>
            <div className='hidden mx-16 md:flex flex-col gap-4 absolute md:bottom-[1rem] lg:bottom-[2rem] xl:bottom-[6rem] '>
              <h2 className='text-xl  tracking-wider drop-shadow-2xl lg:text-4xl font-semibold '>{movie?.title}</h2>
              <div className=' flex gap-1 flex-wrap md:gap-8 '>
                  <h5 className='text-[12px] sm:text-xs lg:text-sm h-[2rem] gap-3 flex items-center'><img src={pinlogo} alt="" className='object-cover h-[100%]'  />{movie?.genres[0] ? movie?.genres[0]?.name ? movie?.genres[0]?.name : movie?.genres[0]  : '' }{movie?.genres[1] ? movie?.genres[1]?.name ? " / "+ movie?.genres[1]?.name : " / "+ movie?.genres[1] : '' }{movie?.genres[2] ? movie?.genres[2]?.name ? " / "+ movie?.genres[2]?.name :" / "+ movie?.genres[2] : '' }</h5>
                  <h5 className='text-[12px] sm:text-xs lg:text-sm h-[2rem] gap-3 flex items-center'><FaRegCalendar className='text-[#f6ae2d] w-[2rem] h-[1.2rem]' />{movie?.release_date.split('-')[0]}</h5>
                  <h5 className='text-[12px] sm:text-xs lg:text-sm h-[2rem] gap-3 flex items-center'><MdOutlineTimer className='text-[#f6ae2d] w-[2rem] h-[1.2rem]' />{movie?.runtime + " min"}</h5>
              </div> 
              <div className=' flex gap-1 flex-wrap md:gap-8 '>
                  <h5 className='text-[12px] sm:text-xs lg:text-sm h-[2rem] gap-3 flex items-center'>Rating : {
                                stars?.map((el,i)=>{
                                    return(
                                      stars[i]  
                                      ? <FaStar key={i}  className='text-[#f6ae2d]' /> 
                                      : <FaRegStar key={i} className='text-[#f6ae2d]' /> 
                                    )
                                  })
                             } </h5>
              </div> 
              {(!movie?.isDislocated && !movie?.isDisabled) ? movie?.isAssigned ? <button onClick={()=>navigate(`/moviewithscreens?movie_id=${movie?._id}`)} className='w-[80%] text-black font-medium tracking-widest border-2 border-black m-2 bg-[#f6ae2d] text-xs px-6 sm:px-10  md:px-12  lg:px-[4.5rem] py-1 md:py-3 rounded-full'>BOOK TICKETS</button> :  <button onClick={()=>handleSetReminder(movie?._id)} className='w-[80%] text-black font-medium tracking-widest border-2 border-black m-2 bg-[#f6ae2d] text-xs px-6 sm:px-10  md:px-12  lg:px-[4.5rem] py-1 md:py-3 rounded-full'>SET REMINDER</button>:null}
            </div>
            <IoMdPlayCircle onClick={()=>setShowTrailer(true)} className='absolute text-[#9d9d9d8a] h-[2rem] md:h-[3rem] w-[2rem] md:w-[3rem] left-[49%] top-[48%] hover:text-white hover:scale-[1.1] transition-all duration-150 ease-in-out '/>
            <img src={movie?.backdrop_path} alt="" className='mt-20 md:mt-0  mx-auto object-fill w-[100%]' />
          <TrailerModal isOpen={showTrailer} set={setShowTrailer} videoKey={movie?.video_link} />
          </div>
          }
        </div>
        <div className='block md:hidden'>
          {
            movie &&
          <div className='mx-6 flex flex-col gap-4 text-white'>
          <h2 className='text-xl  tracking-wider drop-shadow-2xl lg:text-4xl font-semibold '>{movie?.title}</h2>
          <div className=' flex gap-1 flex-wrap md:gap-8 '>
              <h5 className='text-[12px] sm:text-xs lg:text-sm h-[2rem] gap-3 flex items-center'><img src={pinlogo} alt="" className='object-cover h-[100%]'  />{movie?.genres[0] ? movie?.genres[0]?.name ? movie?.genres[0]?.name : movie?.genres[0]  : '' }{movie?.genres[1] ? movie?.genres[1]?.name ? " / "+ movie?.genres[1]?.name : " / "+ movie?.genres[1] : '' }{movie?.genres[2] ? movie?.genres[2]?.name ? " / "+ movie?.genres[2]?.name :" / "+ movie?.genres[2] : '' }</h5>
              <h5 className='text-[12px] sm:text-xs lg:text-sm h-[2rem] gap-3 flex items-center'><FaRegCalendar className='text-[#f6ae2d] w-[2rem] h-[1.2rem]' />{movie?.release_date.split('-')[0]}</h5>
              <h5 className='text-[12px] sm:text-xs lg:text-sm h-[2rem] gap-3 flex items-center'><MdOutlineTimer className='text-[#f6ae2d] w-[2rem] h-[1.2rem]' />{movie?.runtime + " min"}</h5>
          </div>
          <div className=' flex gap-1 flex-wrap md:gap-8 '>
              <h5 className='text-[12px] sm:text-xs lg:text-sm h-[2rem] gap-3 flex items-center'>Rating :  {
                stars?.map((el,i)=>{
                  return(
                    stars[i]  
                    ? <FaStar key={i}  className='text-[#f6ae2d]' /> 
                    : <FaRegStar key={i} className='text-[#f6ae2d]' /> 
                  )
                })
                             }</h5>
          </div>
          {(!movie?.isDislocated && !movie?.isDisabled) ? movie?.isAssigned ? <button onClick={()=>navigate(`/moviewithscreens?movie_id=${movie?._id}`)} className='w-[85%] sm:w-[50%]  text-black font-medium tracking-widest border-2 border-black m-2 bg-[#f6ae2d] text-xs px-6 sm:px-10  md:px-12  lg:px-20 py-[6px] md:py-3 rounded-full'>BOOK TICKETS</button> : <button onClick={()=>handleSetReminder(movie?._id)} className='w-[85%] sm:w-[50%]  text-black font-medium tracking-widest border-2 border-black m-2 bg-[#f6ae2d] text-xs px-6 sm:px-10  md:px-12  lg:px-20 py-[6px] md:py-3 rounded-full'>SET REMINDER</button> : null}
        </div>
          }
 
        </div>


        <div className='px-8 sm:px-20 mt-10 lg:mt-8'>
          

          <div className='py-10 text-white flex flex-col gap-4 w-[95%] '>
            <div className='h-[2rem] flex gap-1 sm:gap-4'>
              <img src={pinlogo} alt="" className='object-cover h-full' />
              <h1 className='text-base sm:text-lg font-medium tracking-wide'>About the Movie</h1>
            </div>
              <div className='text-xs leading-8 md:text-base md:leading-10 '>
                {movie?.overview}
              </div>
          </div>

          <div className='py-10 text-white flex flex-col gap-4 w-[100%] '>
            <div className='h-[2rem] flex gap-1 sm:gap-4'>
              <img src={pinlogo} alt="" className='object-cover h-full' />
              <h1 className='text-base sm:text-lg font-medium tracking-wide'>Cast</h1>
            </div>

            <div className='flex gap-8 overflow-x-scroll p-6 snap-x scrollbar-none'>
              {
                movie?.cast && movie.cast.length > 0 &&
                movie?.cast.map((person,i)=>{
                  return (<Suspense key={'cast'+person._id + i} fallback={<CastIconSkelton/>}><CastIcon  person={person} type="cast" /></Suspense>)
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
              movie?.crew && movie.crew.length > 0 &&
                movie?.crew.map((person,i)=>{
                  return (<Suspense key={'crew'+person._id + i} fallback={<CastIconSkelton/>}><CastIcon  person={person} type="crew" /></Suspense>)
                })
              }

            </div>

          </div>

          <div className='py-10 text-white flex flex-col gap-4 w-[100%] '>
            <div className='h-[2rem] flex gap-1 sm:gap-4'>
              <img src={pinlogo} alt="" className='object-cover h-full' />
              <h1 className='text-base sm:text-lg font-medium tracking-wide'>Top Reviews</h1>
            </div>
              <div className='px-6 flex justify-between'>
                <div className='flex overflow-x-scroll w-[85%] scrollbar-none gap-5'>
                  {hashtags && Object.entries(hashtags).map((tagObj,i)=>{
                    if(i < 10){
                      return(
                        <ReviewHashtag key={tagObj+i} tag={tagObj[0]} count={tagObj[1]} />
                      )
                    }
                    return null
                  })}

                </div>
                <div>
                  <button onClick={()=>navigate(`/reviews?movie_id=${movie_id}`)} className='text-[#f6ae2d] tracking-wide'>View Reviews </button>
                </div>
              </div>
            <div className='flex gap-8 overflow-x-scroll px-6 py-3 snap-x scrollbar-none'>
           {
             reviews?.length > 0 && reviews.map((eachReview,i)=>{
               if(i < 10){
                 return (
                   <ReviewBox key={eachReview?._id} review={eachReview} />
                  )
                }
                return null
              })
           } 
            </div>
             {userToken && new Date(movie?.release_date) < today && <> <button onClick={()=>setShowAddReview(true)} className='bg-[#f6ae2d] border-2 border-[#f6ae2d] max-w-fit px-7 py-[6px] text-black tracking-wider font-medium rounded-sm mx-auto hover:bg-black hover:text-white transition-all duration-150 ease-linear'>ADD REVIEW</button>
              <AddReviewModal isOpen={showAddReview} set={setShowAddReview} /></>}
          </div>

          <div className='py-10 text-white flex flex-col gap-4 w-[100%] '>
            <div className='h-[2rem] flex gap-1 sm:gap-4'>
              <img src={pinlogo} alt="" className='object-cover h-full' />
              <h1 className='text-base sm:text-lg font-medium tracking-wide'>You might also like</h1>
            </div>
              <div className='flex gap-6 overflow-x-scroll p-6 snap-x scrollbar-none'>
                {
                  recommendedMovies ? recommendedMovies.length > 0 &&
                  recommendedMovies.map((movieObj,i)=>{
                    if(movieObj._id != movie_id ){
                      return (<Suspense key={movieObj._id+i} fallback={<MovieCard2Skelton/>} ><MovieCard2  movie={movieObj} /></Suspense>)
                    }
                    return null
                  })
                  : ''
                }
              </div>
          </div>

        </div>
    </div>
  )}
}

export default MovieDetail
