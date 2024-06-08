import React from 'react'
import AdminNavbar from '../../../Components/Navbar/AdminNavbar'
import Sidebar from '../../../Components/Admin/Sidebar/Sidebar'
import TheatreSingleView from '../../../Components/Admin/TheatreView/TheatreSingleView'

function AdminSingleTheatre() {
  return (
    <>
    <AdminNavbar/>
    <Sidebar/>
    <TheatreSingleView/>
    </>
  )
}

export default AdminSingleTheatre
