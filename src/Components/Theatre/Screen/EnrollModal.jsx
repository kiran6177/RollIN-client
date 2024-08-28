import React, { useEffect, useState } from 'react'
import { IoIosClose } from 'react-icons/io'
import { motion } from 'framer-motion'
import { Toaster, toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { createPortal } from 'react-dom'
import { theatreEnrollMovie } from '../../../features/theatreFeat/theatreFeatAction'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { resetTheatreFeatActions } from '../../../features/theatreFeat/theatreFeatSlice'
import ModalLoader from '../../Loaders/ModalLoader'

const confirmVarinat = {
    hidden:{
      scale:0
    },
    visible:{
      scale:1,
      transition:{
        type:"spring",
        bounce:0.5
      }
    }
  }
  

function EnrollModal({isOpen,set,movie}) {

    const {loading,message,theatreScreenData,error} = useSelector(state=>state.theatreFeat);
    const {theatreToken} = useSelector(state=>state.theatre)
    const [fromDate,setFromDate] = useState('')
    const [toDate,setToDate] = useState('')

    const [searchParams] = useSearchParams();
    const screenid = searchParams.get('screen_id')
    const [screen_id,setScreenId] = useState(null)
    const [screenSelect,setScreenSelect] = useState(false)
    const [screenName,setScreenName] = useState(false)

    const dispatch = useDispatch();
    const navigate = useNavigate()
    useEffect(()=>{
        console.log(screenid);
        setScreenId(screenid)
    },[screenid])

    useEffect(()=>{
        if(screen_id !== null){
            theatreScreenData.map(screen =>{
                if(screen_id === screen._id){
                    setScreenName(screen.name)
                }
            })
        }
    },[screen_id])

    useEffect(()=>{
        if(error && error.length > 0){
            error.map(err=>toast.error(err))
            dispatch(resetTheatreFeatActions())
            return
        }
        if(message){
            toast.success(message)
            dispatch(resetTheatreFeatActions())
            set(false)
            setTimeout(()=>{
                navigate(`/theatre/editscreen?id=${screen_id}`)
            },1200)
            return
        }
    },[message,error])

    const handleConfirm = ()=>{
        if(fromDate !== '' && toDate !== ''){
        const movieReleaseDate = new Date(movie?.release_date);
        const nowDate = new Date();
        const from = new Date(fromDate)
        const to = new Date(toDate)
        if(movieReleaseDate > from){
            toast.error('invalid Enroll From Date.')
        }else if(movieReleaseDate > to){
            toast.error('invalid Enroll To Date.')
        }else if(to < from){
            toast.error('invalid Enroll Dates.')
        }else if(nowDate > from){
            toast.error('invalid Enroll From Date.')
        }else{
            console.log("VALIDATED"); 
            console.log(screen_id);
            console.log(movie,from,to);
            const data = {
                screen_id,
                movie,
                enroll_from:from,
                enroll_to:to,
            }
            dispatch(theatreEnrollMovie({data,token:theatreToken}))
        }
        }else{
            toast.error('Please select date.')
        }
    }

    if(isOpen){ 
        return createPortal(
            <div className='w-[100%] h-[100vh] fixed top-0 pt-26 flex items-center justify-center bg-[#00000091] z-40'>
              <Toaster richColors />
                <motion.div
                variants={confirmVarinat}
                initial="hidden"
                animate="visible"
                className='bg-black text-white w-[80%] sm:w-[65%] lg:w-[45%] xl:w-[35%] border-2 border-[#f6ae2d] rounded-md p-8 flex flex-col gap-6 justify-center items-center fixed min-h-[70vh] '>
                      <IoIosClose onClick={()=>set(false)} className="absolute cursor-pointer right-3 top-3 w-[2rem] h-[2rem]"/>
                        <h1 className='my-0 font-medium text-lg tracking-wider text-center'>Enroll Movie</h1>
                        <div className='w-[100%] flex flex-col items-center gap-4 '>
                        <h3 className='text-xl font-semibold tracking-widest w-[90%] overflow-hidden text-ellipsis whitespace-nowrap text-center text-[#f6ae2d]'>{movie?.title}</h3>
                        <h3 className='text-lg font-semibold tracking-widest w-[90%] overflow-hidden text-ellipsis whitespace-nowrap text-center text-white'>{movie?.release_date}</h3>
                        <label className='text-white text-xs w-[90%]' >Enroll From</label>
                        <input type="date" min={new Date().toISOString().split('T')[0]} value={fromDate} onChange={(e)=>setFromDate(e.target.value)} className='w-[90%] p-3 border-2 mx-auto text-sm rounded-md  border-[#0951D2] invert text-black' />

                        <label className='text-white text-xs w-[90%]' >Enroll To</label>
                        <input type="date" min={new Date().toISOString().split('T')[0]} value={toDate} onChange={(e)=>setToDate(e.target.value)} className='w-[90%] p-3 border-2 mx-auto text-sm rounded-md  border-[#0951D2] invert text-black' />

                            {screen_id === null ? <div className='sm:w-[40%] flex flex-col items-center justify-center'>

                                {
                                theatreScreenData.length > 0 && screenSelect  ?
                                <div className=' overflow-scroll scrollbar-none flex flex-col justify-start text-black w-[90%] h-[7rem] '>
                                    

                                    {
                                    theatreScreenData.map((screen,i)=>{
                                        return (
                                        <div key={i} onClick={()=>{setScreenId(screen._id);setScreenSelect(false)}} className='min-h-[3rem] flex items-center bg-white rounded-sm  ml-[1.5px] mt-[1px] border-black w-[100%]'>
                                            <p className='mx-5 w-[100%] text-xs sm:text-base text-ellipsis overflow-hidden'>{screen.name}</p>
                                        </div>
                                        )
                                    })
                                    }

                                </div>
                                :
                                <div onClick={()=>setScreenSelect(true)} className=' flex items-center  text-black w-[90%] h-[3rem] bg-[#f6ae2d] rounded-sm border-2 border-black' >
                                <p className='mx-5 text-xs sm:text-base'>Choose Screen</p>      
                                </div>
                                }


                            </div> :
                        <h3 className=' text-sm sm:text-xl font-semibold tracking-widest w-[90%] overflow-hidden text-ellipsis whitespace-nowrap text-center text-[#f6ae2d]'>{screenName}</h3>
                            }
                        </div>

                        <div className='w-[100%] flex flex-col md:flex-row md:items-center justify-center gap-8'>
                            <button onClick={()=>handleConfirm(movie.movie_id)} disabled={loading} className={loading? 'bg-[#cb9635d6] border-2 border-[#f6ae2d] text-black px-8 text-sm md:text-base py-1 md:py-2 rounded-md hover:bg-black hover:text-white transition-all duration-200 ease-in-out' :'bg-[#f6ae2d] border-2 border-[#f6ae2d] text-black px-8 text-sm md:text-base py-1 md:py-2 rounded-md hover:bg-black hover:text-white transition-all duration-200 ease-in-out'}>CONFIRM</button>
                            <button onClick={()=>set(false)} disabled={loading} className={loading ? 'bg-[#cb9635d6] border-2 border-[#f6ae2d] text-black px-8 text-sm md:text-base py-1 md:py-2 rounded-md hover:bg-black hover:text-white transition-all duration-200 ease-in-out' :'bg-[#f6ae2d] border-2 border-[#f6ae2d] text-black px-8 text-sm md:text-base py-1 md:py-2 rounded-md hover:bg-black hover:text-white transition-all duration-200 ease-in-out'}>CANCEL</button>
                        </div>
                        {loading &&
                            <ModalLoader loading={loading} />
                        }
                </motion.div>
            </div>,
            document.getElementById("trailer-modal")
          )
    }else{
        return null
    }
    
}

export default EnrollModal
