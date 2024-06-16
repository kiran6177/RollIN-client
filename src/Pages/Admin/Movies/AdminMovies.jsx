import React from 'react'
import AdminNavbar from '../../../Components/Navbar/AdminNavbar'
import Sidebar from '../../../Components/Admin/Sidebar/Sidebar'
import Movies from '../../../Components/Admin/Movies/Movies'

function AdminMovies() {
  return (
    <>
    <AdminNavbar/>
    <Sidebar/>
    <Movies/>
    </>
  )
}

export default AdminMovies
