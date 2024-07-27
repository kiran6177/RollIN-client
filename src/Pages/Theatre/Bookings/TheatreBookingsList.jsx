import React from 'react'
import TheatreNavbar from '../../../Components/Navbar/TheatreNavbar'
import TheatreFooter from '../../../Components/Footer/TheatreFooter'
import BookingsList from '../../../Components/Theatre/Bookings/BookingsList'

function TheatreBookingsList() {
  return (
    <>
    <TheatreNavbar/>
    <BookingsList/>
    <TheatreFooter/>
    </>
  )
}

export default TheatreBookingsList
