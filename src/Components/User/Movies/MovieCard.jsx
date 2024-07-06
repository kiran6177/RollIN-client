import React from 'react'
import image from '../../../assets/MV5BOWMyNTA2M2UtMmZkNC00ZWE5LThjZGItODcxNGU2MDBhYTk1XkEyXkFqcGdeQXVyOTU0NjY5MzM@._V1_.jpg'
import { useNavigate } from 'react-router'

function MovieCard({movie}) {
  const navigate = useNavigate();
  return (
    <div onClick={()=>navigate(`/moviedetail?movie_id=${movie?._id}`)} className='h-[20rem] cursor-pointer w-[16rem]  border-2 border-[#f6ae2d] rounded-md overflow-hidden relative hover:scale-[1.02] transition-all duration-200 ease-in-out'>
      <h2 className='text-white z-10 font-semibold tracking-wider absolute bottom-14 left-5 my-2'>{movie?.title}</h2>
      <h2 className='text-white text-xs  z-10 font-normal tracking-wider absolute bottom-10 left-5 my-1'>{movie?.genres[0] ? movie.genres[0]:""}{movie?.genres[1] ?" / "+movie.genres[1]:""}{movie?.genres[2] ? " / "+movie.genres[2]:""}</h2>
      <h2 className='text-white text-xs z-10 font-normal tracking-wider absolute bottom-6 left-5'>{movie?.release_date}</h2>
      <div className='absolute bottom-0 h-[25%] hover:h-[50%] w-[100%] bg-gradient-to-b from-transparent to-black transition-all duration-200 ease-in-out'></div>
      <img src={movie?.poster_path} alt="" width={'100%'} className='object-cover' />
    </div>
  )
}

export default MovieCard
