import React, { useEffect, useRef, useState } from 'react'
import { toast, Toaster } from 'sonner'
import img from '../../../assets/MV5BOWMyNTA2M2UtMmZkNC00ZWE5LThjZGItODcxNGU2MDBhYTk1XkEyXkFqcGdeQXVyOTU0NjY5MzM@._V1_.jpg'
import { FaRegStar, FaStar, FaUserCircle } from "react-icons/fa";
import { BiDislike, BiLike, BiSolidDislike, BiSolidLike } from 'react-icons/bi';
import pinlogo from '../../../assets/pin-logo.png'
import AddReviewModal from './AddReviewModal';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userGetOneMovie, userGetReviews, userLikeUnlikeReview } from '../../../features/userMovies/userMovieActions';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ScaleLoader } from 'react-spinners';
import { motion } from 'framer-motion';
import { resetReviewData, resetUserMovieActions } from '../../../features/userMovies/userMovieSlice';

const cardVariants = {
    hidden:{
        opacity:0,
        y:100
    },
    visible:{
        opacity:1,
        y:0,
        transition:{
            duration:1
        }
    }
  }

function ReviewHome() {

    const [stars,setStars] = useState(new Array(5).fill(false));
    const [showAdd,setShowAdd] = useState(false);
    const [searchParams] = useSearchParams();
    const movie_id = searchParams.get("movie_id");
    const {userToken,userData} = useSelector(state=>state.user)
    const {singleMovieDetail,reviews,hashtags,message} = useSelector(state=>state.userMovie)
    const [movie,setMovie] = useState(null)
    const [page,setPage] = useState(1);
    const dispatch = useDispatch();
    const scrollRef = useRef(null);

    useEffect(()=>{
        if(singleMovieDetail && (!movie || movie?._id !== movie_id)){
            if(singleMovieDetail?._id === movie_id){
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
        if(!reviews){
            console.log("ENTE");
            dispatch(userGetReviews({movie_id,page:1}))
        }
        
    },[reviews])

    useEffect(()=>{
        return ()=>{
            console.log("EXI");
            dispatch(resetReviewData())
        }
    },[])

    useEffect(()=>{
        if(message === "Review added successfully."){
          toast.success(message)
          setShowAdd(false)
          dispatch(resetUserMovieActions())
        }
      },[message])

    const nextPage = ()=>{
        dispatch(userGetReviews({movie_id,page:page+1}))
        setPage(prev=>prev+1)
    }
    const handleLikeDisLike = (review,state)=>{
        if(userToken){
            console.log(review?._id,state);
            const data = {review_id:review?._id,state}
            dispatch(userLikeUnlikeReview({data,token:userToken}))
        }
    }

    const today = new Date()
    today.setHours(0,0,0,0)
    
  return (
    <div className='py-10 bg-[#15121B] '>
        <Toaster richColors />
        <div className='pt-28 px-12  min-h-[10rem]'>
            <h5 className='text-white text-4xl font-semibold tracking-widest'>REVIEWS</h5>
                <div className=' bg-black border-2 border-[#f6ae2d] rounded-md my-5 flex flex-col-reverse md:flex-row gap-4 justify-between  md:max-h-[14rem] overflow-hidden'>
                    <div className='flex flex-col gap-4 py-6 px-10'>
                        <h5 className='text-[#f6ae2d] text-2xl  lg:text-4xl font-semibold tracking-widest cursor-pointer'>{movie?.title}</h5>
                        <h5 className='text-white text-sm  lg:text-md  tracking-widest cursor-pointer'>{movie?.genres[0] ? movie?.genres[0]?.name ? movie?.genres[0]?.name : movie?.genres[0]  : '' }{movie?.genres[1] ? movie?.genres[1]?.name ? " / "+ movie?.genres[1]?.name : " / "+ movie?.genres[1] : '' }</h5>
                        <h5 className='text-white text-md  lg:text-xl  tracking-widest cursor-pointer flex items-center gap-3'>Rating :
                             {
                                stars?.map((el,i)=>{
                                    return(
                                        stars[i]  
                                        ? <FaStar key={i}  className='text-[#f6ae2d]' /> 
                                        : <FaRegStar key={i} className='text-[#f6ae2d]' /> 
                                    )
                                })
                             }
                        </h5>
                        {userToken && new Date(movie?.release_date) < today && <button onClick={()=>setShowAdd(true)} className='bg-[#f6ae2d] px-7 py-2 rounded-md tracking-wider font-medium'>ADD YOUR REVIEW</button>}
                    </div>
                    <div className='w-[100%] md:w-[45%] h-[10rem] md:h-auto overflow-hidden relative'>
                        <div className='w-[100%] h-[100%] bg-gradient-to-t md:bg-gradient-to-r from-black to-transparent absolute'></div>
                        <img src={movie?.backdrop_path} alt="" />
                    </div>
                </div>

                <div className='my-7'>
                    <div className='h-[2rem] flex gap-1 sm:gap-4'>
                        <img src={pinlogo} alt="" className='object-cover h-full' />
                        <h1 className='text-base sm:text-lg font-medium tracking-wide text-white'>Popular hashtags</h1>
                    </div>
                    <div className='my-4 flex gap-4 w-[100%] overflow-x-scroll scrollbar-none'>
                    {hashtags && Object.entries(hashtags).map((tagObj,i)=>{
                      return(
                        <p key={tagObj[0]+i} className='border-2 border-[#f6ae2d] bg-black rounded-full py-3 px-6  max-w-[13rem] inline-block overflow-hidden text-ellipsis whitespace-nowrap text-white text-sm' >
                        {tagObj[0]} <span className='ml-3 bg-[#666] px-2 rounded-sm'>{tagObj[1]}</span></p>
                      )
                  })}
                    </div>
                </div>

                <div ref={scrollRef} >
                    {
                        reviews &&  reviews.length > 0 ?
                        <InfiniteScroll dataLength={reviews?.length} scrollThreshold={'750px'} scrollableTarget={scrollRef} next={nextPage} loader={<ScaleLoader className='absolute -bottom-[6rem] ' color='#f6ae2d'/>} hasMore={true} className='my-6 py-4 px-2 mx-auto flex  gap-7 relative flex-col scrollbar-none'>
                        {
                        reviews.map((review)=>{
                        return (
                        <motion.div 
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{once:true}}
                            key={review._id} className='border-2 border-[#f6ae2d] flex flex-col gap-4 rounded-md bg-black px-6 sm:px-10 py-6 sm:min-w-[25rem]'>
                            <div className='flex  gap-3 flex-col sm:flex-row justify-between'>
                            <h2 className='text-white flex items-center tracking-widest text-base sm:text-lg font-medium gap-3'><FaUserCircle className='w-[1.5rem] h-[1.5rem]'/>{review?.userdata[0]?.firstname} {review?.userdata[0]?.lastname}</h2>
                            <p className='flex items-center gap-3 text-white'><FaStar className='text-[#f6ae2d] w-[1.5rem] h-[1.5rem]'/>{review.rating} / 10</p>
                            </div>
                            <div className='my-5'>
                                <p className='text-xs sm:text-sm text-white'>{review.content}</p>
                            </div>
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center gap-6 text-white'>
                                {review?.likedUsers?.length > 0 && review.likedUsers.includes(userData?.id) ? <><BiSolidLike className='w-[1.5rem] h-[1.5rem] text-[#f6ae2d] ' /> <p className='text-xs'>{review.likes}</p></> :<><BiLike onClick={()=>handleLikeDisLike(review,"LIKE")} className='w-[1.5rem] h-[1.5rem] text-[#f6ae2d] hover:scale-[1.07]' />
                                <p className='text-xs'>{review.likes}</p></>} 
                                {review?.dislikedUsers?.length > 0 && review.dislikedUsers.includes(userData?.id) ? <><BiSolidDislike  className='w-[1.5rem] h-[1.5rem] text-[#f6ae2d] ' />
                                <p className='text-xs'>{review.dislikes}</p></> : <><BiDislike onClick={()=>handleLikeDisLike(review,"DISLIKE")} className='w-[1.5rem] h-[1.5rem] text-[#f6ae2d] hover:scale-[1.07]' />
                                <p className='text-xs'>{review.dislikes}</p></>}
                                </div>
                                <div><p className='text-xs text-white'>{new Date(review.createdAt).toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'})}</p></div>
                            </div>
                        
                        </motion.div>
                        )
                        })
                        }
                        </InfiniteScroll>
                        : <div className='text-white tracking-widest'> NO REVIEWS.</div>
                    }
                </div>
                
                <AddReviewModal isOpen={showAdd} set={setShowAdd} />
        </div>
    </div>
  )
}

export default ReviewHome 
