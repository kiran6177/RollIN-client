import React, { lazy, Suspense } from 'react'
import CastIconSkelton from '../../../Skelton/CastIconSkelton'
import { useNavigate } from 'react-router'
const CastIcon = lazy(()=>import('../Screen/CastIcon')) 

function RunningMovie({movie}) {
    const navigate = useNavigate();
  return (
        <div className='aspect-video min-w-[576px] md:min-w-[768px] lg:min-w-[998px] rounded-md overflow-hidden border-2 border-black relative' >
              <img src={movie?.backdrop_path} alt="" height={'100%'} className='object-cover'  />
              <div className='bg-gradient-to-t from-black to-transparent w-full h-full absolute top-0 '></div>
            <div className='absolute bottom-[1rem] left-[1rem] lg:bottom-[3rem] lg:left-[3rem] z-10 flex flex-col md:flex-row gap-6 md:gap-14 w-full'>
                <div onClick={()=>navigate(`/theatre/movies/moviedetail?movie_id=${movie?.movie_id}`)} className='aspect-[4/5] w-[20%] border-[1px] h-fit border-[#f6ae2d] rounded-sm overflow-hidden hover:scale-[1.02] cursor-pointer transition-all duration-250 ease-linear'>
                  <img src={movie?.poster_path} alt="" className='object-cover' height={'100%'} />
                </div>
                <div className='flex flex-col gap-3 w-[65%] overflow-hidden '>
                    <h2 className='font-semibold text-[#f6ae2d] text-lg md:text-3xl tracking-widest'>{movie?.title}</h2>
                    <h2 className='font-semibold text-white text-xs md:text-base tracking-widest'>{movie?.screen_name}</h2>
                    <h2 className='font-semibold text-white text-xs md:text-base tracking-widest' >{movie?.genres[0] ? movie?.genres[0]?.name ? movie?.genres[0]?.name : movie?.genres[0]  : '' }{movie?.genres[1] ? movie?.genres[1]?.name ? " / "+ movie?.genres[1]?.name : " / "+ movie?.genres[1] : '' }</h2>
                  <div className='hidden md:flex w-[100%] overflow-x-scroll p-8 gap-6 scrollbar-none'>
                    {
                        movie?.cast?.length > 0 && movie?.cast.map((person,i)=>{
                            return (<Suspense key={'cast'+person._id + i} fallback={<CastIconSkelton/>}><CastIcon  person={person} type={"no"} /></Suspense>)
                        })
                    }
                    {
                        movie?.crew?.length > 0 && movie?.crew.map((person,i)=>{
                            return (<Suspense key={'crew'+person._id + i} fallback={<CastIconSkelton/>}><CastIcon  person={person} type={"no"} /></Suspense>)
                        })
                    }
                  </div>
                </div>
            </div>
        </div>
  )
}

export default RunningMovie
