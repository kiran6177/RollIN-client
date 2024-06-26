import React, {  useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import oppen from '../../../assets/MM-1207 Oppenheimer.jpg'
import pinlogo from '../../../assets/pin-logo.png'
import { FaRegCalendar } from 'react-icons/fa';
import { MdOutlineTimer } from 'react-icons/md';
import { AnimatePresence , motion } from 'framer-motion';
import img2 from '../../../assets/Varshangalkku-Shesham-first-look-poster-1600.webp'
import img3 from '../../../assets/aavesham.jpg'
import img4 from '../../../assets/et00396952-tfvujhhwtn-landscape.avif'
import MovieCard2 from '../../User/Movies/MovieCard2'
import { userGetBannerMovies, userGetMoviesByGenre } from '../../../features/userMovies/userMovieActions';
import { IoMdPlayCircle } from 'react-icons/io';
import TrailerModal from '../Movies/TrailerModal';

const bannerImgs = [oppen,img2,img3,img4]

function Home() {
    const {userData,userToken} = useSelector(state=>state.user);
    const {bannerMovies,moviesByGenre} = useSelector(state=>state.userMovie)
    const navigate = useNavigate()
    const [index,setIndex] = useState(0)
    const [showTrailer,setShowTrailer] = useState(false);
    const dispatch = useDispatch()


    useEffect(()=>{
      // if(!userToken){
      //   navigate('/login')
      //   return
      // }
      dispatch(userGetBannerMovies())
      dispatch(userGetMoviesByGenre())
    },[])

    useEffect(()=>{
      if(bannerMovies && moviesByGenre){
        window.scrollTo(0,0)  
      }
    },[bannerMovies,moviesByGenre])

    useEffect(()=>{
        let timer;
        if(showTrailer){
          clearInterval(timer)
          return
        }
         timer = setInterval(()=>{
          setIndex(prev => (prev < bannerImgs.length - 1 ? prev + 1 : 0));
        },6000)

        return ()=>{
          clearInterval(timer)
        }
    },[showTrailer])

    const handleBookTicket = ()=>{
      console.log("hvjvj");
    }
 
  return (
    <div className='pt-2 bg-[#15121B] '>
        <div className='relative text-white h-[50vh] sm:h-[55vh] md:h-[60vh] lg:h-[70vh] xl:h-[80vh] overflow-hidden'>
          {
            bannerMovies &&
          <AnimatePresence mode='wait'>

          <motion.div
          key={bannerMovies[index]?._id}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 , delay:0.10 ,ease : 'easeInOut'}}
          className='w-[100%] h-[100%]'>
          <div className='absolute bg-gradient-to-t from-[#15121b] w-[100%] to-transparent min-h-[90%] bottom-0 '></div>
            <motion.div 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.10 ,ease : 'easeInOut'}}  
            className='hidden mx-16 md:flex flex-col gap-4 absolute md:bottom-[1rem] lg:bottom-[2rem] xl:bottom-[6rem] '>
              <h2 className='text-xl  tracking-wider drop-shadow-2xl lg:text-4xl font-semibold '>{bannerMovies[index]?.title}</h2>
              <div className=' flex gap-1 flex-wrap md:gap-8 '>
                  <h5 className='text-[12px] sm:text-xs lg:text-sm h-[2rem] gap-3 flex items-center'><img src={pinlogo} alt="" className='object-cover h-[100%]'  />{bannerMovies[index]?.genres[0] ? bannerMovies[index]?.genres[0] : '' }{bannerMovies[index]?.genres[1] ?" / "+ bannerMovies[index]?.genres[1] : '' }{bannerMovies[index]?.genres[2] ?" / "+ bannerMovies[index]?.genres[2] : '' }</h5>
                  <h5 className='text-[12px] sm:text-xs lg:text-sm h-[2rem] gap-3 flex items-center'><FaRegCalendar className='text-[#f6ae2d] w-[2rem] h-[1.2rem]' />{bannerMovies[index]?.release_date.split('-')[0]}</h5>
                  <h5 className='text-[12px] sm:text-xs lg:text-sm h-[2rem] gap-3 flex items-center'><MdOutlineTimer className='text-[#f6ae2d] w-[2rem] h-[1.2rem]' />{bannerMovies[index]?.runtime + " min"}</h5>
              </div> 
                <button  className=' text-black font-medium tracking-widest border-2 border-black m-2 bg-[#f6ae2d] text-xs px-6 sm:px-10  md:px-12  lg:px-20 py-1 md:py-3 rounded-full'>BOOK TICKETS</button>
            </motion.div>
            <IoMdPlayCircle onClick={()=>setShowTrailer(true)} className='absolute text-[#9d9d9d8a] h-[2rem] md:h-[3rem] w-[2rem] md:w-[3rem] left-[49%] top-[48%] hover:text-white hover:scale-[1.1] transition-all duration-150 ease-in-out '/>
            <img src={bannerMovies[index]?.backdrop_path} alt="" className='mt-28 md:mt-0  mx-auto object-fill w-[100%]' />
          <TrailerModal isOpen={showTrailer} set={setShowTrailer} videoKey={bannerMovies[index]?.video_link} />
          </motion.div>
          </AnimatePresence>
          }
        </div>
        <div className='block md:hidden'>
          {
            bannerMovies &&
          <AnimatePresence mode='wait'>
          <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.10 ,ease : 'easeInOut'}} 
           className='mx-6 flex flex-col gap-4 text-white'>
          <h2 className='text-xl  tracking-wider drop-shadow-2xl lg:text-4xl font-semibold '>{bannerMovies[index]?.title}</h2>
          <div className=' flex gap-1 flex-wrap md:gap-8 '>
              <h5 className='text-[12px] sm:text-xs lg:text-sm h-[2rem] gap-3 flex items-center'><img src={pinlogo} alt="" className='object-cover h-[100%]'  />{bannerMovies[index]?.genres[0] ? bannerMovies[index]?.genres[0] : '' }{bannerMovies[index]?.genres[1] ?" / "+ bannerMovies[index]?.genres[1] : '' }{bannerMovies[index]?.genres[2] ?" / "+ bannerMovies[index]?.genres[2] : '' }</h5>
              <h5 className='text-[12px] sm:text-xs lg:text-sm h-[2rem] gap-3 flex items-center'><FaRegCalendar className='text-[#f6ae2d] w-[2rem] h-[1.2rem]' />{bannerMovies[index]?.release_date.split('-')[0]}</h5>
              <h5 className='text-[12px] sm:text-xs lg:text-sm h-[2rem] gap-3 flex items-center'><MdOutlineTimer className='text-[#f6ae2d] w-[2rem] h-[1.2rem]' />{bannerMovies[index]?.runtime + " min"}</h5>
          </div>
            <button className=' w-[65%] sm:w-[40%] text-black font-medium tracking-widest border-2 border-black m-2 bg-[#f6ae2d] text-xs px-6 sm:px-10  md:px-12  lg:px-20 py-1 md:py-3 rounded-full'>BOOK TICKETS</button>
        </motion.div>
        </AnimatePresence>
          }

        </div>


      <div className='mx-16 py-12'>
        {
          moviesByGenre && moviesByGenre.length > 0 && 
          moviesByGenre.map((genreObj,i)=>{
            return(
              genreObj?.movies && genreObj.movies.length > 0 && 
                <div key={genreObj.genre?.name+genreObj.genre?.id+i} className='my-12'>
                  <div className='h-[2rem] flex gap-1 sm:gap-4'>
                    <img src={pinlogo} alt="" className='object-cover h-full' />
                    <h1 className='text-base sm:text-lg font-medium tracking-wide text-white'>{genreObj?.genre?.name} Movies</h1>
                  </div>
                <div className='flex gap-6 overflow-x-scroll py-6 snap-x scrollbar-none'>
                  {
                    genreObj.movies.map(movie=>{
                      return(
                        <MovieCard2  key={movie.movie_id+i} movie={movie} />
                      )
                    })
                    }
                </div>
              </div>
            )
          })        
        }


      </div>
    </div>
  )
}

export default Home
