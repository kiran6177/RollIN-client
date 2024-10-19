import React from 'react'
import { Route, Routes } from 'react-router'
import AdminLogin from '../Pages/Admin/Login/AdminLogin'
import AdminHome from '../Pages/Admin/Home/AdminHome'
import AdminProtected from './AdminProtected'
import AdminProfile from '../Pages/Admin/Profile/AdminProfile'
import AdminUserView from '../Pages/Admin/UsersView/AdminUserView'
import AdminTheatreView from '../Pages/Admin/TheatreView/AdminTheatreView'
import AdminSingleTheatre from '../Pages/Admin/TheatreView/AdminSingleTheatre'
import AdminMovies from '../Pages/Admin/Movies/AdminMovies'
import AdminAddMovie from '../Pages/Admin/Movies/AdminAddMovie'
import AdminMovieDetail from '../Pages/Admin/Movies/AdminMovieDetail'
import AdminPersonHome from '../Pages/Admin/Persons/AdminPersonHome'
import AdminPersonDetail from '../Pages/Admin/Persons/AdminPersonDetail'
import UserNotFoundPage from '../Pages/User/Home/UserNotFoundPage'

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
        <Route path={'/movies'} element={
            <AdminProtected>
                <AdminMovies/>
            </AdminProtected>
        } />
        <Route path={'/addmovie'} element={
            <AdminProtected>
                <AdminAddMovie/>
            </AdminProtected>
        } />
        <Route path={'/moviedetail'} element={
            <AdminProtected>
                <AdminMovieDetail/>
            </AdminProtected>
        } />
        <Route path={'/persons'} element={
            <AdminProtected>
                <AdminPersonHome/>
            </AdminProtected>
        } />
        <Route path={'/persondetail'} element={
            <AdminProtected>
                <AdminPersonDetail/>
            </AdminProtected>
        } />
        <Route path='*' element={<UserNotFoundPage type="ADMIN" />} />
    </Routes>
  )
}

export default AdminRoutes
