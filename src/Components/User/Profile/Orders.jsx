import React, { useEffect, useRef, useState } from 'react'
import TicketModal from './TicketModal';
import img from '../../../assets/MV5BOWMyNTA2M2UtMmZkNC00ZWE5LThjZGItODcxNGU2MDBhYTk1XkEyXkFqcGdeQXVyOTU0NjY5MzM@._V1_.jpg'
import { useDispatch, useSelector } from 'react-redux';
import { userGetOrders } from '../../../features/userBooking/userBookingActions';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ScaleLoader } from 'react-spinners';
import { motion } from 'framer-motion';
import { resetOrders } from '../../../features/userBooking/userBookingSlice';

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
    const {orders} = useSelector(state=>state.userBooking)
    const [page,setPage] = useState(1)
    const scrollRef = useRef(null)
    useEffect(()=>{
      const data = {page:1}
      dispatch(resetOrders())
      dispatch(userGetOrders({data,token:userToken}))
    },[])

    const nextPage = ()=>{
      const data = {page:page+1}
      dispatch(userGetOrders({data,token:userToken}))
      setPage(prev=>prev+1)
    }

  return (
    <div className='my-8'>
          <h2 className='text-white text-3xl font-semibold tracking-widest'>ORDERS</h2>

          <div ref={scrollRef} className='my-6 mx-auto flex flex-wrap gap-6 justify-evenly '>
        {
            orders &&  orders.length > 0 ?
            <InfiniteScroll dataLength={orders?.length} scrollThreshold={'750px'} scrollableTarget={scrollRef} next={nextPage} loader={<ScaleLoader className='absolute -bottom-[6rem] ' color='#f6ae2d'/>} hasMore={true} className='my-6 py-4 px-2 mx-auto flex flex-wrap gap-7 relative  justify-evenly scrollbar-none'>
            {
            orders.map((order)=>{
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
                key={order._id} className='my-8 flex flex-col lg:flex-row bg-black gap-10 border-2 border-[#f6ae2d] rounded-sm p-8 '>
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
                    {new Date() < new Date(order.show_date) &&<button onClick={()=>setShowTicket(order)} className='bg-[#f6ae2d] absolute right-0 bottom-0 font-medium px-4 py-1 text-xs rounded-sm tracking-wider'>MORE</button>}
                  </div>
            </motion.div>
            )
            })
            }
            </InfiniteScroll>
            : <div className='text-white tracking-widest'> NO ORDERS.</div>
        }
                  <TicketModal isOpen={showTicket} set={setShowTicket} />
      </div>
      </div>
  )
}

export default Orders
