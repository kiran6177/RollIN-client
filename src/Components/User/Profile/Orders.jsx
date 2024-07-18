import React, { useState } from 'react'
import TicketModal from './TicketModal';
import img from '../../../assets/MV5BOWMyNTA2M2UtMmZkNC00ZWE5LThjZGItODcxNGU2MDBhYTk1XkEyXkFqcGdeQXVyOTU0NjY5MzM@._V1_.jpg'


function Orders() {
    const [showTicket,setShowTicket] = useState(false);
    
  return (
    <div className='my-8'>
          <h2 className='text-white text-3xl font-semibold tracking-widest'>ORDERS</h2>

          <div className='my-8 flex flex-col md:flex-row bg-black gap-10 border-2 border-[#f6ae2d] rounded-sm p-8'>
              <div className='w-[40%] h-[90%] mx-auto md:mx-0 md:w-[15%] rounded-sm border-[1px] border-[#f6ae2d]'>
                <img src={img} alt="" className='object-contain ' />
              </div>
              <div className='w-[100%] flex flex-col gap-3'>
                <div className='flex justify-between md:w-[70%]'>
                  <div className='flex flex-col gap-2'>
                    <h2 className='text-[#f6ae2d] text-2xl tracking-widest font-medium'>MovieNAME</h2>
                    <h2 className='text-white text-sm'>GENRE , langage</h2>
                    <h2 className='text-white text-sm'>Date</h2>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <h2 className='text-[#f6ae2d] text-2xl tracking-widest font-medium'>Theatre</h2>
                    <h2 className='text-white text-lg tracking-wider'>Screen</h2>
                    <h2 className='text-white text-sm'>Date</h2>
                  </div>
                </div>
                <div className='flex justify-between my-4 relative'>
                  <div>
                  <h2 className='text-[#f6ae2d]'>Seats</h2>
                  <h2  className='text-md sm:text-2xl text-white my-2'>PREMIUM - <span className='text-[#f6ae2d] font-semibold tracking-wider'>R5, R6</span></h2>
                  <h2 className='text-xs sm:text-md text-white my-2'>Booking ID : RMT67532576576562</h2>
                  </div>
                  <div className='text-xl font-semibold tracking-widest text-[#f6ae2d] w-[40%]'>
                    <h2 className='text-4xl'>2 </h2>
                    <h2>Tickets</h2>
                  </div>
                  <button onClick={()=>setShowTicket(true)} className='bg-[#f6ae2d] absolute right-0 bottom-0 font-medium px-4 py-1 text-xs rounded-sm tracking-wider'>MORE</button>
                </div>
              </div>
              <TicketModal isOpen={showTicket} set={setShowTicket} />
          </div>
        
        </div>
  )
}

export default Orders
