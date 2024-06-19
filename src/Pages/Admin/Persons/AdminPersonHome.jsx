import React from 'react'
import AdminNavbar from '../../../Components/Navbar/AdminNavbar'
import Sidebar from '../../../Components/Admin/Sidebar/Sidebar'
import PersonHome from '../../../Components/Admin/Persons/PersonHome'

function AdminPersonHome() {
  return (
    <>
    <AdminNavbar/>
    <Sidebar/>
    <PersonHome/>
    </>
  )
}

export default AdminPersonHome
