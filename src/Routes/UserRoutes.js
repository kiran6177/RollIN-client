import React from 'react'
import { Route, Routes } from 'react-router'
import UserHome from '../Pages/User/Home/UserHome'
import UserLogin from '../Pages/User/Login/UserLogin'
import UserProfile from '../Pages/User/Profile/UserProfile'
import UserProtected from './UserProtected'
import UserMoviesMain from '../Pages/User/MoviesMain/UserMoviesMain'
import UserScreenList from '../Pages/User/Screens/UserScreenList'
import UserScreenMovieSection from '../Pages/User/Screens/UserScreenMovieSection'
import UserMovieDetail from '../Pages/User/MovieDetail/UserMovieDetail'
import UserPersonDetail from '../Pages/User/PersonDetail/UserPersonDetail'

function UserRoutes() {
  return (
    <Routes>
        <Route path={'/'} element={<UserHome/>} />
        <Route path={'/movies'} element={<UserMoviesMain/>} />
        <Route path={'/moviedetail'} element={<UserMovieDetail/>} />
        <Route path={'/persondetail'} element={<UserPersonDetail/>} />
        <Route path={'/screens'} element={<UserScreenList/>} />
        <Route path={'/screenwithmovies'} element={<UserScreenMovieSection/>} />
        <Route path={'/login'} element={<UserLogin/>} />  
        <Route path={'/profile'} element={
        <UserProtected>
          <UserProfile/>
        </UserProtected>} />
      </Routes>
  )
}

export default UserRoutes
