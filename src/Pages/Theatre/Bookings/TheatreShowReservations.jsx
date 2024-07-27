import React from 'react'
import TheatreNavbar from '../../../Components/Navbar/TheatreNavbar'
import TheatreFooter from '../../../Components/Footer/TheatreFooter'
import ShowReservations from '../../../Components/Theatre/Bookings/ShowReservations'

function TheatreShowReservations() {
  return (
    <>
    <TheatreNavbar/>
    <ShowReservations/>
    <TheatreFooter/>
    </>
  )
}

export default TheatreShowReservations
