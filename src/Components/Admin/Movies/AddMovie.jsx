import React, { useEffect, useRef, useState } from 'react'
import { Toaster } from 'sonner'
import Filter from './Filter'
import { languages } from '../../../constants/movie-constants/languages'
import { GENRES } from '../../../constants/movie-constants/genres'
import { sortValues } from '../../../constants/movie-constants/sortvalues'
import MovieCard from './MovieCard'
import { adminGetAllTMDBMovies } from '../../../features/movie/movieActions';
import { useDispatch, useSelector } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component'
import { ScaleLoader } from 'react-spinners'
import { motion } from 'framer-motion'
import { resetAddMovies } from '../../../features/movie/movieSlice'
import useDebounce from '../../../hooks/debounce'

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

function AddMovie() {
    const [genre,setGenre] = useState('');
    const [lang,setLang] = useState('');
    const [sort,setSort] = useState('');
    const [query,setQuery] = useState('')
    const [page,setPage] = useState(1);
    const {adminToken} = useSelector(state=>state.admin);
    const {addMoviesData} = useSelector(state=>state.movie)
    const dispatch = useDispatch()

    const [debouncedValue] = useDebounce(query)

    const scrollRef = useRef(null)

    useEffect(()=>{
      if(addMoviesData){
        dispatch(resetAddMovies())
      }
    },[])

    useEffect(()=>{
      dispatch(resetAddMovies())
      dispatch(adminGetAllTMDBMovies({filters:{genre,lang,page:1,sort,query:debouncedValue},token:adminToken}))
    },[genre,lang,sort,debouncedValue])

    useEffect(()=>{
      if(addMoviesData?.length > 0){
        setPage((prev)=>prev+1)
      }
    },[addMoviesData])

    const nextPage = ()=>{
      console.log("next",page);
      dispatch(adminGetAllTMDBMovies({filters:{genre,lang,page,sort,query:debouncedValue},token:adminToken}))
    }

  return (
    <div className='pt-28 lg:pl-56 min-h-[100vh] bg-[#15121B]'>
      <Toaster richColors />
        <div className='p-8 sm:p-12 w-[95%] mx-auto'>
            <h2 className='text-white font-semibold text-lg sm:text-2xl lg:text-4xl my-5'>ADD MOVIES</h2>
            <div className='my-8 flex flex-col gap-4 md:flex-row md:gap-0  justify-between'>
                <input type="text" value={query} onChange={(e)=>setQuery(e.target.value)} className='md:w-[75%] border-2 bg-black text-white border-[#f6ae2d] rounded-md p-3 '  />
                <button onClick={()=>setQuery(query)} className='w[20%] border-2 border-[#f6ae2d] bg-[#f6ae2d] px-8 py-3 rounded-md font-semibold tracking-widest hover:bg-black hover:text-white transition-all duration-150 ease-in-out'>Search</button>
            </div>
            <div className='w-[100%] flex flex-col items-center gap-6 sm:flex-row sm:gap-0  justify-between'>
                <div className='flex flex-col gap-6 border-2 border-[#f6ae2d] rounded-md  p-6 bg-black w-[90%] sm:w-[45%]'>
                    <h6 className='text-2xl text-[#f6ae2d]'>Filter</h6>
                    <div className='flex flex-col xl:flex-row w-[100%] gap-6'> 
                    <Filter type={'Genre'} data={GENRES} set={setGenre} />
                    <Filter type={'Language'} data={languages} set={setLang} />
                    </div> 
                </div>
                <div className='flex flex-col gap-6 border-2 border-[#f6ae2d] rounded-md  p-6 bg-black w-[90%] sm:w-[45%]'>
                    <h6 className='text-2xl text-[#f6ae2d]'>Sort</h6>
                    <div className='flex flex-col xl:flex-row w-[100%] gap-6'>
                    <Filter type={'Type'} data={sortValues} set={setSort} />
                    </div> 
                </div>
            </div>

      <div ref={scrollRef} className='my-6 mx-auto flex flex-wrap gap-7  justify-evenly'>
        {
          addMoviesData &&  addMoviesData.length > 0 ?
          <InfiniteScroll dataLength={addMoviesData?.length} scrollThreshold={'10px'} scrollableTarget={scrollRef} next={nextPage} loader={<ScaleLoader className='absolute -bottom-[6rem] ' color='#f6ae2d'/>} hasMore={true} className='my-6 mx-auto flex flex-wrap gap-7 relative  justify-evenly scrollbar-none'>
          {
            addMoviesData.map((movie,i)=>{
             return (
              <motion.div 
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{once:true}}
              key={movie.title+movie.movie_id+i}
              >
                 <MovieCard  movie={movie} />
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
  )
}

export default AddMovie
