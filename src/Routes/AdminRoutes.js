import React from 'react'
import { Route, Routes } from 'react-router'
import AdminLogin from '../Pages/Admin/Login/AdminLogin'
import AdminHome from '../Pages/Admin/Home/AdminHome'
import AdminProtected from './AdminProtected'
import AdminProfile from '../Pages/Admin/Profile/AdminProfile'

function AdminRoutes() {
  return (
    <Routes>
        <Route path={'/'} element={
        <AdminProtected>
          <AdminHome/>  
        </AdminProtected>}   />
        <Route path={'/login'} element={<AdminLogin/>} />
        <Route path={'/profile'} element={
            <AdminProtected>
                <AdminProfile/>
            </AdminProtected>
        } />
    </Routes>
  )
}

export default AdminRoutes
