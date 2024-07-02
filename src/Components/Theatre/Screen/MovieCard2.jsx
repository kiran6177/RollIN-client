import React from 'react'
import image from '../../../assets/MV5BOWMyNTA2M2UtMmZkNC00ZWE5LThjZGItODcxNGU2MDBhYTk1XkEyXkFqcGdeQXVyOTU0NjY5MzM@._V1_.jpg'
import { useNavigate } from 'react-router'
import { FaCalendar, FaStar } from 'react-icons/fa';
import { useSearchParams } from 'react-router-dom';

function MovieCard2({movie}) {
  const [searchParams] = useSearchParams()
  const screen_id = searchParams.get('screen_id')
  const navigate = useNavigate();
  const handleNavigate = ()=>{
    if(screen_id){
      navigate(`/theatre/editscreen/enrollmovie/detail?screen_id=${screen_id}&movie_id=${movie?._id}`)
    }else{
      navigate(`/theatre/movies/moviedetail?movie_id=${movie?._id}`)
    }
  }
  return (
    <div className='w-[16rem] hover:scale-[1.02] transition-all duration-200 ease-in-out'>
    <div onClick={handleNavigate} className='h-[20rem] cursor-pointer w-[16rem]   rounded-md overflow-hidden relative '>
      <div className='absolute bottom-0 z-10 flex justify-between w-[100%] px-4 h-[1.5rem] items-center bg-[#f6ae2d]'>
      <h2 className='text-black text-xs font-semibold tracking-wider flex items-center gap-2'><FaStar className='h-[90%]'/>{parseInt(movie?.rating)}</h2>
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
