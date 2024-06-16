import React from 'react'
import AdminNavbar from '../../../Components/Navbar/AdminNavbar'
import Sidebar from '../../../Components/Admin/Sidebar/Sidebar'
import MovieDetail from '../../../Components/Admin/Movies/MovieDetail'

function AdminMovieDetail() {
  return (
    <>
    <AdminNavbar/>
    <Sidebar/>
    <MovieDetail/>
    </>
  )
}

export default AdminMovieDetail
