import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Toaster } from 'sonner'
import { theatreGetCompleteBookings } from '../../../features/theatreBookings/theatreBookingActions';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ScaleLoader } from 'react-spinners';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { resetOrdersData } from '../../../features/theatreBookings/theatreBookingSlice';
import useDebounce from '../../../hooks/debounce';
import LoadingSpinner from '../../Loaders/LoadingSpinner';

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

function BookingsList() {
    const [selected,setSelected] = useState('ALL')
    const dispatch = useDispatch();
    const {theatreToken} = useSelector(state=>state.theatre)
    const {ordersData} = useSelector(state=>state.theatreBooking)
    const {theatreScreenData} = useSelector(state=>state.theatreFeat)
    const scrollRef = useRef(null);
    const [page,setPage] = useState(1);
    const [searchParams] = useSearchParams();
    const show_id = searchParams.get('show_id')
    const date = searchParams.get("date")
    const [query,setQuery] = useState('');

    const [debouncedValue] = useDebounce(query)
    
    useEffect(()=>{
        dispatch(resetOrdersData())

        return ()=>{
        dispatch(resetOrdersData())
        }
    },[])

    useEffect(()=>{
        if(!ordersData){
            const data = {page:1,screen_id:selected === 'ALL' ? undefined : selected,show_id:show_id,date:date,search:debouncedValue}
            dispatch(theatreGetCompleteBookings({data,token:theatreToken}))
        }
    },[ordersData])


    useEffect(()=>{
        if(debouncedValue !== ''){
            console.log(debouncedValue);
            dispatch(resetOrdersData());
            setPage(1)
        }
    },[debouncedValue])

    useEffect(()=>{
        if(selected !== 'ALL'){
            dispatch(resetOrdersData())
            setPage(1)
        }
    },[selected])

    const nextPage = ()=>{
        const data = {page:page+1,screen_id:selected === 'ALL' ? undefined : selected,show_id:show_id,date:date,search:debouncedValue}
        dispatch(theatreGetCompleteBookings({data,token:theatreToken}))
        setPage(prev=>prev+1)
    }

        return (
            <div className='py-10 bg-[#15121B] '>
        <Toaster richColors />
        <div className='pt-28 px-12  min-h-[10rem]'>
            <div className='flex flex-col justify-between'>
                <h2 className='text-white text-2xl md:text-3xl font-semibold tracking-widest mb-8'>BOOKINGS LIST</h2>
                {!show_id && <span className='bg-[#c0871dd4] flex max-w-fit   font-medium tracking-wider gap-4 flex-wrap'><button onClick={()=>{setSelected("ALL");dispatch(resetOrdersData());setPage(1)}} className={selected === 'ALL' ? 'min-w-[6rem] bg-[#f6ae2d] py-2 px-4' :'min-w-[6rem] py-2 px-4'}>ALL</button>{theatreScreenData?.map(screen=>{return(<button key={screen?._id} onClick={()=>setSelected(screen?._id)} className={selected === screen?._id ? 'min-w-[6rem] bg-[#f6ae2d] py-2 px-4' :'min-w-[6rem] py-2 px-4'}>{screen?.name}</button>)})}</span>}
                <div className='my-4 flex flex-col sm:flex-row  gap-5'>
                    <input type="text" value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search by Order ID" className='text-white border-2 border-[#f6ae2d] bg-black py-2 px-3 rounded-sm w-[100%] sm:w-[45%]' />
                    <button onClick={()=>dispatch(resetOrdersData())} className='bg-[#f6ae2d] border-2 border-[#f6ae2d] rounded-sm px-6 py-1 tracking-wider font-medium'>SEARCH</button>
                </div>
            </div>
            <div ref={scrollRef} className='my-6 mx-auto flex flex-wrap gap-6 justify-evenly '>
            {
                ordersData &&  ordersData.length > 0 ?
                <InfiniteScroll dataLength={ordersData?.length} scrollThreshold={'750px'} scrollableTarget={scrollRef} next={nextPage} loader={<ScaleLoader className='absolute -bottom-[6rem] ' color='#f6ae2d'/>} hasMore={true} className=' py-4 px-2 mx-auto flex flex-wrap gap-7 relative  justify-evenly scrollbar-none'>
                {
                ordersData.map((order)=>{
                let {movie,user_data} = order
                let ticketCount = 0;
                order.seatdata.forEach(seatObject => {
                    ticketCount += seatObject.seats.length
                });
                return (
                <motion.div 
                variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{once:true}}
                    key={order._id} className='my-8 flex flex-col lg:flex-row bg-black gap-10 border-2 border-[#f6ae2d] rounded-sm p-8 '>
                    <div className='w-[70%] md:w-[40%] mx-auto lg:mx-0 lg:w-[15%]'>
                    <div className='w-[100%] rounded-sm border-[1px] border-[#f6ae2d] overflow-hidden'>
                        <img src={movie?.poster_path} alt=""  className='object-cover aspect-[4/5]' />
                    </div>
                    </div>
                    <div className='w-[100%] flex flex-col gap-3 relative'>
                        <div className='flex gap-6 justify-between flex-col md:flex-row lg:w-[80%]'>
                        <div className='flex flex-col gap-2 md:w-[50%]'>
                            <h2 className='text-white text-2xl tracking-wider'>{new Date(order?.show_date).toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'})}, {order?.show_time}</h2>
                            <h2 className='text-[#f6ae2d] text-lg tracking-widest font-medium'>{movie?.title}</h2>
                            <h2 className='text-white text-sm'>{movie?.genres[0] ? movie?.genres[0]?.name ? movie?.genres[0]?.name : movie?.genres[0]  : '' }{movie?.genres[1] ? movie?.genres[1]?.name ? " / "+ movie?.genres[1]?.name : " / "+ movie?.genres[1] : '' },{movie?.language}</h2>
                        </div>
                        <div className='flex flex-col gap-2 md:w-[40%]'>
                            <h2 className='text-[#f6ae2d] text-2xl tracking-widest font-medium'>{user_data[0]?.firstname + " " + user_data[0]?.lastname }</h2>
                            <h2 className='text-white text-lg tracking-wider'>{order?.screendata?.screen_name}</h2>
                        </div>
                        </div>
                        <div className='flex gap-6 justify-between my-4 flex-col md:flex-row lg:w-[80%]'>
                        <div className='flex flex-col gap-2 md:w-[50%]'> 
                        <h2 className='text-[#f6ae2d]'>Seats</h2>
                        {
                            order?.seatdata?.length > 0 && order?.seatdata.map((seatObj,i)=>{
                            return (
                            <h2 key={seatObj?.tier_name+i}  className='text-sm sm:text-lg text-white my-2'>{seatObj?.tier_name} - <span className='text-[#f6ae2d] font-semibold tracking-wider'>{seatObj?.seats.join(', ')}</span></h2>
                            )
                        })
                        }
                        <h2 className='text-md sm:text-xl text-white my-2'>Booking ID : {order?.order_id}</h2>
                        </div>
                        <div className='text-xl font-semibold tracking-widest text-[#f6ae2d] md:w-[40%]'>
                            <h2 className='text-4xl'>{ticketCount}</h2>
                            <h2>Tickets</h2>
                        </div>
                        </div>
                        {order?.refund_id && <div><h2 className='text-red-500'>CANCELLED</h2></div>}
                    </div>
                </motion.div>
                )
                })
                }
                </InfiniteScroll>
                : <div className='text-white tracking-widest'> NO ORDERS.</div>
            }
        </div>
        </div>
    </div>
  )
}

export default BookingsList
