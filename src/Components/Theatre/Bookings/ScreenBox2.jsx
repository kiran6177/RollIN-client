import React from 'react'
import aav from '../../../assets/MV5BOWMyNTA2M2UtMmZkNC00ZWE5LThjZGItODcxNGU2MDBhYTk1XkEyXkFqcGdeQXVyOTU0NjY5MzM@._V1_.jpg'
import plus from '../../../assets/plus.jpeg'
import nomovie from '../../../assets/NO MOVIE.png'
import { useNavigate } from 'react-router';


function ScreenBox2({screen}) {
    const navigate = useNavigate();

    const handleClick = ()=>{
            navigate(`/theatre/bookings/screen?id=${screen?._id}`)
    }

  return (
    <div onClick={handleClick} className='relative border-2 border-[#f6ae2d] w-full sm:w-[44%] md:w-[31%] xl:w-[21%]  rounded-md bg-black overflow-hidden '>
        <div className='h-[100%] '>
        <img src={screen ? screen.running_movies?.length > 0 ? screen.running_movies[0].poster_path : nomovie : aav} alt="" width={'100%'} className='aspect-[4/5] object-cover' />
        </div>
        <div className='absolute bottom-0 bg-gradient-to-t from-black to-transparent w-[100%] h-[45%] z-10 p-5 md:py-2 md:px-4 lg:p-5 flex flex-col justify-end'>
        <h4  className='font-medium text-base md:text-lg lg:text-xl tracking-widest cursor-pointer text-white'>{screen ? screen?.name : 'ADD SCREEN'}</h4>
        <h6 className='font-normal text-xs tracking-wider text-white'>
            {screen.running_movies[0]?.title }{screen.running_movies[1] ?" / "+ screen.running_movies[1].title : ''}{screen.running_movies[2] ? '...' :''}
            </h6> 
        </div>
    </div>
  )
}

export default ScreenBox2
