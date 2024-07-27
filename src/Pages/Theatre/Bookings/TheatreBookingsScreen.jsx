import React from 'react'
import TheatreNavbar from '../../../Components/Navbar/TheatreNavbar'
import TheatreFooter from '../../../Components/Footer/TheatreFooter'
import BookingsScreenShows from '../../../Components/Theatre/Bookings/BookingsScreenShows'

function TheatreBookingsScreen() {
  return (
    <>
    <TheatreNavbar/>
    <BookingsScreenShows/>
    <TheatreFooter/>
    </>
  )
}

export default TheatreBookingsScreen
