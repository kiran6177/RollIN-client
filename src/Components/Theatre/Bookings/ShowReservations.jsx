import React, { lazy, Suspense, useEffect, useState } from 'react'
import { BiSolidSpeaker } from 'react-icons/bi'
import { LuArmchair } from 'react-icons/lu'
import { MdChair } from 'react-icons/md'
import { RiSpeaker2Fill, RiSpeaker3Fill } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast, Toaster } from 'sonner'
import { theatreGetSingleShow } from '../../../features/theatreBookings/theatreBookingActions'
import { resetTheatreBookingActions } from '../../../features/theatreBookings/theatreBookingSlice'
import LoadingSpinner from '../../Loaders/LoadingSpinner'
const SoldConfirmModal = lazy(()=>import('./SoldConfirmModal')) 

function ShowReservations() {
    const [show,setShow] = useState(null)
    const {theatreToken} = useSelector(state=>state.theatre)
    const {screenshows,singleShowDetails,message,error,loading} = useSelector(state=>state.theatreBooking)
    const [searchParams] = useSearchParams()
    const show_id = searchParams.get("show_id");
    const date = searchParams.get("date")
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [singleShow,setSingleShow] = useState(null);

    const [timeoutId,setTimeoutId] = useState(null)
    const [showTooltip,setShowTooltip] = useState('')
    const [showSold,setShowSold] = useState(false);

    useEffect(()=>{
        if(screenshows?.length > 0){
            screenshows.map(show=>{
                if(show?.show_id?.toString() === show_id && show?.reserved_date === date){
                    setShow(show)
                }
            })
        }
    },[screenshows])

    useEffect(()=>{
        if(show){
            const data = {date:show?.reserved_date,show_id}
            dispatch(theatreGetSingleShow({data,token:theatreToken}))
        }
    },[show])

    useEffect(()=>{
        if(singleShowDetails){
            setSingleShow(singleShowDetails)
        }
    },[singleShowDetails])

    useEffect(()=>{
        if(message === 'Seat Booked Successfully.'){
            toast.success(message)
            dispatch(resetTheatreBookingActions())
            setShowSold(false)
            if(show){
                const data = {date:show?.reserved_date,show_id}
                dispatch(theatreGetSingleShow({data,token:theatreToken}))
            }
        }
    },[message])

    useEffect(()=>{
        if(error?.length > 0 && error[0] === 'Seat already booked!!'){
            toast.error('Seat already booked!!') 
            setShowSold(false)
            dispatch(resetTheatreBookingActions())
            if(show){
                const data = {date:show?.reserved_date,show_id}
                dispatch(theatreGetSingleShow({data,token:theatreToken}))
            }
        }
    },[error])

    const handleSeatSelection = (seats,key)=>{
        console.log(seats,key);
        const seatData = [seats?.seat_number]
        const data = {show_id,seatData,date}
        console.log(data);
        setShowSold(data)
    }

    const handleMouseEnter = (key)=>{
        if(timeoutId){
            clearTimeout(timeoutId)
            setTimeoutId(null)
        }
        const id = setTimeout(()=>{
            setShowTooltip(key)
        },500)
        setTimeoutId(id)
    }

    const handleMouseLeave = (e)=>{
        if(timeoutId){
            clearTimeout(timeoutId)
            setTimeoutId(null)
        }
        setShowTooltip('')
    }
    if(loading){
        return <LoadingSpinner/>
    }else{

        return (
            <div className='py-10 bg-[#15121B] '>
        <Toaster richColors />
        <div className='pt-28 px-12  min-h-[10rem]'>
            <div className='flex justify-between items-center'>
            <h2 className='text-white text-3xl font-semibold tracking-widest'>SHOW BOOKINGS</h2>
            <button onClick={()=>navigate(`/theatre/bookings/list?show_id=${show_id}&date=${date}`)} className='bg-[#f6ae2d] px-8 rounded-sm py-2 font-medium tracking-widest border-2 border-[#f6ae2d] hover:bg-black hover:text-white transition-all duration-150 ease-linear'>BOOKINGS</button>
            </div>
            <div className='border-2 border-[#f6ae2d] sm:max-h-[15rem]  bg-black rounded-sm flex flex-col-reverse sm:flex-row justify-between my-8'>
                <div className='flex flex-col sm:w-[40%] justify-evenly gap-2 p-6'>
                    <h2 className='text-[#f6ae2d] text-4xl font-semibold tracking-widest '>{show?.showtime}</h2>
                    <h2 className='text-white text-xl'>{new Date(show?.reserved_date).toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'})}</h2>
                    <h2 className='text-[#a4a3a3] text-md tracking-wider'>{show?.movie_data?.title}</h2> 
                </div>
                <div className='relative sm:max-w-[27%]  sm:max-h-[15rem] overflow-hidden'>
                <div className='absolute bg-gradient-to-t sm:bg-gradient-to-r from-black to-transparent w-[100%] h-[100%] top-0 left-0'></div>
                    <img src={show?.movie_data?.backdrop_path} alt=""  className='h-[100%] object-cover' />
                </div>
            </div>
            <div className='bg-black py-12 px-4 border-2 rounded-md border-[#f6ae2d]'>
                <div className='relative my-6 sm:my-16 md:mx-12 lg:mx-28 xl:mx-36 '> 
                    {
                        singleShow && [...singleShow?.tiers].reverse().map((tierData,i)=>{ 
                            return (
                                <div key={tierData?.name+i} className='flex flex-col text-white w-[85%] mx-auto text-[12px] sm:text-xs md:text-base '>
                                    <div key={'first'+i} className='flex gap-4 items-center justify-between my-3'>
                                        <div className='flex flex-col sm:flex-row gap-4 items-center'>
                                            <p className='text-[#f6ae2d]'>{tierData?.name}</p>
                                            <p>Rs. {tierData?.rate}</p>
                                        </div>
                                            
                                    </div> 
                                    <div>
                                        {
                                            tierData?.identifiers?.length > 0 && tierData?.identifiers.map((key,i)=>{
                                                const value = singleShow?.shows[0]?.reservations?.find(obj=>Object.keys(obj)[0] === key)
                                                return(
                                                <div key={"main"+key+i} className='flex h-[100%] w-[100%] items-center mx-auto my-2'> 
                                                    <div className='text-white text-xs md:text-base'>
                                                        <p className='text-[10px] sm:text-xs md:text-base w-[1.5rem]'>{key}</p>
                                                    </div>
                                                    <div key={key+i} style={{gridTemplateColumns:`repeat(${value[key]?.length},1fr)`}} className={`grid w-[100%]`}> 
                                                        {value[key].map((seats,i)=>{
                                                            return(
                                                                <div key={"chair"+key+i}  className={`relative aspect-square flex justify-center items-center`}>
                                                                    {
                                                                    showTooltip === (key+i) && 
                                                                    <div className=' bg-black border-[1px] border-[#f6ae2d] w-[10rem] h-[8rem] rounded-sm p-4 absolute flex flex-col justify-evenly -top-[8.5rem] z-20' >
                                                                        <h2 className='text-[#f6ae2d] text-lg font-semibold tracking-widest'>{seats?.seat_number}</h2>
                                                                        <h2 className='tracking-wider text-sm'>{seats?.status}</h2>
                                                                        {seats?.user_id?.name ?  <h2 className='tracking-wider text-sm'>{seats?.user_id?.name}</h2> : <p className='text-xs text-white'>Click to Book ticket.</p>}
                                                                    </div>
                                                                    }
                                                                    {seats.status !== 'INVALID' ? seats.status === 'AVAILABLE' ? <LuArmchair onMouseEnter={(e)=>handleMouseEnter(key+i)} onMouseLeave={(e)=>handleMouseLeave(e)} onClick={()=>handleSeatSelection(seats,key)} className='text-[#f6ae2d] w-[80%] sm:w-[60%] h-[80%] sm:h-[60%] cursor-pointer hover:scale-[1.1] transition-all duration-150 ease-linear' /> : seats.status === "RESERVED" || seats.status === 'SOLD' ?  <MdChair onMouseEnter={(e)=>handleMouseEnter(key+i)} onMouseLeave={(e)=>handleMouseLeave(e)} className='text-[#f6b02d7c] w-[80%] sm:w-[60%] h-[80%] sm:h-[60%] cursor-pointer hover:scale-[1.1] transition-all duration-150 ease-linear' /> : <MdChair onMouseEnter={(e)=>handleMouseEnter(key+i)} onMouseLeave={(e)=>handleMouseLeave(e)}  className='text-[#f6ae2d] w-[80%] sm:w-[60%] h-[80%] sm:h-[60%] cursor-pointer hover:scale-[1.1] transition-all duration-150 ease-linear' /> : '' }
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                </div> 
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div className='w-[100%] flex justify-center mt-24'>
                        <div className='w-[50%] border-black border-b-[#f6ae2d] border-b-[1rem] md:border-b-[2rem] border-r-[1rem] sm:border-r-[2rem] md:border-r-[3rem] lg:border-r-[4rem] xl:border-r-[5rem] border-l-[1rem] sm:border-l-[2rem] md:border-l-[3rem] lg:border-l-[4rem] xl:border-l-[5rem]'></div>
                    </div>
                    {/* front speakers */}
                    <div className='text-[#f6ae2d] absolute bottom-10 flex justify-evenly w-[100%] '>
                        {
                            singleShow?.sound?.front >  0 && Array.from({length:singleShow.sound.front}).map((_,index)=>{
                                return(
                                    <div key={'front'+index} className='flex items-center justify-evenly '>
                                    <BiSolidSpeaker  className='md:h-[2rem] md:w-[2rem]'/>
                                    </div>
                                )
                            })
                        }
                    </div>
                    {/* sub speakers */}
                    <div className='text-[#f6ae2d] absolute bottom-10 flex justify-center w-[100%] '>
                    {
                        singleShow?.sound?.subwoofers > 0 && Array.from({length:singleShow.sound.subwoofers}).map((_,ind)=>{
                                            return (
                                                <div key={'sub'+ind} className='flex items-center justify-evenly '>
                                                    <RiSpeaker3Fill   className='md:h-[1.5rem] md:w-[1.5rem]' />
                                                </div>
                                            )
                                        })
                                    }
                    </div>
                    {/* center speakers */}
                    <div className='text-[#f6ae2d] absolute bottom-16 md:bottom-20 flex justify-center w-[100%] '>
                    {
                        singleShow?.sound?.center > 0 && Array.from({length:singleShow.sound.center}).map((_,ind)=>{
                                            return (
                                                <div key={'center'+ind} className='flex items-center justify-evenly bg-[#f6ae2d] text-black'>
                                                    <RiSpeaker2Fill  className='md:h-[1.5rem] md:w-[1.5rem]' />
                                                    <RiSpeaker2Fill  className='md:h-[1.5rem] md:w-[1.5rem]' />
                                                    
                                                </div>
                                            )
                                        })
                                    }
                    </div>
                    {/* rear speakers */}
                    <div className='text-[#f6ae2d] absolute -top-8 sm:-top-14 flex justify-evenly w-[100%] '>
                        {
                            singleShow?.sound?.rear >  0 && Array.from({length:singleShow.sound.rear}).map((_,index)=>{
                                return(
                                    <BiSolidSpeaker key={'rear'+index}  className='md:h-[2rem] md:w-[2rem]'/>
                                )
                            })
                        }
                    </div>
                    {/* left speakers */}
                    <div className='text-[#f6ae2d] absolute -left-3 md:-left-0 top-0 flex flex-col justify-evenly h-[100%] '>
                        {
                            singleShow?.sound?.left >  0 && Array.from({length:singleShow.sound.left}).map((_,index)=>{
                                return(
                                    <BiSolidSpeaker key={'left'+index}  className='md:h-[2rem] md:w-[2rem]'/>
                                )
                            })
                        }
                    </div>
                    {/* right speakers */}
                    <div className='text-[#f6ae2d] absolute -right-3 md:-right-0 top-0 flex flex-col justify-evenly h-[100%] '>
                        {
                            singleShow?.sound?.right >  0 && Array.from({length:singleShow.sound.right}).map((_,index)=>{
                                return(
                                    <BiSolidSpeaker key={'right'+index}  className='md:h-[2rem] md:w-[2rem]'/>
                                )
                            })
                        }
                    </div>
                </div>    
            </div>
            <Suspense>
                <SoldConfirmModal isOpen={showSold} set={setShowSold} />   
            </Suspense>
        </div>
    </div>
  )}
}

export default ShowReservations
