import React from 'react'
import { Route, Routes } from 'react-router'
import AdminLogin from '../Pages/Admin/Login/AdminLogin'
import AdminHome from '../Pages/Admin/Home/AdminHome'
import AdminProtected from './AdminProtected'
import AdminProfile from '../Pages/Admin/Profile/AdminProfile'
import AdminUserView from '../Pages/Admin/UsersView/AdminUserView'
import AdminTheatreView from '../Pages/Admin/TheatreView/AdminTheatreView'
import AdminSingleTheatre from '../Pages/Admin/TheatreView/AdminSingleTheatre'

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
        <Route path={'/users'} element={
            <AdminProtected>
                <AdminUserView/>
            </AdminProtected>
        } />
        <Route path={'/theatres'} element={
            <AdminProtected>
                <AdminTheatreView/>
            </AdminProtected>
        } />
        <Route path={'/theatres/:id'} element={
            <AdminProtected>
                <AdminSingleTheatre/>
            </AdminProtected>
        } />
    </Routes>
  )
}

export default AdminRoutes
