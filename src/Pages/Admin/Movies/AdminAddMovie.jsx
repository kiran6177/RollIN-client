import React from 'react'
import AdminNavbar from '../../../Components/Navbar/AdminNavbar'
import Sidebar from '../../../Components/Admin/Sidebar/Sidebar'
import AddMovie from '../../../Components/Admin/Movies/AddMovie'

function AdminAddMovie() {
  return (
    <>
    <AdminNavbar/>
    <Sidebar/>
    <AddMovie/>
    </>
  )
}

export default AdminAddMovie
