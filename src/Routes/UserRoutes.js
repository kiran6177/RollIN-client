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
import UserShowBooking from '../Pages/User/Showbooking/UserShowBooking'
import UserMovieScreenSection from '../Pages/User/Screens/UserMovieScreenSection'
import UserCheckout from '../Pages/User/Showbooking/UserCheckout'
import UserReviewMain from '../Pages/User/Review/UserReviewMain'

function UserRoutes() {
  return (
    <Routes>
        <Route path={'/'} element={<UserHome/>} />
        <Route path={'/movies'} element={<UserMoviesMain/>} />
        <Route path={'/moviedetail'} element={<UserMovieDetail/>} />
        <Route path={'/persondetail'} element={<UserPersonDetail/>} />
        <Route path={'/screens'} element={<UserScreenList/>} />
        <Route path={'/reviews'} element={<UserReviewMain/>} />
        <Route path={'/screenwithmovies'} element={<UserScreenMovieSection/>} />
        <Route path={'/moviewithscreens'} element={<UserMovieScreenSection/>} />
        <Route path={'/login'} element={<UserLogin/>} />  
        <Route path={'/profile'} element={
        <UserProtected>
          <UserProfile/>
        </UserProtected>} />
        <Route path={'/screenwithmovies/show'} element={
        <UserProtected>
          <UserShowBooking/>
        </UserProtected>} />
        <Route path={'/buytickets'} element={
        <UserProtected>
          <UserCheckout/>
        </UserProtected>} />
      </Routes>
  )
}

export default UserRoutes
