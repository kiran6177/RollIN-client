import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { Toaster } from 'sonner'
import { getMonthByNumber } from '../../../utils/monthByNumber';
import { useDispatch, useSelector } from 'react-redux';
import { userGetOneMovie } from '../../../features/userMovies/userMovieActions';
import { useSearchParams } from 'react-router-dom';
import { userGetShowDataByMovie } from '../../../features/userBooking/userBookingActions';
import LoadingSpinner from '../../Loaders/LoadingSpinner';

function MovieScreenSection() {
    const [month,setMonth] = useState('');
    const [dates,setDates] = useState([]);
    const [selectedDate,setSelectedDate] = useState('');

    const {singleMovieDetail} = useSelector(state=>state.userMovie)
    const {singleMovieShows,loading} = useSelector(state=>state.userBooking)
    const [searchParams] = useSearchParams();
    const movie_id = searchParams.get('movie_id');
    const [datesObj,setDatesObj] = useState({})

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const findDate = ()=>{
        const date = new Date();
        date.setHours(0,0,0,0)
        const month = getMonthByNumber(date.getMonth() + 1)
        console.log("TODAY",date);
        setMonth(month)
        const newDates = []
        const newDatesObj = {}
        for(let i = 0 ; i < 4 ; i++){
            let currentDate = new Date(date);
            currentDate.setDate(currentDate.getDate() + i);
            let filteredDate = currentDate.toString().split(' ')[0] + ' ' + currentDate.toString().split(' ')[2]
            newDatesObj[filteredDate] = currentDate
            newDates.push(filteredDate)
        }
        console.log(newDatesObj);
        setDatesObj(newDatesObj)
        setDates(newDates)
    }

    useEffect(()=>{
        setSelectedDate(dates[0])
    },[dates])

    useEffect(()=>{
        findDate()  
    },[])

    useEffect(()=>{
        if(!singleMovieDetail || singleMovieDetail?._id !== movie_id){
            if(localStorage.getItem('city')){
                const loc = JSON.parse(localStorage.getItem('city')).loc;
                dispatch(userGetOneMovie({movie_id,location:loc})) 
            }else{
                dispatch(userGetOneMovie({movie_id}))
            }
            return
        }
    },[singleMovieDetail])

    useEffect(()=>{
        if(selectedDate && singleMovieDetail){
            const dateOf = new Date(datesObj[selectedDate])
            dateOf.setDate(dateOf.getDate() + 1)
            dateOf.setUTCHours(0,0,0,0)
            const dateOfT = dateOf.toISOString()
            const data = {date:dateOfT,movie_id}
            console.log(data);
            dispatch(userGetShowDataByMovie(data))
        }
    },[selectedDate,singleMovieDetail])

    const handleShowBooking = (show)=>{
        const dateOf = new Date(datesObj[selectedDate])
        dateOf.setDate(dateOf.getDate() + 1)
        dateOf.setUTCHours(0,0,0,0)
        const dateOfT = dateOf.toISOString()
        console.log(show);
        navigate(`/screenwithmovies/show?show_id=${show?.show_id}&date=${dateOfT}&theatre_id=${show?.theatre_id}`,{state:{redirectURL:`/screenwithmovies/show?show_id=${show?.show_id}&date=${dateOfT}&theatre_id=${show?.theatre_id}`}})
    }

  return (
    loading ?
    <LoadingSpinner/>
    :<div className='py-10 bg-[#15121B] '>
        <Toaster richColors />
        <div className='pt-28 px-12  min-h-[10rem] '>
            <div className='border-2 border-[#f6ae2d] rounded-sm bg-black '>
                <div className='border-b-2 border-[#f6ae2d] py-6 px-10 flex flex-col gap-4'>
                    <h5 className='text-[#f6ae2d] text-2xl sm:text-4xl font-semibold tracking-widest flex gap-5 items-center'>{singleMovieDetail?.title}</h5> 
                    <h6 className='text-white text-md sm:text-base'>{singleMovieDetail?.genres[0] ? singleMovieDetail?.genres[0] : ''}{singleMovieDetail?.genres[1] ?" / " + singleMovieDetail?.genres[1] : ''}{singleMovieDetail?.genres[2] ?" / " + singleMovieDetail?.genres[2] : ''} , {selectedDate} {month}</h6>
                    
                    
                </div>
                <div className='bg-[#cc9329] px-4 py-3 flex gap-5 items-center text-xs md:text-sm tracking-widest overflow-x-scroll'>
                    <span className=' border-2 h-[2rem] px-3 -rotate-90 bg-black rounded-md text-white flex items-center border-black '>{month}</span>
                    {
                        dates?.length > 0 && dates.map(date=>{
                            return(
                                <button key={date} onClick={()=>setSelectedDate(date)} className={date === selectedDate ? 'flex flex-col items-center min-w-[4.5rem] border-2 border-black rounded-md bg-[#f6ae2d]  px-3 py-7 ' :'flex flex-col min-w-[4.5rem] items-center border-2 border-[#f6ae2d] rounded-md bg-black text-white  px-3 py-7 '}><span className='font-medium'>{date.split(' ')[0]}</span><span className='font-medium'>{date.split(' ')[1]}</span></button>
                            )
                        })
                    }
                    
                </div>
                <div className='text-white py-8 px-8 flex flex-col gap-5'>
                    
                    {
                        singleMovieShows?.length > 0 &&
                        singleMovieShows.map(showObj=>{
                            return(
                                <div key={showObj?._id} className='flex flex-col md:flex-row gap-4 md:gap-0 border-2 rounded-sm border-[#f6ae2d] p-6 shadow-[0px_0px_25px_rgba(246,175,46,0.3)]'>
                                    <div className='md:w-[45%] lg:w-[35%] flex flex-col gap-1'>
                                        <h1 className='text-[#f6ae2d] tracking-widest font-medium text-base cursor-pointer' >{showObj?.theatre?.name}</h1>
                                        <h3 className='text-[10px] sm:text-xs'>{showObj?.theatre?.address?.landmark}, {showObj?.theatre?.address?.street}, {showObj?.theatre?.address?.city}, {showObj?.theatre?.address?.state}, {showObj?.theatre?.address?.pincode}</h3>
                                    </div>
                                    <div className='flex flex-wrap gap-7'> 
                                        {
                                            showObj?.shows?.length > 0 && showObj?.shows.map(show=>{
                                                return(
                                                    <button key={show?._id} onClick={()=>handleShowBooking(show)} className='border-2 flex items-center p-2 lg:p-3 text-xs sm:text-sm rounded-md tracking-wider'>{show?.showtime}</button>
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
        </div>
    </div>
  )
}

export default MovieScreenSection
