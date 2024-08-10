import React, { useEffect, useState } from 'react'
import { FaRegCalendar } from 'react-icons/fa'
import { IoMdPlayCircle } from 'react-icons/io'
import { MdOutlineTimer } from 'react-icons/md'
import { Toaster } from 'sonner'
import pinlogo from '../../../assets/pin-logo.png'
import { useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import TrailerModal from './TrailerModal'
import MovieCard2 from './MovieCard2'
import CastIcon from './CastIcon'
import EnrollModal from './EnrollModal'

function MovieDetail() {
    const [movie,setMovie] = useState(null);
    const [searchParams] = useSearchParams();
    const screen_id = searchParams.get("screen_id")
    const movie_id = searchParams.get("movie_id")

    const [showTrailer,setShowTrailer] = useState(false);
    const {moviesList,runningMovies} = useSelector(state=>state.theatreFeat);

    const [showModal,setShowModal] = useState(false);

    useEffect(()=>{
        console.log(movie);
        window.scrollTo(0,0)  
    },[movie])

    useEffect(()=>{
        console.log(screen_id,movie_id);
        if(moviesList?.length > 0){
            moviesList.map(movie=>{
                if(movie._id === movie_id){
                    setMovie(movie)
                }
            })
            return
        }
        if(runningMovies?.length > 0){
          runningMovies.map(movie=>{
            if(movie.movie_id === movie_id){
                setMovie(movie)
            }
        })
        }
    },[movie_id])

    const handleEnroll = ()=>{
      console.log(movie);
      setShowModal(true)
    }

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
                  <h5 className='text-[12px] sm:text-xs lg:text-sm h-[2rem] gap-3 flex items-center'><img src={pinlogo} alt="" className='object-cover h-[100%]'  />{movie?.genres[0] ? movie?.genres[0]?.name ? movie?.genres[0]?.name : movie?.genres[0]  : '' }{movie?.genres[1] ? movie?.genres[1]?.name ? " / "+ movie?.genres[1]?.name : " / "+ movie?.genres[1] : '' }{movie?.genres[2] ? movie?.genres[2]?.name ? " / "+ movie?.genres[2]?.name : " / "+ movie?.genres[2] : '' }</h5>
                  <h5 className='text-[12px] sm:text-xs lg:text-sm h-[2rem] gap-3 flex items-center'><FaRegCalendar className='text-[#f6ae2d] w-[2rem] h-[1.2rem]' />{movie?.release_date.split('-')[0]}</h5>
                  <h5 className='text-[12px] sm:text-xs lg:text-sm h-[2rem] gap-3 flex items-center'><MdOutlineTimer className='text-[#f6ae2d] w-[2rem] h-[1.2rem]' />{movie?.runtime + " min"}</h5>
              </div>  
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
              <h5 className='text-[12px] sm:text-xs lg:text-sm h-[2rem] gap-3 flex items-center'><img src={pinlogo} alt="" className='object-cover h-[100%]'  />{movie?.genres[0] ? movie?.genres[0]?.name ? movie?.genres[0]?.name : movie?.genres[0]  : '' }{movie?.genres[1] ? movie?.genres[1]?.name ? " / "+ movie?.genres[1]?.name : " / "+ movie?.genres[1] : '' }{movie?.genres[2] ? movie?.genres[2]?.name ? " / "+ movie?.genres[2]?.name : " / "+ movie?.genres[2] : '' }</h5>
              <h5 className='text-[12px] sm:text-xs lg:text-sm h-[2rem] gap-3 flex items-center'><FaRegCalendar className='text-[#f6ae2d] w-[2rem] h-[1.2rem]' />{movie?.release_date.split('-')[0]}</h5>
              <h5 className='text-[12px] sm:text-xs lg:text-sm h-[2rem] gap-3 flex items-center'><MdOutlineTimer className='text-[#f6ae2d] w-[2rem] h-[1.2rem]' />{movie?.runtime + " min"}</h5>
          </div>
        </div>
          }
 
        </div>


        <div className='px-8 sm:px-20 mt-10 lg:mt-8'>

          {
          movie?.isDisabled || 
          <div className='flex justify-center mt-20'>
            <button onClick={handleEnroll}  className=' text-black font-bold tracking-[0.5rem] border-2 border-black m-2 bg-[#f6ae2d] text-sm md:text-md px-8 sm:px-10  md:px-12  lg:px-20 py-2 md:py-3 rounded-sm hover:scale-[1.02] transition-all duration-150 ease-in-out'>ENROLL</button>
          </div>
          }

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
                    return (<CastIcon key={'cast'+person._id + i} person={person} type="cast" />)
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
                    return (<CastIcon key={'crew'+person._id + i} person={person} type="crew" />)
                })
              }

            </div>

          </div>

          <div className='py-10 text-white flex flex-col gap-4 w-[95%] '>
            <div className='h-[2rem] flex gap-1 sm:gap-4'>
              <img src={pinlogo} alt="" className='object-cover h-full' />
              <h1 className='text-base sm:text-lg font-medium tracking-wide'>You might also like</h1>
            </div>
              <div className='flex gap-6 overflow-x-scroll p-6 snap-x scrollbar-none'>
                {
                  moviesList ? moviesList.length > 0 &&
                  moviesList.map((movieObj,i)=>{
                    if(movieObj._id != movie_id ){
                      return <MovieCard2 key={movieObj._id+i} movie={movieObj} />
                    }
                    return null
                  })
                 : ''
                }
              </div>
          </div>

        </div>
        <EnrollModal isOpen={showModal} set={setShowModal} movie={movie} />
    </div>
  )
}

export default MovieDetail
