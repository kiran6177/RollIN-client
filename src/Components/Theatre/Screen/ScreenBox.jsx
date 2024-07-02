import React from 'react'
import aav from '../../../assets/MV5BOWMyNTA2M2UtMmZkNC00ZWE5LThjZGItODcxNGU2MDBhYTk1XkEyXkFqcGdeQXVyOTU0NjY5MzM@._V1_.jpg'
import plus from '../../../assets/plus.jpeg'
import nomovie from '../../../assets/NO MOVIE.png'
import { useNavigate } from 'react-router';


function ScreenBox({screen}) {
    const navigate = useNavigate();

    const handleClick = ()=>{
        if(screen){
            navigate(`/theatre/screendetail?id=${screen?._id}`)
        }else{
            navigate(`/theatre/addscreen`)
        }
    }

  return (
    <div className='relative border-2 border-[#f6ae2d] w-full sm:w-[44%] md:w-[31%] xl:w-[31%]  rounded-md bg-black overflow-hidden'>
        <div className='h-[100%] '>
        <img src={screen ? screen.running_movies?.length > 0 ? screen.running_movies[0].poster_path : nomovie : plus} alt="" width={'100%'} className='aspect-[3/4] object-cover' />
        </div>
        <div className='absolute bottom-0 bg-[#f6ae2d] w-[100%] h-[25%] z-10 p-5 md:py-2 md:px-4 lg:p-5'>
        <h4 onClick={handleClick} className='font-bold text-base md:text-lg lg:text-xl tracking-widest cursor-pointer'>{screen ? screen?.name : 'ADD SCREEN'}</h4>
        {screen && screen?.running_movies && screen.running_movies.length > 0 && <h6 className='font-medium tracking-wide'>{screen.running_movies[0]?.title }{screen.running_movies[1] ?" / "+ screen.running_movies[1].title : ''}{screen.running_movies[2] ? '...' :''}</h6>}
        </div>
    </div>
  )
}

export default ScreenBox
