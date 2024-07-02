import React from 'react'
import TheatreNavbar from '../../../Components/Navbar/TheatreNavbar'
import TheatreFooter from '../../../Components/Footer/TheatreFooter'
import MovieDetail from '../../../Components/Theatre/Screen/MovieDetail'

function TheatreMovieDetail() {
  return (
    <>
    <TheatreNavbar hide={true} />
    <MovieDetail/>
    <TheatreFooter/>
    </>
  )
}

export default TheatreMovieDetail
