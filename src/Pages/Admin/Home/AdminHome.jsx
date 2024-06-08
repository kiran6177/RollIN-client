import React from 'react'
import AdminNavbar from '../../../Components/Navbar/AdminNavbar'
import Home from '../../../Components/Admin/Home/Home'
import Sidebar from '../../../Components/Admin/Sidebar/Sidebar'

function AdminHome() {
  return (
    <>
    <AdminNavbar/>
    <Sidebar/>
    <Home/>
    </>
  )
}

export default AdminHome
