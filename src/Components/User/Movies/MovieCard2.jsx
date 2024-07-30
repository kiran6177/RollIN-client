import React from 'react'
import { useNavigate } from 'react-router'
import { FaCalendar } from 'react-icons/fa';
import { IoLanguageSharp } from "react-icons/io5";

function MovieCard2({movie}) {
  const navigate = useNavigate();
  return (
    <div className='w-[16rem] hover:scale-[1.02] transition-all duration-200 ease-in-out'>
    <div onClick={()=>navigate(`/moviedetail?movie_id=${movie?._id}`)} className='h-[20rem] cursor-pointer w-[16rem]   rounded-md overflow-hidden relative '>
      <div className='absolute bottom-0 z-10 flex justify-between w-[100%] px-4 h-[1.5rem] items-center bg-[#f6ae2d]'>
      <h2 className='text-black text-[10px] font-medium w-[40%] overflow-hidden text-ellipsis  tracking-wide flex justify-start items-center gap-1 h-[100%]'><IoLanguageSharp className='h-[1rem] w-[1rem]'/>{movie?.language}</h2>
      <h2 className='text-black text-xs font-semibold tracking-wider flex items-center gap-2'><FaCalendar/>{movie?.release_date?.split('-')[0]}</h2>
      </div>
      <div className='absolute bottom-0 h-[25%] hover:h-[50%] w-[100%] bg-gradient-to-b from-transparent to-black transition-all duration-200 ease-in-out'></div>
      <img src={movie?.poster_path} alt="" width={'100%'} className='object-cover' />
    </div>
        <h2 className='text-white z-10 font-semibold tracking-wider overflow-hidden'>{movie?.title}</h2>
        <p className='text-white text-ellipsis text-xs overflow-hidden'>{movie?.genres[0] ? movie.genres[0].name  ? movie.genres[0].name: movie.genres[0] :""}{movie?.genres[1] ? movie.genres[1].name ?" / "+movie.genres[1].name: " / "+movie.genres[1] :""}{movie?.genres[2] ? movie.genres[2].name ?" / "+movie.genres[2].name: " / "+movie.genres[2] :""}</p>
    </div>
  )
}

export default MovieCard2
