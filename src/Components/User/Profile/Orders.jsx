import React, { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { userGetOrders } from '../../../features/userBooking/userBookingActions';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ScaleLoader } from 'react-spinners';
import { IoInformationCircle } from "react-icons/io5";
import { motion } from 'framer-motion';
import { resetOrders, resetUserBookings } from '../../../features/userBooking/userBookingSlice';
import { getShowDate } from '../../../utils/getShowDate';
import { toast, Toaster } from 'sonner';
const TicketModal = lazy(()=>import('./TicketModal'));
const CancelConfirmModal = lazy(()=>import('./CancelConfirmModal'))

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

function Orders() {
    const [showTicket,setShowTicket] = useState(false);
    const dispatch = useDispatch();
    const {userToken} = useSelector(state=>state.user)
    const {orders,error,message} = useSelector(state=>state.userBooking)
    const [page,setPage] = useState(1)
    const scrollRef = useRef(null)
    const [ordersList,setOrdersList] = useState([]);
    const [selected,setSelected] = useState('UPCOMING')
    const [showCancelConfirm,setShowCancelConfirm] = useState(false);
    const [showInfo,setShowInfo] = useState(false);

    useEffect(()=>{
      if(message === "Cancelled Successfully. Refund Initiated."){
        toast.success(message)
        dispatch(resetUserBookings())
        dispatch(resetOrders())
        if(userToken){
          const data = {page:1}
          dispatch(userGetOrders({data,token:userToken}))
        }
        return
      }
      if(error?.length > 0){
        error?.map(err=>toast.error(err))
        dispatch(resetUserBookings())
        return
      }
    },[error,message])

    useEffect(()=>{
      const data = {page:1}
      dispatch(resetOrders())
      dispatch(userGetOrders({data,token:userToken}))

      return ()=>{
      dispatch(resetOrders())
      setPage(1)
      } 
    },[])

    const nextPage = ()=>{
      const data = {page:page+1}
      dispatch(userGetOrders({data,token:userToken}))
      setPage(prev=>prev+1)
    }

    useEffect(()=>{
      if(orders?.length > 0 && selected){
          let today = new Date()
          today.setUTCHours(0,0,0,0)
          console.log(today,"day");
          if(selected === 'UPCOMING'){
            let upcomingOrders = orders.filter(order=>(new Date(order.show_date) >= today) && order.refund_id === null);
            setOrdersList(upcomingOrders)
          }else if(selected === 'WATCHED'){
            let watchedOrders = orders.filter(order=>(new Date(order.show_date) < today) && order.refund_id === null)
            setOrdersList(watchedOrders)
          }else{
            let cancelledOrders = orders.filter(order=>order.refund_id !== null)
            console.log(cancelledOrders);
            setOrdersList(cancelledOrders)
          }
      }
    },[orders,selected])

    const handleCancelTicket = (order_id)=>{
      setShowCancelConfirm(order_id)
    }

  return (
    <div className='my-8'>
      <Toaster richColors/>
          <h2 className='text-white text-3xl font-semibold tracking-widest mb-5'>ORDERS</h2>
          <span className='bg-[#c0871dd4] flex max-w-fit   font-medium tracking-wider gap-4 flex-col sm:flex-row'>
            <button onClick={()=>{setSelected('UPCOMING')}} className={selected === 'UPCOMING' ? 'min-w-[6rem] bg-[#f6ae2d] py-2 px-4' :'min-w-[6rem] py-2 px-4'}>UPCOMING</button>
            <button onClick={()=>{setSelected('WATCHED')}} className={selected === 'WATCHED' ? 'min-w-[6rem] bg-[#f6ae2d] py-2 px-4' :'min-w-[6rem] py-2 px-4'}>WATCHED</button>
            <button onClick={()=>{setSelected('CANCELLED')}} className={selected === 'CANCELLED' ? 'min-w-[6rem] bg-[#f6ae2d] py-2 px-4' :'min-w-[6rem] py-2 px-4'}>CANCELLED</button>
            </span>
          <div ref={scrollRef} className='my-6 mx-auto flex flex-wrap gap-6 justify-evenly '>
        {
            ordersList &&  ordersList.length > 0 ?
            <InfiniteScroll dataLength={ordersList?.length} scrollThreshold={'750px'} scrollableTarget={scrollRef} next={nextPage} loader={<ScaleLoader className='absolute -bottom-[6rem] ' color='#f6ae2d'/>} hasMore={true} className='my-6 py-4 px-2 mx-auto flex flex-wrap gap-7 relative  justify-evenly scrollbar-none'>
            {
            ordersList.map((order)=>{
              let {movie,theatre_id} = order
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
                key={order._id} className='my-8 flex flex-col lg:flex-row bg-black gap-10 border-2 border-[#f6ae2d] rounded-sm p-8 w-[100%]'>
                  <div className='w-[70%] md:w-[40%] mx-auto lg:mx-0 lg:w-[15%]'>
                  <div className='w-[100%] rounded-sm border-[1px] border-[#f6ae2d] overflow-hidden'>
                    <img src={movie?.poster_path} alt=""  className='object-cover aspect-[4/5]' />
                  </div>
                  </div>
                  <div className='w-[100%] flex flex-col gap-3 relative'>
                    <div className='flex gap-6 justify-between flex-col md:flex-row lg:w-[80%]'>
                      <div className='flex flex-col gap-2 md:w-[50%]'>
                        <h2 className='text-[#f6ae2d] text-2xl tracking-widest font-medium'>{movie?.title}</h2>
                        <h2 className='text-white text-sm'>{movie?.genres[0] ? movie?.genres[0]?.name ? movie?.genres[0]?.name : movie?.genres[0]  : '' }{movie?.genres[1] ? movie?.genres[1]?.name ? " / "+ movie?.genres[1]?.name : " / "+ movie?.genres[1] : '' },{movie?.language}</h2>
                        <h2 className='text-white text-sm'>{new Date(order?.show_date).toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'})}, {order?.show_time}</h2>
                      </div>
                      <div className='flex flex-col gap-2 md:w-[40%]'>
                        <h2 className='text-[#f6ae2d] text-2xl tracking-widest font-medium'>{theatre_id?.name}</h2>
                        <h2 className='text-white text-lg tracking-wider'>{order?.screendata?.screen_name}</h2>
                      </div>
                    </div>
                    <div className='flex gap-6 justify-between my-4 flex-col md:flex-row lg:w-[80%]'>
                      <div className='flex flex-col gap-2 md:w-[50%]'> 
                      <h2 className='text-[#f6ae2d]'>Seats</h2>
                      {
                        order?.seatdata?.length > 0 && order?.seatdata.map((seatObj,i)=>{
                          return (
                          <h2 key={seatObj?.tier_name+i}  className='text-md sm:text-2xl text-white my-2'>{seatObj?.tier_name} - <span className='text-[#f6ae2d] font-semibold tracking-wider'>{seatObj?.seats.join(', ')}</span></h2>
                          )
                        })
                      }
                      <h2 className='text-xs sm:text-md text-white my-2'>Booking ID : {order?.order_id}</h2>
                      </div>
                      <div className='text-xl font-semibold tracking-widest text-[#f6ae2d] md:w-[40%]'>
                        <h2 className='text-4xl'>{ticketCount}</h2>
                        <h2>Tickets</h2>
                      </div>
                    </div>
                    {new Date().setUTCHours(0,0,0,0) <= new Date(order.show_date) &&<button onClick={()=>setShowTicket(order)} className='bg-[#f6ae2d] absolute right-0 bottom-0 font-medium px-4 py-1 text-xs rounded-sm tracking-wider'>MORE</button>}
                    <div>
                      {!order?.refund_id ? (Math.abs(getShowDate(order?.show_date,order?.show_time) - new Date()) < 4 * 60 * 60 * 1000) ? 
                      <div className='relative mb-10 sm:mb-0'>
                        <h4 className='text-white text-sm flex items-center gap-3'><IoInformationCircle onMouseEnter={()=>setShowInfo(true)} onMouseLeave={()=>setShowInfo(false)} className='w-[1.3rem] h-[1.3rem]' /> Cancellation unavailable.</h4> 
                        {showInfo && <div className='z-10 p-3 absolute -top-[8rem] sm:-top-[3.5rem] sm:-left-[10rem] w-[10rem] sm:w-auto bg-black border-2 border-[#f6ae2d] rounded-sm '>
                          <h2 className='text-white'>Cancellation is only available before 4 hours of show.</h2>
                        </div>}
                      </div>
                      :
                      <button onClick={()=>handleCancelTicket(order?._id)} className='text-black border-2 mb-10 sm:mb-0 border-[#f6ae2d] bg-[#f6ae2d] px-6 py-2 rounded-sm tracking-widest font-medium hover:bg-black hover:text-white transition-all duration-200 ease-linear'>CANCEL TICKET</button>
                      :
                      <h2 className='text-white text-sm' >REFUND STATUS : <span className={order?.refund_status === "PROCESSING"? 'text-[#f62d2d]' : order?.refund_status === "REFUNDED"? "text-[#2bed31]" : "text-white" }> {order?.refund_status}</span></h2>
                      }
                    </div>
                  </div>
            </motion.div>
            )
            })
            }
            </InfiniteScroll>
            : <div className='text-white tracking-widest'> NO ORDERS.</div>
        }
                <Suspense><TicketModal isOpen={showTicket} set={setShowTicket} /></Suspense>
                <Suspense><CancelConfirmModal isOpen={showCancelConfirm} set={setShowCancelConfirm} /></Suspense>
      </div>
      </div>
  )
}

export default Orders
