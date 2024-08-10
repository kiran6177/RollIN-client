import React, { lazy, Suspense, useEffect, useRef, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import { ScaleLoader } from 'react-spinners';
import { motion } from 'framer-motion';
import { userGetAllMovies } from '../../../features/userMovies/userMovieActions';
import { resetAllMoviesData } from '../../../features/userMovies/userMovieSlice';
import ToggleButton from './ToggleButton';
import { languages } from '../../../constants/movie-constants/languages';
import { GENRES } from '../../../constants/movie-constants/genres';
import useDebounce from '../../../hooks/debounce';
import MovieCard2Skelton from '../../../Skelton/MovieCard2Skelton';
import { useNavigate, useSearchParams } from 'react-router-dom';
const MovieCard = lazy(()=>import('./MovieCard'));

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


function MoviesMain() { 
    const scrollRef = useRef(null);
    const {allMoviesData} = useSelector(state=>state.userMovie)
    const [page,setPage] = useState(1);
    const [filterArray,setFilterArray] = useState([])
    const [location,setLocation] = useState(null)

    const [open,setOpen] = useState(false)
    const [query,setQuery] = useState('')

    const [debouncedValue] = useDebounce(query)

    const buttonRefs = useRef([])
    const genreButtonRefs = useRef([])

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const genre = searchParams.get('genre');
    const lang = searchParams.get('lang');

    useEffect(()=>{
        dispatch(resetAllMoviesData())
        if(localStorage.getItem('city')){
          const location = JSON.parse(localStorage.getItem('city')).loc;
          setLocation(location)
          if((!genre || genre === '') && (!lang || lang === '')){
            dispatch(userGetAllMovies({page:1,location}))
          }else{
            dispatch(resetAllMoviesData())
            if(genre){
              setFilterArray([{type:'genre',data:genre}])
            }else{
              setFilterArray([{type:'language',data:lang}])
            }
            window.scrollTo(0,0)
          }
        }else{
          if((!genre || genre === '') && (!lang || lang === '')){
            dispatch(userGetAllMovies({page:1}))
          }else{
            dispatch(resetAllMoviesData())
            if(genre){
              setFilterArray([{type:'genre',data:genre}])
            }else{
              setFilterArray([{type:'language',data:lang}])
            }
            window.scrollTo(0,0)
          }
        }
        return ()=>{
        dispatch(resetAllMoviesData())
        }
    },[genre,lang])

    useEffect(()=>{
        if(allMoviesData?.length > 0){
          setPage((prev)=>prev+1)
        }else{
          setPage(1)
        }
      },[allMoviesData])

      useEffect(()=>{
          let languages = [];
          let genres = [];
          console.log(page);
        if(filterArray.length === 0){
          setOpen(false)
          dispatch(resetAllMoviesData())
        }else{
          setOpen(true)
          filterArray.map(filter=>{
            if(filter.type === 'genre'){
              genres.push(filter.data)
            }else if(filter.type === 'language'){
              languages.push(filter.data)
            }
          })
          dispatch(resetAllMoviesData())
          dispatch(userGetAllMovies({page:page,languages,genres,search:debouncedValue,location:location}))
        }
      },[filterArray])

      useEffect(()=>{
        if(debouncedValue !== ''){
          let languages = []; 
          let genres = [];
        filterArray.map(filter=>{
          if(filter.type === 'genre'){
            genres.push(filter.data)
          }else if(filter.type === 'language'){
            languages.push(filter.data)
          }
        })
        dispatch(resetAllMoviesData())
        dispatch(userGetAllMovies({page:1,languages,genres,search:debouncedValue,location:location}))
        }
      },[debouncedValue])

    const nextPage = ()=>{
        let languages = [];
        let genres = [];
        if(filterArray.length > 0){
          filterArray.map(filter=>{
            if(filter.type === 'genre'){
              genres.push(filter.data)
            }else if(filter.type === 'language'){
              languages.push(filter.data)
            }
          })
        }
        dispatch(userGetAllMovies({page,languages,genres,search:debouncedValue,location:location}))
      }

    const handleSetFilter = (newFilter)=>{
      setPage(1)
      setFilterArray([...filterArray,newFilter])
    }

    const removeFromFilter = (filter)=>{
      setPage(1)
      setFilterArray(filterArray.filter(fill=>fill.data !== filter))
      if(filterArray.length === 1){
        dispatch(userGetAllMovies({page:1,location:location}))
      }
    }

    const handleReset = ()=>{
      setPage(1)
      setFilterArray([])
      if((!genre || genre === '') && (!lang || lang === '')){
      dispatch(userGetAllMovies({page:1,location:location})) 
      buttonRefs.current.map(btn=>{
        btn.reset()
      })
      genreButtonRefs.current.map(btn=>{
        btn.reset()
      })
      }else{
        navigate(`/movies`)
        dispatch(resetAllMoviesData())
        dispatch(userGetAllMovies({page:1,location}))
      }
    }
      
    const handleSearch = ()=>{
      let languages = [];
        let genres = [];
        if(filterArray.length > 0){
          filterArray.map(filter=>{
            if(filter.type === 'genre'){
              genres.push(filter.data)
            }else if(filter.type === 'language'){
              languages.push(filter.data)
            }
          })
        }
        dispatch(resetAllMoviesData())
        dispatch(userGetAllMovies({page:1,languages,genres,search:debouncedValue,location:location}))
    }
  return (
    <div className='pt-32 bg-[#15121B]'>
      <div className='p-12'>
      <h2 className='text-white font-semibold text-4xl'>MOVIES</h2>
      <div className='text-white my-10'>
        <div className='flex flex-col gap-4 my-4'>
        <h3 className='text-lg font-medium tracking-wider'>Search</h3>
        <div className='flex flex-col md:flex-row gap-8'>
          <input value={query} onChange={(e)=>setQuery(e.target.value)} type="text" className='bg-black border-2 border-[#f6ae2d] rounded-md p-2 md:w-[70%]' />
          <button onClick={handleSearch} className='border-2 border-[#f6ae2d] rounded-md text-black bg-[#f6ae2d] px-6 py-2 hover:bg-black hover:text-white transition-all duration-150 ease-in-out'>SEARCH</button>
        </div>
        </div>

        <div className='flex justify-between'><h3 className='text-lg font-medium tracking-wider'>Filters</h3>{open && <h6 onClick={handleReset} className='pr-[18rem] cursor-pointer'>RESET</h6>}</div>
        <div className='flex gap-4 w-[90%] my-4'>
          {
            filterArray.length > 0 &&
            filterArray.map((filter,i)=>{
              return(
                <button key={filter+i} className='border-2 border-[#f6ae2d] bg-[#f6ae2d]  rounded-full px-6 py-1 text-black font-medium text-sm'>{filter?.data}</button>
              )
            })

          }

        </div>
        <div className='flex flex-col lg:flex-row gap-6 mt-4'>
          <div className='border-2 border-[#f6ae2d] xl:w-[40%] bg-black rounded-sm p-6'>
            <h3 className='text-[#f6ae2d]'>LANGUAGE</h3>
            <div className='my-4 flex gap-4 flex-wrap text-white max-h-[10rem] overflow-y-scroll lg:max-h-max'>
              {
                languages && languages.length > 0 &&
                languages.map((lang,i)=>{
                  return(
                    <ToggleButton key={lang+i} type={'language'} ref={(element)=>buttonRefs.current[i] = element} data={lang.name} setToFilter={handleSetFilter} removeFromFilter={removeFromFilter} setAdded={setOpen}/>
                  )
                })
              }

            </div>
            

          </div>
          <div className='border-2 border-[#f6ae2d] xl:w-[40%] bg-black rounded-sm p-6'>
            <h3 className='text-[#f6ae2d]'>GENRE</h3>
            <div className='my-4 flex gap-4 flex-wrap text-white max-h-[10rem] overflow-y-scroll lg:max-h-max'>
              {
                GENRES && GENRES.length > 0 &&
                GENRES.map((genre,i)=>{
                  return(
                    <ToggleButton key={genre+i} type={'genre'} ref={(element)=>genreButtonRefs.current[i] = element} data={genre.name} setToFilter={handleSetFilter} removeFromFilter={removeFromFilter} setAdded={setOpen}/>
                  )
                })
              }

            </div>
          </div>
        </div>
      </div>
      <div ref={scrollRef} className='my-6 mx-auto flex flex-wrap gap-6 justify-evenly '>
        {
            allMoviesData &&  allMoviesData.length > 0 ?
            <InfiniteScroll dataLength={allMoviesData?.length} scrollThreshold={'750px'} scrollableTarget={scrollRef} next={nextPage} loader={<ScaleLoader className='absolute -bottom-[6rem] ' color='#f6ae2d'/>} hasMore={true} className='my-6 py-4 px-2 mx-auto flex flex-wrap gap-7 relative  justify-evenly scrollbar-none'>
            {
            allMoviesData.map((movie,i)=>{
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
  )
}

export default MoviesMain
