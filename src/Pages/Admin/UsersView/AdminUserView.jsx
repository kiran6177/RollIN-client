import React from 'react'
import AdminNavbar from '../../../Components/Navbar/AdminNavbar'
import Sidebar from '../../../Components/Admin/Sidebar/Sidebar'
import UsersView from '../../../Components/Admin/UsersView/UsersView'

function AdminUserView() {
  return (
    <>
    <AdminNavbar/>
    <Sidebar/>
    <UsersView/>
    </>
  )
}

export default AdminUserView
