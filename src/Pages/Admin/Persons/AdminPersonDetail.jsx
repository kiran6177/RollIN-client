import React from 'react'
import AdminNavbar from '../../../Components/Navbar/AdminNavbar'
import Sidebar from '../../../Components/Admin/Sidebar/Sidebar'
import PersonDetail from '../../../Components/Admin/Persons/PersonDetail'

function AdminPersonDetail() {
  return (
    <>
    <AdminNavbar/>
    <Sidebar/>
    <PersonDetail/>
    </>
  )
}

export default AdminPersonDetail
