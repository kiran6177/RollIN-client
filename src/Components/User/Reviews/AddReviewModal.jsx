import React, { useState } from 'react'
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { IoIosClose } from 'react-icons/io';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userAddReview } from '../../../features/userMovies/userMovieActions';
import { toast, Toaster } from 'sonner';

const confirmVarinat = {
    hidden:{
      scale:0
    },
    visible:{
      scale:1,
      transition:{
        type:"spring",
        bounce:0.5
      }
    }
  }

function AddReviewModal({isOpen,set}) {
  const [stars,setStars] = useState(new Array(5).fill(false));
  const [review,setReview] = useState('');
  const [searchParams] = useSearchParams();
  const movie_id = searchParams.get('movie_id')
  const {userToken} = useSelector(state=>state.user)

  const dispatch = useDispatch();

  const handleReviewAdd = ()=>{
    console.log(stars,review,movie_id);
    if(review.trim() === ""){
        toast.error("Please write your review!!")
    }else{
      const data = {stars,review,movie_id}
      dispatch(userAddReview({data,token:userToken}))
    }
  }

    if(isOpen){ 
        return createPortal(
            <div className='w-[100%] h-[100vh] fixed top-0 pt-8 md:pt-12 flex items-center justify-center bg-[#00000091] z-30'>
              <Toaster richColors />
                <motion.div
                variants={confirmVarinat}
                initial="hidden"
                animate="visible"
                className='bg-black text-white w-[80%] sm:w-[75%] lg:w-[68%] xl:w-[55%] border-2 border-[#f6ae2d] rounded-md  flex flex-col  justify-between items-center fixed min-h-[55dvh] '>
                      <IoIosClose onClick={()=>{set(false);}} className="absolute cursor-pointer font-medium right-3 top-3 w-[2rem] h-[2rem]"/>
                        <div className='w-[100%] flex flex-col justify-between p-6'>
                            <h2 className='mx-auto text-lg text-[#f6ae2d]'>Add Your Review</h2>
                            <div className='flex flex-col items-center my-6 gap-3'>
                              <h2>Rate the movie : </h2>
                              <div className='flex items-center gap-3 '>
                              {
                                stars?.map((el,i)=>{
                                    return(
                                        stars[i]  
                                        ? <FaStar key={i} onClick={()=>setStars(prev=>prev.map((_,index)=>{
                                            if(index >= i){
                                                return false
                                            }
                                            return true
                                        }))} className='text-[#f6ae2d] w-[2rem] h-[2rem]' /> 
                                        : <FaRegStar key={i} onClick={()=>setStars(prev=>prev.map((_,index)=>{
                                            if(index <= i){
                                                return true
                                            }
                                            return false
                                        }))} className='text-[#f6ae2d] w-[2rem] h-[2rem]' /> 
                                    )
                                })
                             }
                              </div>
                            </div>
                            <div className='flex flex-col w-[90%] mx-auto items-center gap-3'>
                              <label htmlFor='review'>Add your review</label>
                              <textarea name="review" id="review" value={review} onChange={(e)=>setReview(e.target.value)} className='w-[100%] bg-black border-2 border-[#f6ae2d] rounded-sm'  rows={6}></textarea>
                            </div>
                            <button onClick={handleReviewAdd} className='bg-[#f6ae2d] rounded-sm w-[40%] mx-auto py-1 text-black mt-4 font-medium tracking-widest'>ADD REVIEW</button>
                        </div>
                </motion.div>
            </div>,
            document.getElementById("trailer-modal")
          )
    }else{
        return null
    }
}

export default AddReviewModal
