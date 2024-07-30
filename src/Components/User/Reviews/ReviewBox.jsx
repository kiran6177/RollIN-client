import React from 'react'
import { FaUserCircle } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { BiSolidLike , BiSolidDislike , BiLike , BiDislike} from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import { userLikeUnlikeReview } from '../../../features/userMovies/userMovieActions';

function ReviewBox({review}) {
    const  {userToken,userData} = useSelector(state=>state.user);
    const dispatch = useDispatch();
    const handleLikeDisLike = (state)=>{
        if(userToken){
            console.log(review?._id,state);
            const data = {review_id:review?._id,state}
            dispatch(userLikeUnlikeReview({data,token:userToken}))
        }
    }

  return (
    <div className='border-2 border-[#f6ae2d] rounded-md bg-black p-5 min-w-[25rem]'>
        <div className='flex justify-between'>
        <h2 className='text-white flex items-center gap-3'><FaUserCircle/>{review?.userdata[0]?.firstname} {review?.userdata[0]?.lastname}</h2>
        <p className='flex items-center gap-3'><FaStar className='text-[#f6ae2d]'/>8 / 10</p>
        </div>
        <div className='my-5'>
            <p className='text-xs'>{review.content}</p>
        </div>
        <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4 text-white'>
                {review?.likedUsers?.length > 0 && review.likedUsers.includes(userData?.id) ? <><BiSolidLike className='w-[1.2rem] h-[1.2rem] text-[#f6ae2d] ' /> <p className='text-xs'>{review.likes}</p></> :<><BiLike onClick={()=>handleLikeDisLike("LIKE")} className='w-[1.2rem] h-[1.2rem] text-[#f6ae2d] hover:scale-[1.07]' />
                    <p className='text-xs'>{review.likes}</p></>}
                {review?.dislikedUsers?.length > 0 && review.dislikedUsers.includes(userData?.id) ? <><BiSolidDislike  className='w-[1.2rem] h-[1.2rem] text-[#f6ae2d] ' />
                    <p className='text-xs'>{review.dislikes}</p></> : <><BiDislike onClick={()=>handleLikeDisLike("DISLIKE")} className='w-[1.2rem] h-[1.2rem] text-[#f6ae2d] hover:scale-[1.07]' />
                    <p className='text-xs'>{review.dislikes}</p></>}
            </div>
            <div><p className='text-xs'>{new Date(review.createdAt).toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'})}</p></div>
        </div>
    </div>
  )
}

export default ReviewBox
