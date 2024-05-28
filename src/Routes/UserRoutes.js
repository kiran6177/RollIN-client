import React from 'react'
import { Route, Routes } from 'react-router'
import UserHome from '../Pages/User/Home/UserHome'
import UserLogin from '../Pages/User/Login/UserLogin'
import UserProfile from '../Pages/User/Profile/UserProfile'
import UserProtected from './UserProtected'

function UserRoutes() {
  return (
    <Routes>
        <Route path={'/'} element={<UserHome/>} />
        <Route path={'/login'} element={<UserLogin/>} />  
        <Route path={'/profile'} element={
        <UserProtected>
          <UserProfile/>
        </UserProtected>} />
      </Routes>
  )
}

export default UserRoutes
