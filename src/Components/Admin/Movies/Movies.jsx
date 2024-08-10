import React, { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Toaster, toast } from 'sonner';
import { resetAdminActions } from '../../../features/admin/adminSlice';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { adminGetMoviesFromDB } from '../../../features/movie/movieActions';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ScaleLoader } from 'react-spinners';
import { resetDBMovies } from '../../../features/movie/movieSlice';
import LoadingSpinner from '../../Loaders/LoadingSpinner';
import MovieCard2Skelton from '../../../Skelton/MovieCard2Skelton';
const MovieCard = lazy(()=>import('../Movies/MovieCard'));

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

function Movies() {
    const {adminData,adminToken,message} = useSelector(state=>state.admin);
    const {moviesData,loading} = useSelector(state=>state.movie)
    const [page,setPage] = useState(1);
    const dispatch = useDispatch();
    const scrollRef = useRef(null)


    useEffect(()=>{
      dispatch(resetDBMovies())
      dispatch(adminGetMoviesFromDB({page:page,token:adminToken}))
    },[])

    useEffect(()=>{
      if(message){
        toast.success(message);
        dispatch(resetAdminActions());
        return
      }
    },[adminToken,message])



    const nextPage = ()=>{
      console.log("next",page);
      dispatch(adminGetMoviesFromDB({page:page+1,token:adminToken}))
      setPage((prev)=>prev+1)
    }
    return (
      <>
      {loading && <LoadingSpinner/>}
      <div className='pt-28 lg:pl-56 min-h-[100vh] bg-[#15121B]'>
      <Toaster richColors />
      <div className='p-8 sm:p-12 w-[95%] mx-auto'>
        <div className='flex flex-col gap-4 sm:flex-row justify-between mb-12'>
            <h2 className='text-white font-semibold text-4xl'>Movies</h2>
            <Link to={'/admin/addmovie'} className='text-black font-medium border-2 border-[#f6ae2d] bg-[#f6ae2d] rounded-md px-6 py-2 hover:bg-black hover:text-white transition-all duration-250 ease-in-out'>Add Movies</Link>
        </div>
      <div ref={scrollRef} className='my-6 mx-auto flex flex-wrap gap-6 justify-evenly '>
      {
        moviesData &&  moviesData.length > 0 ?
        <InfiniteScroll dataLength={moviesData?.length} scrollThreshold={'10px'} scrollableTarget={scrollRef} next={nextPage} loader={<ScaleLoader className='absolute -bottom-[6rem] ' color='#f6ae2d'/>} hasMore={true} className='my-6 py-4 px-2 mx-auto flex flex-wrap gap-7 relative  justify-evenly scrollbar-none'>
        {
          moviesData.map((movie,i)=>{
            return (
              <motion.div 
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{once:true}}
              key={movie.title+movie.movie_id+i}
              >
               <Suspense fallback={<MovieCard2Skelton/>}>
                <MovieCard  movie={movie} />
               </Suspense>
          </motion.div>
          )
        })
        }
        </InfiniteScroll>
        : <div className='text-white tracking-widest'> NO MOVIES FOUND.</div>
      }

        
      </div>
      </div>
    </div>
    </>
  )
}

export default Movies
