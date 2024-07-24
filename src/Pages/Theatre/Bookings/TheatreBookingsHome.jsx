import React from 'react'
import TheatreNavbar from '../../../Components/Navbar/TheatreNavbar'
import TheatreFooter from '../../../Components/Footer/TheatreFooter'
import BookingsByScreen from '../../../Components/Theatre/Bookings/BookingsByScreen'

function TheatreBookingsHome() {
  return (
    <>
    <TheatreNavbar/>
    <BookingsByScreen/>
    <TheatreFooter/>
    </>
  )
}

export default TheatreBookingsHome
